import { useMutation, useQueryClient } from "react-query";
import { baseURL } from "../../../../frontend-tsx-side/src/Constant";
import client from "../axiosInterceptors";

/**
 *
 * @param user boolean, if the user is an Admin
 * @returns response to the post Request of removing a task.
 */
async function removeTaskFromBackend(user) {
  if (user.isAdmin) {
    const data = await client.post(baseURL + "/admin/removeTask", {
      ownerId: user.ownerId,
      id: user.TaskId,
    });
    return data;
  }
  const data = await client.post(baseURL + "/task/RemoveTask", {
    id: user.TaskId,
  });
  return data;
}
/**
 *
 * @param users array of all the users{username, tasks array, id}
 * @param newTask a new Task
 * @returns append the new task to the related user and send the updated array.
 */
function RemoveTask(users, deletedTask) {
  users.forEach((user) => {
    if (user.id === deletedTask.ownerId) {
      user.tasks = user.tasks.filter((task) => task._id !== deletedTask.id);
      return users;
    }
  });
  return users;
}

/**
 *
 * @param isAdmin isAdmin boolean, if the user is an Admin
 * @returns Custom Mutation hook that is for removing tasks.
 */
const useRemoveTasksData = (isAdmin) => {
  const queryClient = useQueryClient();
  const queryName = isAdmin ? "Admintasks" : "tasks";
  return useMutation(removeTaskFromBackend, {
    onSuccess: (data) => {
      queryClient.setQueryData(queryName, (oldQueryData:any) => {
        return {
          data: isAdmin
            ? RemoveTask(oldQueryData.data, data.data)
            : oldQueryData.data.filter((task) => task._id !== data.data.id),
        };
      });
    },
  });
};
export default useRemoveTasksData;
