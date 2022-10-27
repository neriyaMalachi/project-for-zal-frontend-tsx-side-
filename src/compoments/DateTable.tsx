import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import Loading from "./animationsCompoments/LoadingComp";
import moment from "moment";
import useStore from "../appStore";
import {
  Button,
  Flex,
  Grid,
  MenuList,
  Menu,
  MenuButton,
} from "@chakra-ui/react";
import { TaskModal } from "./TaskModal";
import { RoleColors } from "../Constant";
import "moment/locale/he";
import  ErrorModal  from "./ErrorModal";
import useRemoveTasksData from "../api/tasks/RemoveTaskAPI";
import { useAdminUsersDetails } from "../api/usersAPI";
import { useAdminTasksData, useTasksData } from "../api/tasks/FetchTasksAPI";

//setting The Calendar in hebrew
moment.locale("he");
//An array that sets all the title to the buttons.
const roles = ["אבטש", "ניקיון", "לילה", "הנפצה"];
const localizer = momentLocalizer(moment);

/**
 *
 * @description The component that is responsible for DateTable.
 */
function DateTable() {
  // events represent the tasks that will   appear at the user's calendar.
  const [events, setEvents] = useState([]);

  //store the isAdmin in a variable.
  const isAdmin = useStore((state:any) => state.isAdmin);
  //Query that recvive all the users data to the admin.
  const Admintasks:any = useAdminTasksData(isAdmin, setEvents);
  //Query that recvive all the tasks of the user.
  const tasks = useTasksData(isAdmin, setEvents);

  const UsersDetails = useAdminUsersDetails(isAdmin);
  //selectedId represent the id that the user is selecting right now.
  const [selectedId, setSelectedId] = useState("");
  //selectedId represent the username that the user is selecting right now.
  const [selectedOwner, setSelectedOwner] = useState("");

  //Query that will return the id of the task that the user want to delete (also changes the events array.)
  const { mutate: removeTask } = useRemoveTasksData(isAdmin);

  //only when the button is Click we want to refatch.
  const removeEvent = () => {
    if (selectedId !== "" && selectedOwner !== "") {
      removeTask({
        TaskId: selectedId,
        ownerId: selectedOwner,
        isAdmin: isAdmin,
      });
    }
  };

  /**
   *
   * @param tasks the tasks from the backend
   * @param username string, a username of a user.
   * @returns Events Array.
   */

  if (isAdmin) {
    if (
      Admintasks.Loading ||
      !Admintasks.data ||
      UsersDetails.isLoading ||
      !UsersDetails.data
    ) {
      return (
        <>
          <Loading></Loading>
        </>
      );
    }
  } else if (tasks.isLoading || !tasks.data) {
    return (
      <>
        <Loading></Loading>
      </>
    );
  }
  function handleSelect(event) {
    setSelectedId(event.id);
    setSelectedOwner(event.owner);
  }
  return (
    <>
      <Grid textColor={"black"} bgColor={"seagreen"} h={"100vh"}>
        <Calendar
          className="calendardate"
          views={["month"]}
          localizer={localizer}
          onSelectSlot={() => {
            setSelectedId("");
          }}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          controls={["calendar"]}
          select="range"
          culture="he"
          showAllEvents={true}
          selected={selectedId}
          onSelectEvent={(event) => handleSelect(event)}
          eventPropGetter={(event) => {
            const backgroundColor = RoleColors[event.type];
            return { style: { backgroundColor } };
          }}
          touchUi={true}
          style={{ height: 500, margin: "50px" }}
        />
        <Flex justify={"center"} marginBottom={"10%"}>
          <Button bgColor={"red.400"} onClick={removeEvent}>
            מחק תורנות
          </Button>
          <Menu>
            <MenuButton bgColor={"green.400"} as={Button}>
              בחר תורנות
            </MenuButton>
            <MenuList bgBlendMode={"-moz-initial"} zIndex={10}>
              {roles.map((role, index) => (
                <TaskModal
                  key={index}
                  type={role}
                  useAdminUsersDetails={UsersDetails}
                />
              ))}
            </MenuList>
          </Menu>
        </Flex>
        <ErrorModal />
      </Grid>
    </>
  );
}

export default DateTable;
