import React, { Fragment, useContext, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { SocketContext } from "../context/socket"
import { useHistory } from "react-router-dom";


function AddRoomButton() {
  const [isOpen, setOpen] = useState(false)
  const [roomID, setRoomID] = useState("")
  const [youtubeLink, setYoutubeLink] = useState("")
  const [displayName, setDisplayName] = useState("")

  const socket = useContext(SocketContext);

  let history = useHistory()

  function createRoom(socket, displayName, roomId) {
    socket.emit("new user", displayName)
    socket.emit("new room", roomId)
    sessionStorage.setItem("roomID", roomId);
    history.push("/room");
  }

  return (
    <Fragment>
      <Button pointerEvents="auto" variant="solid" maxWidth={250} opacity="1" colorScheme="blue" onClick={() => setOpen(true)}>
        Create a new room!
        </Button>

      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a room!</ModalHeader>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Display Name</FormLabel>
              <Input
                onChange={(event) => setDisplayName(event.target.value)}
                placeholder="Display Name"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Room ID</FormLabel>
              <Input
                onChange={(event) => setRoomID(event.target.value)}
                placeholder="Room ID"
              />
            </FormControl>
            <FormControl>
              <FormLabel>YouTube Link</FormLabel>
              <Input
                onChange={(event) => setYoutubeLink(event.target.value)}
                placeholder="Paste YouTube Link"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                setOpen(false)
                createRoom(socket, displayName, roomID, youtubeLink)
              }}
              colorScheme="blue"
              mr={3}
            >
              Create room
              </Button>
            <Button onClick={() => setOpen(false)}>
              Cancel
              </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  )
}

export default AddRoomButton;
