import ChatBox from "../components/chatbox/ChatBox"
import { SocketContext } from '../context/socket';
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Video from "../components/video/Video.js";

function RoomPage() {
    const socket = useContext(SocketContext);
    const history = useHistory();
    let roomId = "";

    useEffect(() => {
        roomId = sessionStorage.getItem("roomID");

        if (!roomId) {
            history.push("/");
        }
    }, [])

    return (
        <div className="page">
            <div className="video">
                <Video/>
            </div>
            <div className="chatbox">
                <ChatBox />
            </div>
        </div>
    )
}

export default RoomPage
