import { Switch } from "./ui/switch";
import {
  Button,
  Box,
  Heading,
  Stack,
  Container,
  AbsoluteCenter,
  Image,
  Float,
  Flex,
  AspectRatio,
} from "@chakra-ui/react";

import { SocketContext } from "../Context";
import { useContext } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { BiSolidCamera, BiSolidCameraOff } from "react-icons/bi";

const VideoPlayer = () => {
  const {
    name,
    callAccepted,
    toggleAudio,
    toggleVideo,
    playing,
    stopStream,
    startStream,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    videoEnabled,
  } = useContext(SocketContext);

  return (
    <Container maxW={1100}>
      <Flex gap={6} direction={"column"} my={8}>
        <Flex
          gap={4}
          direction={{ base: "column", lg: "row" }}
          justify={"center"}
        >
          {/* my video */}
          {
            <Container maxW={500} borderRadius={5} background={"gray.900"}>
              <AbsoluteCenter>
                {playing ? null : (
                  <Image
                    src="cameraBlack.png"
                    style={{ filter: "invert(100%)" }}
                    width={160}
                  ></Image>
                )}
              </AbsoluteCenter>
              <AspectRatio ratio={4 / 3}>
                <video playsInline muted ref={myVideo} autoPlay />
              </AspectRatio>
              <Float placement="bottom-center" offsetY="8">
                <Box bg="gray.700/60" px={4} borderRadius={4}>
                  <Heading as="h5" whiteSpace={"nowrap"}>
                    {name || null}
                  </Heading>
                </Box>
              </Float>
            </Container>
          }

          {/* user's video */}
          {callAccepted && !callEnded && (
            <Container maxW={500} borderRadius={5} background={"gray.900"}>
              <Float placement="bottom-center" offsetY="8">
                <Box bg="gray.700/60" px={4} borderRadius={4}>
                  <Heading as="h5" whiteSpace={"nowrap"}>
                    {call.name || null}
                  </Heading>
                </Box>
              </Float>
              <AspectRatio ratio={4 / 3}>
                <video playsInline ref={userVideo} autoPlay />
              </AspectRatio>
            </Container>
          )}
        </Flex>

        <Stack direction={"row"} alignSelf={"center"}>
          {!stream ? (
            <Button
              variant={"solid"}
              onClick={playing ? stopStream : startStream}
            >
              Connect devices to start a call!
            </Button>
          ) : (
            <>
              <Switch
                size="lg"
                thumbLabel={{
                  on: <FaMicrophone />,
                  off: <FaMicrophoneSlash color="black" />,
                }}
                onCheckedChange={toggleAudio}
                defaultChecked
                disabled={!stream ? true : false}
              ></Switch>
              <Switch
                size="lg"
                thumbLabel={{
                  on: <BiSolidCamera />,
                  off: <BiSolidCameraOff color="black" />,
                }}
                onCheckedChange={toggleVideo}
                defaultChecked
                disabled={
                  !stream ? true : false || !videoEnabled ? true : false
                }
              ></Switch>
            </>
          )}
        </Stack>
      </Flex>
    </Container>
  );
};
export default VideoPlayer;
