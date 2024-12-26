import {
  Flex,
  Container,
  Stack,
  Text,
  Input,
  IconButton,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import { Avatar } from "./ui/avatar";
import { LuBan, LuCheck, LuPlus } from "react-icons/lu";
import axios from "axios";

const API_URL = "http://localhost:5000/";

function FriendsList() {
  const [friendToAdd, setFriendToAdd] = useState("");
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  const AddFriend = async () => {
    axios
      .put(
        API_URL + "friend/add",
        {
          email: friendToAdd,
        },
        {
          headers: {
            token: AuthService.getCurrentUser().token,
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const AcceptFriend = async (friendId) => {
    axios
      .put(
        API_URL + "friend/accept",
        {
          friendId: friendId,
        },
        {
          headers: {
            token: AuthService.getCurrentUser().token,
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    window.location.reload();
  };

  useEffect(() => {
    axios
      .get(API_URL + "user/friends", {
        headers: {
          token: AuthService.getCurrentUser().token,
        },
      })
      .then(function (response) {
        setFriends(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(API_URL + "user/friendRequests", {
        headers: {
          token: AuthService.getCurrentUser().token,
        },
      })
      .then(function (response) {
        setFriendRequests(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <Stack as="ul" listStyleType="none" gap={4}>
        {friends.map((item, i) => {
          return (
            <li key={i}>
              <Flex w={"100%"} align={"center"}>
                <Avatar variant="outline" name={item.email} />
                <Text ml={2}>{item.email}</Text>
              </Flex>
            </li>
          );
        })}

        <Flex gap="2">
          <Input
            required={true}
            size="sm"
            value={friendToAdd}
            onChange={(e) => setFriendToAdd(e.target.value)}
          ></Input>
          <IconButton size="sm" variant="surface" onClick={() => AddFriend()}>
            <LuPlus />
          </IconButton>
        </Flex>
        <Box
          borderWidth="1px"
          borderColor="border.disabled"
          color="fg.disabled"
          p="4"
        >
          {friendRequests.map((item, i) => {
            return (
              <li key={i}>
                <Flex w={"100%"} align={"center"} justify="space-between">
                  <Flex align={"center"}>
                    <Avatar variant="outline" name={item.email} />
                    <Text ml={2}>{item.email}</Text>
                  </Flex>
                  <Box>
                    <IconButton
                      size="xs"
                      m="2"
                      colorPalette="green"
                      variant="surface"
                      onClick={() => AcceptFriend(item._id)}
                    >
                      <LuCheck />
                    </IconButton>

                    <IconButton
                      size="xs"
                      m="2"
                      colorPalette="red"
                      variant="surface"
                    >
                      <LuBan />
                    </IconButton>
                  </Box>
                </Flex>
              </li>
            );
          })}
        </Box>
      </Stack>
    </Container>
  );
}

export default FriendsList;
