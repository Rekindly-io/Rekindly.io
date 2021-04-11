import { InputLeftAddon, InputRightAddon } from "@chakra-ui/input";
import { Button, Input, InputGroup, useOutsideClick } from "@chakra-ui/react";
import { VStack, StackDivider, Box, Flex } from "@chakra-ui/layout";
import Message from "./Message";
import { useState } from "react";

import { useContext, useEffect } from "react";
import { SocketContext } from "../../context/socket";

const NEW_MESSAGE_SOCKET = "new message";
const SEND_MESSAGE_SOCKET = "send message";

function ChatBox() {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  function sendMessage(message) {
    setMessage("");

    // check for blank or empty string
    if (!message || /^\s*$/.test(message)) {
      return;
    }

    socket.emit(SEND_MESSAGE_SOCKET, message);
  }

  function onKeyPress(event, message) {
    if (event.key !== "Enter") {
      return;
    }

    sendMessage(message);
  }

  useEffect(() => {
    socket.on(NEW_MESSAGE_SOCKET, (newMessageData) => {
      setMessages(messages.concat(newMessageData));
    });
  }, [messages]);

  // current message to send in chat box

  // listen for new messages
  return (
    <Flex
      backgroundColor="white"
      minHeight="40vh"
      maxWidth="600px"
      borderWidth="1px"
      borderRadius="lg"
      padding={3}
      justifyContent="space-between"
      direction="column"
    >
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
        overflowY="scroll"
        maxHeight="320px"
        margin={[0, 4]}
      >
        {messages.map((messageData, index) => {
          return (
            <Message
              key={index}
              name={messageData.user}
              message={messageData.msg}
            />
          );
        })}
      </VStack>

      <InputGroup
        backgroundColor="none"
        marginTop={3}
        maxWidth="100%"
      >
        <Input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          variant="outline"
          placeholder="Send a message..."
          onKeyDown={(event) => onKeyPress(event, message)}
        />
        <InputRightAddon padding={0}>
          <Button
            onClick={() => sendMessage(message)}
            borderLeftRadius={0}
            colorScheme="blue"
          >
            Send
          </Button>
        </InputRightAddon>
      </InputGroup>
    </Flex>
  );
}

export default ChatBox;
