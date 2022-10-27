import axios from 'axios'
import { baseURL } from '../../../frontend-tsx-side/src/Constant';
import { NavigateTo } from './NavigateTo';

const client = axios.create({ baseURL: baseURL })

 /**
 *
 * @param config object is a list of entries that can be matched against request or request/response pairs. Its purpose is to hold configuration data that can be looked up given a request or response object.
 * @param tokenType string: access token/ refresh token.
 * @description In every request, accessing the localStorage to get the tokens to send in the model of 'Bearer {token}'.
 */
 function authorizationRequest(config, tokenType){
    let token = JSON.parse(localStorage.getItem(tokenType))
    if (token) {
      if(config.defaults){
        config.defaults.headers.common['Authorization'] = 'Bearer ' + token
      }

      else{
        config.headers['Authorization'] = 'Bearer ' + token

      }
    }
    else {
      if(tokenType === 'refreshToken'){
      // the refresh token is expired.
      NavigateTo('/')

      }
    }
  }


 
client.interceptors.request.use(
  config => {
    //the user is trying to get a new access token.
    if (config.url === '/auth/refresh') {
      
      authorizationRequest(config, 'refreshToken')
    }
    else {
      //the user is trying to reach the data with the access token.
      authorizationRequest(config, 'accessToken')
    }
    return config

  },
  error => {
    Promise.reject(error)
  }
)



client.interceptors.response.use(
  response => {
    return response
  },
  function (error) {
    const originalRequest = error.config
    //the user is trying to get a new access token but the refresh token has expired.
    if (error.response?.status === 401 && originalRequest.url === '/auth/refresh') {
      NavigateTo('/')
      return Promise.reject(error)
    }
  
    // the user is trying to get data but his access token is not up to date.
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      return client.get('/auth/refresh').then(res => {
        if (res?.status === 201) {
           localStorage.setItem('accessToken', JSON.stringify(res.data.access_token))
          authorizationRequest(client, 'accessToken')
          return client(originalRequest)
        }
      })
    }
    return Promise.reject(error)
  }
)









export default client
