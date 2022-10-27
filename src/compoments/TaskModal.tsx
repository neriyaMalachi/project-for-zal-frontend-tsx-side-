import React from "react";
import useStore from "../appStore";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Center,
  Input,
  Button,
  MenuButton,
  MenuList,
  Menu,
  MenuOptionGroup,
  MenuItemOption,
} from "@chakra-ui/react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import useAddTasksData from "../api/tasks/AddTaskAPI";
import { Role } from "../Constant";
import addDays from "date-fns/addDays";
import he from "date-fns/esm/locale/he";
import { useForm } from "react-hook-form";
import { useState } from "react";


const TaskModal= ({ type, useAdminUsersDetails }) => {
  const isAdmin = useStore((state) => state.isAdmin);
  const setIsError = useStore((state) => state.setIsError);

  const { handleSubmit, register } = useForm();

  //Setting the Range in the dayPicker.
  const [range, setRange]:any = useState();
  //the users {id, username}
  const [users, setUsers] = useState([]);
  //the task we want to append to events array.
  const { mutateAsync: addTask } = useAddTasksData(isAdmin, setIsError);

  const {
    isOpen: isTaskModalOpen,
    onOpen: onTaskModalOpen,
    onClose: onTaskModalClose,
  } = useDisclosure();

  /**
   * @return A modal of a menu to choose all the users.
   *  */
  function ChooseUser() {
    return (
      <>
        <ModalBody pb={6}></ModalBody>

        <Center>
          <Menu closeOnSelect={false}>
            <MenuButton required={true} as={Button}>
              בחר חייל
            </MenuButton>
            <MenuList>
              <MenuOptionGroup type="checkbox">
                {useAdminUsersDetails.data.map((key) => {
                  return (
                    <MenuItemOption
                      key={key._id}
                      value={key.username}
                      onClick={() => {
                        const index= users.findIndex((user) => {
                          return user.id === key._id;
                        });
                        if (index !== -1) {
                          users.splice(index, 1);
                        } else {
                          setUsers([
                            ...users,
                            { id: key._id, username: key.username },
                          ]);
                        }
                      }}
                      minH="30px"
                    >
                      {key.username}
                    </MenuItemOption>
                  );
                })}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Center>
      </>
    );
  }
  /**
   * @param values object thats contain Comment about the task
   * @description this function add the new Task in SetNewTask state and close the modal.
   *  */
  async function handleAddTask(values) {
    const task = {
      comment: values.Comment,
      startDate: type === Role.AVTASH ? range.from.getTime() : range.getTime(),
      endDate: type === Role.AVTASH ? range.to.getTime() : range.getTime(),
      type: type,
      ownerId: values,
    };
    if (isAdmin) {
      for await (const user of users) {
        task.ownerId = user.id;
        await addTask({
          task: task,
          isAdmin: isAdmin,
        });
      }
      setUsers([]);
    } else {
      addTask({
        task: task,
        isAdmin: isAdmin,
      });
    }
    onTaskModalClose();
  }
  /**
   * @description this function generate the footer of the modal.
   *  */
  function generateFooter() {
    let footer = <p>אנא בחר את התאריך המבוקש</p>;
    if (range?.from) {
      if (!range.to) {
        if (type === "אבטש") {
          range.to = addDays(range.from.getTime(), 7);
        }
        footer = <p>{format(range.from, "PPP")}</p>;
      } else if (range.to) {
        footer = (
          <p>
            {format(range.from, "PPP")}–{format(range.to, "PPP")}
          </p>
        );
      }
    }
    return footer;
  }

  return (
    <>
      <Button
        onClick={() => {
          onTaskModalOpen();
        }}
      >
        {type}
      </Button>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isTaskModalOpen}
        onClose={onTaskModalClose}
      >
        <ModalOverlay />
        <ModalContent>
          <Center>
            <DayPicker
              locale={he}
              fromDate={new Date()}
              mode={type === "אבטש" ? "range" : "single"}
              min={type === "אבטש" ? 7 : 1}
              max={type === "אבטש" ? 7 : 1}
              selected={range}
              showWeekNumber
              onSelect={setRange}
              footer={generateFooter()}
            />
          </Center>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(handleAddTask)}>
            {isAdmin ? ChooseUser() : ""}
            <Center>
              {/* {username !== "" ? username + " החייל הנבחר הינו" : ""} */}
            </Center>

            <Input
              id="Comment"
              placeholder="אנא הוסף הערה לתורנות"
              type="text"
              {...register("Comment", {
                required: "This is required",
              })}
            />

            <Center>{type}</Center>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3} variant="outline">
                שמור
              </Button>

              <Button onClick={onTaskModalClose}>בטל</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export { TaskModal };
