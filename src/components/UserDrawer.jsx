"use client";

import { Button, Heading, Stack } from "@chakra-ui/react";
import { Avatar } from "./ui/avatar";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { useState } from "react";
import AuthService from "../services/AuthService";

const UserDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DrawerBackdrop />
      <DrawerTrigger asChild _hover={{ cursor: "pointer" }}>
        {AuthService.getCurrentUser() ? (
          <Avatar
            name={AuthService.getCurrentUser().user.username || null}
          ></Avatar>
        ) : (
          <Avatar></Avatar>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Your profile</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          {AuthService.getCurrentUser() == null ? (
            <Stack>
              <Heading size={"md"} mb={"4"}>
                Login or create a new accaunt to add friends and call them
                faster!
              </Heading>

              <form action="/login" style={{ width: "100%" }}>
                <Button type="submit" variant={"outline"} w={"100%"}>
                  Login
                </Button>
              </form>

              <form action="/register" style={{ width: "100%" }}>
                <Button type="submit" w={"100%"}>
                  Register
                </Button>
              </form>
            </Stack>
          ) : (
            <Stack>
              <Heading>{AuthService.getCurrentUser().user.username}</Heading>
            </Stack>
          )}
        </DrawerBody>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};

export default UserDrawer;
