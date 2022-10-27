import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  Text,
  useColorModeValue,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Routes } from "../Constant";
import { useRef, useState,ReactElement  } from "react";
import useStore from "../appStore";
import React from "react";
function removeTokens() {
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
}
const NavLink = ({ title, url }) => (
  <Link
    px={2}
    onClick={url === "/" ? removeTokens : () => {}}
    py={1}
    rounded={"md"}
    _hover={{
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={url}
  >
    {title}
  </Link>
);

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
 
  const username = useStore((state) => state.username);
  const isAdmim = useStore((state) => state.isAdmin);

  const [color, setColor] = useState<string>(useColorModeValue("gray.100", "gray.900"));

  if (
    window.location.pathname === "/Rating" ||
    window.location.pathname === "/dateTable"
  ) {
    return (
      <>
        <Box bg={color} px={4}>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <Avatar
              size={"md"}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Hatal.png/180px-Hatal.png"
            />

            <HStack spacing={8} alignItems={"center"}>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                <>
                  <Button onClick={onOpen} fontWeight={"normal"}>
                    התנתק
                  </Button>
                  {Object.keys(Routes).map((key:any) =>
                    key == "/" ? (
                      <AlertDialog
                        motionPreset="slideInBottom"
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                        isOpen={isOpen}
                        isCentered
                        key={key}
                      >
                        <AlertDialogOverlay />
                        <AlertDialogContent>
                          <AlertDialogHeader
                            display="flex"
                            justifyContent="flex-start"
                          >
                            התנתק
                          </AlertDialogHeader>
                          <AlertDialogCloseButton />
                          <AlertDialogBody dir="rtl">
                            האם הנך בטוח שהנך רוצה להתנתק
                          </AlertDialogBody>
                          <AlertDialogFooter justifyContent="space-between">
                            <Link
                              key={key}
                              bg="red.500"
                              fontSize="xl"
                              py={1}
                              px={2}
                              rounded={"lg"}
                              // _autofill
                              _hover={{
                                bg: "gray.200",
                              }}
                              onClick={removeTokens}
                              href="/"
                            >
                              התנתק
                            </Link>
                            <Button
                              ref={cancelRef}
                              onClick={onClose}
                              bg="green.500"
                            >
                              השאר
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    ) : (
                      <NavLink
                        key={key}
                        title={Routes[key]}
                        url={key}
                      ></NavLink>
                    )
                  )}
                </>
              </HStack>
            </HStack>
            <Flex alignItems={"center"}>
              <Text
                color="black"
                mr="30%"
                w="200px"
                fontSize="130%"
                textAlign="center"
              >
                {isAdmim ? "שלום המפקד" : `${username ? username : ""} שלום `}
              </Text>

              <Avatar size={"md"} src={require("./zroa.png")} />
            </Flex>
          </Flex>
        </Box>
      </>
    );
  }
}
