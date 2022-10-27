import axios from "axios";
import { baseURL } from "../Constant";
import { NavigateTo } from "./NavigateTo";
import client from "./axiosInterceptors";
import { useQuery } from "react-query";
import useStore from "../../../frontend-tsx-side/src/appStore";


/**
 *
 * @param user the data of the user
 * @description The function make a post request to the login route. if the authorization succeed, it updates the local storage with the tokens.
 */
async function LoginUser(user) {
  //making a post request to login into the web application.
  const response = await axios.post(baseURL + "/auth/login", user);
  //check if the user got authorization from the server with access and refresh token
  if (response.data.access_token && response.data.refresh_token) {
    //setting the tokens in local storage
    localStorage.setItem(
      "accessToken",
      JSON.stringify(response.data.access_token)
    );
    localStorage.setItem(
      "refreshToken",
      JSON.stringify(response.data.refresh_token)
    );
    //navigate to the dateTable route.
    NavigateTo("/dateTable");
    //the  authorization has succed
    user.setAuthFailed(false);
  } else {
    //the  authorization has failed

    user.setAuthFailed(true);
  }
}
/**
 *
 * @return The response of a get request to see information about the current user.
 */
const fetchLogin = () => {
  return client.get(baseURL + "/users/getUser");
};

/**
 *
 * @return Custom react hook that sends the information about the user. .
 */

const useLogin = () => {
  const setUsername = useStore((state) => state.setUsername);
  const setIsAdmin = useStore((state) => state.setIsAdmin);
  const setIsLogged = useStore((state) => state.setIsLogged);

  return useQuery("login", fetchLogin, {
    onSuccess: (response) => {
      setIsLogged(true);
      setUsername(response.data.username);
      if (response.data.isAdmin) {
        setIsAdmin(response.data.isAdmin);
      }
    },
    onSettled: () => {
      setIsLogged(true);
    },
    onError: () => {
      setIsLogged(false);
    },
  });
};

async function SignUpUserName(user) {
  const response = await axios.post(baseURL + "/auth/signup", user);

  localStorage.setItem(
    "accessToken",
    JSON.stringify(response.data.access_token)
  );
  localStorage.setItem(
    "refreshToken",
    JSON.stringify(response.data.refresh_token)
  );
  NavigateTo("/dateTable");
}

export { SignUpUserName, LoginUser, useLogin };
