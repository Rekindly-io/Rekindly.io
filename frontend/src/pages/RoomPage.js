import ChatBox from "../Components/chatbox/ChatBox"
import {SocketContext} from '../context/socket';
import {useContext} from "react";


function RoomPage() {

    const socket = useContext(SocketContext);

    return (
        <ChatBox />
    )
}

export default RoomPage
