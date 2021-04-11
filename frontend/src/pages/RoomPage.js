import ChatBox from "../components/chatbox/ChatBox"
import { SocketContext } from '../context/socket';
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

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
            <div className="chatbox">
                <ChatBox />
            </div>
        </div>
    )
}

export default RoomPage
