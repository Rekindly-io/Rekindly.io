import ChatBox from "../Components/chatbox/ChatBox"
import {SocketContext} from '../context/socket';
import {useContext} from "react";

function RoomPage() {

    const socket = useContext(SocketContext);

    return (
        <div className="page">
         
            <div className="chatbox">
                <ChatBox />
            </div>
            
        </div>
    )
}

export default RoomPage
