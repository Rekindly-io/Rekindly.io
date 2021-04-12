import ChatBox from "../components/chatbox/ChatBox";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Video from "../components/video/Video.js";
import Fire from "../components/fire/Fire";
import Particles from "react-particles-js";
import { Fragment } from "react";
import { Box } from "@chakra-ui/react";

function RoomPage() {
  const history = useHistory();
  const particlesParam = {
    particles: {
      color: { 
        value: "#e84118"
      },
      number: {
        value: 160,
        density: {
          enable: false,
        },
      },
      size: {
        value: 5,
        random: true,
        anim: {
          speed: 20,
          size_min: 0.3,
        },
      },
      line_linked: {
        enable: false
      },
      move: {
        random: true,
        speed: 10,
        direction: "top",
        out_mode: "out",
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: "bubble",
        },
        onclick: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        bubble: {
          distance: 250,
          duration: 2,
          size: 0,
          
          opacity: 0,
          color: "#0000"
        }
      },
    },
  };

  let roomId = "";

  useEffect(() => {
    roomId = sessionStorage.getItem("roomID");

    if (!roomId) {
      history.push("/");
    }
  }, []);

  return (
    <Fragment>
      <div className="page">
        <Particles
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "0",
            right: "0",
          }}
          params={particlesParam}
        />

        <div className="video">
          <Video />
        </div>
        <div className="Fire">
          <Fire />
        </div>
        <div className="chatbox">
          <ChatBox />
        </div>
      </div>
    </Fragment>
  );
}

export default RoomPage;
