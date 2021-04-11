import ReactGlobe from "react-globe";
import AddRoomButton from "../components/AddRoomButton";
import "./Room.css";
import markers from "../components/globe/markers";
import markerRenderer from "../components/globe/markerRenderer";
import { Text, Flex, Spacer, Button } from "@chakra-ui/react";
import { Box, Stack } from "@chakra-ui/layout";
import { useState } from "react";

function HomePage() {
  const options = {
    markerRenderer,
    markerTooltipRenderer: () => { },
  };

  const [overlayInfo, setOverlayInfo] = useState(null);
  const joinRoom = (info) => {
    console.log(info)
  }
  return (
    <div>
      <Flex
        pointerEvents="none"
        padding={10}
        zIndex={2}
        pos="absolute"
        top="0"
        left="0"
        flexDirection="column"
        minWidth="100vw"
        minHeight="100vh">
        <AddRoomButton />
        <Spacer />

        {overlayInfo ? (
          <div>
            <Stack spacing={2}>
              <Text color="white" fontSize="3xl">
                Room Info:
              </Text>
              <Text color="white" fontSize="2xl">
                {overlayInfo.currentlyPlaying}
              </Text>
              <Text color="white" fontSize="2xl">
                {overlayInfo.listeners} Campers
              </Text>
              <Button pointerEvents="auto"
                variant="solid"
                maxWidth={150}
                opacity="1"
                colorScheme="blue"
                onClick={(e) => {
                  alert("Join Room!");
                  joinRoom(overlayInfo.id)
                }}
              >
                Join Room{" "}
              </Button>
            </Stack>
          </div>
        ) : null}
      </Flex>

      <div>
        <ReactGlobe
          height="100vh"
          globeTexture="//unpkg.com/three-globe/example/img/earth-night.jpg"
          globeCloudsTexture={null}
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          markers={markers}
          width="100vw"
          options={options}
          onMouseOverMarker={(marker, markerObject, event) => {
            setOverlayInfo(marker);
          }}
        />
      </div>
    </div>
  );
}

export default HomePage;
// https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe_dark.jpg"
