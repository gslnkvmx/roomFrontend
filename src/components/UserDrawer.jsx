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

const UserDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DrawerBackdrop />
      <DrawerTrigger asChild _hover={{ cursor: "pointer" }}>
        <Avatar></Avatar>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Your profile</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Stack>
            <Heading size={"md"} mb={"4"}>
              Login or create a new accaunt to add friends and call them faster!
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
        </DrawerBody>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};

export default UserDrawer;
