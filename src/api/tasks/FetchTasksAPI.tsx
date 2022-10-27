import { useQuery } from "react-query";
import {
  AllUsersToTasksArray,
  convertTasksToEventArray,
} from "../../ArrayOperations.jsx/EventTaskHandler";
import { baseURL } from "../../../../frontend-tsx-side/src/Constant";
import client from "../axiosInterceptors";

/**
 *
 * @param isAdmin boolean, if the user is an Admin
 * @returns If isAdmin is true, get all the tasks of all the users. else, the tasks of a certain user.
 */
async function fetchTasks(isAdmin) {
  const link = isAdmin ? "/admin/allUsersTasks" : "/users/getTasks";
  let url = baseURL + link;
  return await client.get(url);
}

/**
 *
 * @param isAdmin boolean, if the user is an Admin
 * @param setEvents function pointer to setting the events in the calander.
 * @returns Custom query hook to fetch all the tasks of a user.
 */
const useTasksData = (isAdmin, setEvents) => {
  return useQuery("tasks", () => fetchTasks(isAdmin), {
    enabled: !isAdmin,
    onSuccess: (response) => {
      setEvents(convertTasksToEventArray(response.data));
    },
  });
};

/**
 *
 * @param isAdmin boolean, if the user is an Admin
 * @param setEvents function pointer to setting the events in the calander.
 * @returns Custom query hook to fetch all the tasks of all the users.
 */
const useAdminTasksData = (isAdmin, setEvents) => {
  return useQuery("Admintasks", () => fetchTasks(isAdmin), {
    enabled: isAdmin,
    onSuccess: (response) => {
      setEvents(AllUsersToTasksArray(response.data));
    },
  });
};

export { useAdminTasksData, useTasksData };
