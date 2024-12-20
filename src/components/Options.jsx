import { useState, useContext } from "react";
import { Button, Input, Container, Stack, Flex } from "@chakra-ui/react";
import { Field } from "./ui/field";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BiClipboard, BiPhoneCall, BiPhoneOff } from "react-icons/bi";
import { SocketContext } from "../Context";

const Options = () => {
  const {
    me,
    callAccepted,
    name,
    setName,
    callEnded,
    leaveCall,
    callUser,
    stream,
  } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");

  return (
    <Container fluid centerContent maxW={600} mt={12}>
      <Flex gap={8} direction={{ base: "column", lg: "row" }} width="100%">
        <Stack gap={4} width="50%">
          <Field label="Your Name">
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              width="100%"
            />
          </Field>

          <CopyToClipboard text={me}>
            <Button variant={"surface"} disabled={!stream ? true : false}>
              Copy ID
            </Button>
          </CopyToClipboard>
        </Stack>

        <Stack gap={4} width="50%">
          <Field label="Make a call">
            <Input
              type="text"
              placeholder="Enter a room id"
              value={idToCall}
              onChange={(e) => setIdToCall(e.target.value)}
              width="100%"
            />
          </Field>

          {callAccepted && !callEnded ? (
            <Button onClick={leaveCall} colorScheme="teal" variant={"surface"}>
              Hang up
            </Button>
          ) : (
            <Button
              onClick={() => callUser(idToCall)}
              colorScheme="teal"
              variant={"surface"}
              disabled={!stream ? true : false}
            >
              Call
            </Button>
          )}
        </Stack>
      </Flex>
    </Container>
  );
};
export default Options;
