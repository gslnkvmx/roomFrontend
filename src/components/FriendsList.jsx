import {
  Flex,
  Container,
  Stack,
  Text,
  Input,
  IconButton,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState, useContext } from "react";
import AuthService from "../services/AuthService";
import { Avatar } from "./ui/avatar";
import { LuBan, LuCheck, LuPhone, LuPlus } from "react-icons/lu";
import axios from "axios";
import { SocketContext } from "../Context";

const API_URL = "https://roomserver-g5tq.onrender.com/";

function FriendsList() {
  const { callUser, stream } = useContext(SocketContext);
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
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const RefuseFriend = async (friendId) => {
    axios
      .put(
        API_URL + "friend/refuse",
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
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getFriends = useEffect(() => {
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

  const getRequests = useEffect(() => {
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

  const call = async (email) => {
    axios
      .get(
        API_URL + "peer",
        {
          email: email,
        },
        {
          headers: {
            token: AuthService.getCurrentUser().token,
          },
        }
      )
      .then(function (response) {
        const peerId = response.data.peerId;
        callUser(peerId);
        console.log(response.data.peerId);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Container>
      <Stack as="ul" listStyleType="none" gap={4}>
        {friends.map((item, i) => {
          return (
            <li key={i}>
              <Flex w={"100%"} align={"center"} justify="space-between">
                <Flex align={"center"}>
                  <Avatar variant="outline" name={item.email} />
                  <Text ml={2}>{item.email}</Text>
                </Flex>
                <IconButton
                  size={"xs"}
                  colorPalette={"green"}
                  disabled={!stream ? true : false}
                >
                  <LuPhone />
                </IconButton>
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
                      onClick={() => RefuseFriend(item._id)}
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
