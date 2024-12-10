import { useState, useContext } from "react";
import {
  Button,
  Input,
  Field,
  Heading,
  Grid,
  Box,
  Container,
  Fieldset,
} from "@chakra-ui/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BiClipboard, BiPhoneCall, BiPhoneOff } from "react-icons/bi";
import { SocketContext } from "../Context";

const Options = () => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");

  return (
    <Container maxW="1200px" m="35px 0" p="0">
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        width="100%"
      />
      <CopyToClipboard text={me} mt="20">
        <Button colorScheme="teal" variant="solid">
          Copy ID
        </Button>
      </CopyToClipboard>
      <Heading as="h6"> Make a Call </Heading>
      <Input
        type="text"
        value={idToCall}
        onChange={(e) => setIdToCall(e.target.value)}
        width="100%"
      />
      {callAccepted && !callEnded ? (
        <Button onClick={leaveCall} mt="20" colorScheme="teal" variant="solid">
          Hang up
        </Button>
      ) : (
        <Button
          onClick={() => callUser(idToCall)}
          mt="20"
          colorScheme="teal"
          variant="solid"
        >
          Call
        </Button>
      )}
    </Container>
  );
};
export default Options;
