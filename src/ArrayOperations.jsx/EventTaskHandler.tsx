import { Role } from "../../../frontend-tsx-side/src/Constant";

/**
 *
 * @param object object(must have uniqe keys and values)
 * @param value value of a certain key.
 * @returns Locate the key which hold the value.
 */
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}
/**
 *
 * @param element a task
 * @param username string, a username of a user.
 * @returns Converted single task from the backend into an item of the Events array
 */
function convertTaskElementToEventObject(element, username = "") {
  const startDate = element.startDate;
  let endDate = element.startDate;
  if (element.type === Role.AVTASH) {
    endDate = element.endDate;
  }

  return {
    id: element._id,
    title: `${username} ${element.type}: ${element.comment}`,
    allDay: true,
    start: new Date(startDate),
    end: new Date(endDate),
    type: getKeyByValue(Role, element.type),
    owner: element.owner,
  };
}

/**
 *
 * @param tasks boolean, if the user is an Admin
 * @param username
 * @returns Custom react query hook that gets all the tasks.
 */

const convertTasksToEventArray = (tasks, username = "") => {
  if (tasks && tasks.length > 0) {
    const eventsTask = [];
    tasks.forEach((element) =>
      eventsTask.push(convertTaskElementToEventObject(element, username))
    );
    return eventsTask;
  } else {
    return [];
  }
};

/**
 *
 * @param users the tasks from the backend(every user has a task array)==> {username: tasks[]}
 * @returns Events Array for all the users that exists.
 */
function AllUsersToTasksArray(users) {
  const eventsTask = [];
  users.forEach((user) => {
    eventsTask.push(...convertTasksToEventArray(user.tasks, user.username));
  });
  return eventsTask;
}

export {
  getKeyByValue,
  convertTaskElementToEventObject,
  convertTasksToEventArray,
  AllUsersToTasksArray,
};
