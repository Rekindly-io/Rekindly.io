import ChatBox from "../components/chatbox/ChatBox"
import {SocketContext} from '../context/socket';
import {useContext} from "react";

function RoomPage() {
    const socket = useContext(SocketContext);

    return (
        <ChatBox />
    )
}

export default RoomPage
