import React from "react";
import { Avatar, Center } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { useUsersData } from "../api/usersAPI";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import {
  Table,
  Thead,
  TableContainer,
  Tr,
  Td,
  Th,
  Tbody,
} from "@chakra-ui/react";
import Loading from "./animationsCompoments/LoadingComp";
/**
 *
 * @description The component that is responsible for the Rating.
 */
const FetchRatings = () => {
  const textColor:string = useColorModeValue("blue.100", "blue");

  const users = useUsersData();
  if (users.isLoading || !users.data) {
    return <Loading></Loading>;
  }

  /**
   *
   * @param data users Array
   * @returns return the first 3 users of the array.
   */
  function generateUsersArray(data) {
    if (data.length >= 3) {
      return data.slice(0, 3);
    }
    return data;
  }

  return (
    <>
      <Center background={"blackAlpha.900"}>
        <BarChart
          width={1000}
          height={300}
          data={generateUsersArray(users.data)}
          barSize={50}
        >
          <YAxis
          >
            <Avatar src={require("./profileHatal.jpg")} />
          </YAxis>

          <XAxis dataKey="username" fill="white" />
          <Tooltip />
          <Bar dataKey="score" fill="green" />
        </BarChart>
      </Center>
      <TableContainer background={"blackAlpha.800"}>
        <Table variant="striped" colorScheme={textColor} size="lg">
          <Thead>
            <Tr>
              <Th></Th>

              <Th>שם</Th>
              <Th>ניקוד</Th>
              <Th> דרגה</Th>
            </Tr>
          </Thead>
          <Tbody textColor={"whatsapp.400"}>
            {users.data
              ? users.data.map((user, index) => {
                return (
                  <Tr key={index}>
                    <Td>
                      <Avatar src={require("./profileHatal.jpg")} />
                    </Td>
                    <Td>{user.username}</Td>
                    <Td>{user.score}</Td>
                    <Td>{user.type}</Td>
                  </Tr>
                );
              })
              : ""}
          </Tbody>
        </Table>
      </TableContainer>
      ;
    </>
  );
};
export default FetchRatings;
