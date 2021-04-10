import { InputLeftAddon, InputRightAddon } from "@chakra-ui/input"
import { Button, Input, InputGroup } from "@chakra-ui/react"
import { VStack, StackDivider, Box } from "@chakra-ui/layout"
import { EmailIcon } from "@chakra-ui/icons"
import Message from './Message'
import { io } from "socket.io-client"
import { useState } from 'react';

import {useContext, useEffect} from "react";
import { SocketContext } from '../../context/socket'

const NEW_MESSAGE_SOCKET = "new mesage"
const SEND_MESSAGE_SOCKET = "send message"

function sendMessage(socket, message) {
    // check for blank or empty string
    if (!message || /^\s*$/.test(message)) {
        return
    }

    // alert("message sent: " + message)
    socket.emit(SEND_MESSAGE_SOCKET, message)
}

function onKeyPress(socket, event, message) {
    if (event.key !== "Enter") {
        return
    }

    sendMessage(socket, message)
}



function ChatBox({ roomId }) {
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on(NEW_MESSAGE_SOCKET, newMessageData => {
            setMessages([...messages, <Message name={newMessageData.user} message={newMessageData.msg} />])
        })
    }, []);
    // current message to send in chat box
    let message = ""

    const [messages, setMessages] = useState([<Message name="anonymous" message="some message here" />])

    // listen for new messages
    return (
      <Box maxWidth="600px" borderWidth="1px" borderRadius="lg" padding={3}>
          <VStack divider={<StackDivider borderColor="gray.200" />}
                  spacing={4}
                  align="stretch">

              {messages}
          </VStack>

          <InputGroup marginTop={3}>
              <InputLeftAddon>
                  <EmailIcon />
              </InputLeftAddon>
              <Input onChange={event => message = event.target.value}
                     variant="outline"
                     placeholder="Send a message..."
                     onKeyDown={event => onKeyPress(socket, event, message)} />
              <InputRightAddon padding={0}>
                  <Button onClick={() => sendMessage(socket, message)}
                          borderLeftRadius={0}
                          colorScheme="red">Send</Button>
              </InputRightAddon>
          </InputGroup>
      </Box>
    )
}

export default ChatBox