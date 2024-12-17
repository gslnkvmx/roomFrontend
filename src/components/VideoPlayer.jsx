import { Grid, Box, Heading } from "@chakra-ui/react";
import { SocketContext } from "../Context";
import { useContext } from "react";

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
  } = useContext(SocketContext);

  return (
    <Grid justifyContent="center" templateColumns="repeat(2, 1fr)" mt="12">
      {/* my video */}
      {
        <Box>
          <Grid colSpan={1}>
            <Heading as="h5">{name || "Name"}</Heading>
            <video playsInline muted ref={myVideo} autoPlay width="600" />
          </Grid>
        </Box>
      }
      <button onClick={playing ? stopStream : startStream}>Start webcam</button>

      <button onClick={toggleAudio}>Toggle Sound</button>
      <button onClick={toggleVideo}>Toggle Video</button>
      {/* user's video */}
      {callAccepted && !callEnded && (
        <Box>
          <Grid colSpan={1}>
            <Heading as="h5">{call.name || "Name"}</Heading>
            <video playsInline ref={userVideo} autoPlay width="600" />
          </Grid>
        </Box>
      )}
    </Grid>
  );
};
export default VideoPlayer;
