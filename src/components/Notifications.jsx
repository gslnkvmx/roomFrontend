import { useContext } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import { SocketContext } from "../Context";

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <Box
          display="flex"
          maxW={500}
          py="2"
          px="4"
          justifyContent="space-between"
          alignContent="center"
          my="14"
          mx={"auto"}
        >
          <Heading as="h3"> {call.name} is calling </Heading>
          <Button onClick={answerCall}>Answer Call</Button>
        </Box>
      )}
    </>
  );
};

export default Notifications;
