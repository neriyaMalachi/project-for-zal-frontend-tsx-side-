import React, { useRef, useState } from "react";
import useStore from "../appStore";

import {
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogFooter,
} from "@chakra-ui/react";

const ErrorModal = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const isError = useStore((state) => state.isError);
  const setIsError = useStore((state) => state.setIsError);

  function CloseAlert() {
    setIsError(false);
    return () => onClose;
  }
  return (
    <>
      <AlertDialog
        blockScrollOnMount={false}
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isError}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader display="flex" justifyContent="flex-start">
            אזהרה
          </AlertDialogHeader>
          <AlertDialogCloseButton onClick={CloseAlert} />
          <AlertDialogBody dir="rtl">
            שים לב:ישנה התנגשות בין התאריכים
          </AlertDialogBody>
          <AlertDialogFooter justifyContent="space-between">
            <Button ref={cancelRef} onClick={CloseAlert} bg="green.500">
              אישור
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ErrorModal;
