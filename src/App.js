import { Box, Heading, Container, Flex } from "@chakra-ui/react";
import Notifications from "./components/Notifications";
import Options from "./components/Options";
import VideoPlayer from "./components/VideoPlayer";
import { ColorModeButton } from "./components/ui/color-mode";
import { PiFinnTheHumanDuotone } from "react-icons/pi";
import UserDrawer from "./components/UserDrawer";

function App() {
  return (
    <>
      <Box>
        <Container maxW="1400px" mt="8">
          <Flex w={"full"} justify={"space-between"} align={"center"} mb="10">
            <img src="Logo.png" width="150px"></img>
            <div></div>
            <UserDrawer></UserDrawer>
          </Flex>

          <VideoPlayer />
          <Options />
          <Notifications />
        </Container>
      </Box>
    </>
  );
}

export default App;
