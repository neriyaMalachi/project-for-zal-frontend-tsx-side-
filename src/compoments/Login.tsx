import React from "react";
import {
  Box,
  Grid ,
  GridItem,
  FormControl,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { LoginUser } from "../api/authAPI";
import { useState } from "react";
import LoginGuard from "./animationsCompoments/LoginGuardAnimation";


/**
 *
 * @description The component that is responsible for the Login of the user.
 */
function Login(){
  //use formHook to save the username and password
  const { handleSubmit, register } = useForm();
  //variable to check if the auth is failed in order to present it to the user.
  const [authFailed, setAuthFailed] = useState(false);

  //react query hook
  const { mutate } = useMutation(LoginUser);

  /**
   *
   * @param user the data of the useForm hook {Username, Password}
   * @description when the data is submited, a call to the Login Route from the backend is made.
   */
  function onSubmit(user) {
    mutate({
      username: user.Username,
      password: user.Password,
      setAuthFailed: setAuthFailed,
    });
  }

  return (
    <>
      <LoginGuard />

      <form onSubmit={handleSubmit(onSubmit)} dir={"rtl"}>
        <FormControl
          textAlign="center"
          bg="green.800"
          height="100vh"
          width="100wh"
          display={"center"}
          justifyContent={"center"}
        >
          <Box
            backgroundColor="green.500"
            p="40px"
            width="20%"
            height="350px"
            alignSelf="center"
            display={"flex"}
            justifyContent={"center"}
            borderRadius={"10px"}
          >
            <Grid
    
              alignContent="center"
              justifyContent={"center"}
              templateRows={"3"}
              gridGap={"30px"}
            >
              <GridItem gridRow={1}>
                <Input
                  id="Username"
                  type="text"
                  placeholder="שם משתמש"
                  {...register("Username", {
                    required: "This is required",
                  })}
                  size={"60%"}
                  borderRadius={"5px"}
                />
              </GridItem>
              <GridItem gridRow={2}>
                <Input
                  id="Password"
                  type="password"
                  className="input"
                  placeholder="סיסמא"
                  {...register("Password", {
                    required: "This is required",
                  })}
                  alignSelf="center"
                  size={"80%"}
                  borderRadius={"5px"}
                />
              </GridItem>
              <GridItem
                display={"flex"}
                alignContent={"center"}
                justifyContent={"center"}
                gridRow={3}
                borderRadius={"5px"}
              >
                {authFailed && (
                  <Text fontSize={"10px"} color={"red"} fontWeight={"semibold"}>
                    שם משתמש או סיסמא לא נכונים
                  </Text>
                )}
              </GridItem>

              <Button type="submit" colorScheme="gray" mt="50px">
                היכנס
              </Button>
            </Grid>
          </Box>
        </FormControl>
      </form>
    </>
  );
}

export default Login;
