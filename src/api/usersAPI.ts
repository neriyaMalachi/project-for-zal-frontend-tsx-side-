import { useQuery } from "react-query"
import client from "./axiosInterceptors"
const baseURL:string = 'http://localhost:3001'

/**
 *
 * @returns Response from the server that gets an array of{username, tasks, id}
 */
const fetchAdminUsers = () => {
    return client.get(baseURL + "/admin/userDetails");
  };

/**
 *
 * @param isAdmin boolean, if the user is an Admin
 * @returns Custom react query hook that gets all the users{name, id}.
 */
const useAdminUsersDetails = (isAdmin) => {
    return useQuery("adminUsers", () => fetchAdminUsers(), {
      enabled: isAdmin,
      select: (response) => {
        return response.data
          ? JSON.parse(JSON.stringify(response.data))
          : undefined;
      },
    });
  };

  /**
 *
 * @returns Response from the server that gets an array of{username, score, rank }
 */
const fetchUsers = () => {
    return client.get(baseURL+'/users/getUsers')
}

/**
 *
 * @returns Custom react query hook that gets all the users in a ordered list.
 */
 const useUsersData = () => {
    return useQuery('users', fetchUsers,{
        select: (response) =>{
            return response.data?JSON.parse(JSON.stringify(response.data)): undefined
        }
    })
}


export { useUsersData,useAdminUsersDetails}




