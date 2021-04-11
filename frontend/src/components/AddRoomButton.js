import React, { Fragment, useContext, useEffect, useState } from 'react'
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

  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  const onChange = ({coords}) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    console.log("POSITION UPDATE")
    console.log("Latitude = " + position.latitude)
    console.log("Longitude = " + position.longitude)
    console.log("Error = " + error)

    if(position.latitude){

    } else {
      fetch('http://geolocation-db.com/json/f9902210-97f0-11eb-a459-b997d30983f1')
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        setPosition({
          latitude: data.latitude,
          longitude: data.longitude,
        });
      }).then(() => {
        console.log("POS UNDEFINED FALLBACK")
        console.log("Latitude = " + position.latitude)
        console.log("Longitude = " + position.longitude)
        console.log("Error = " + error)
      })
      .catch(console.log)


    }
  };

  const onError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }
    const watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);

  const socket = useContext(SocketContext);
  const history = useHistory();

  function createRoom(socket, displayName, roomId, lat, long) {
    socket.emit("new user", displayName)
    let data = null;
    if(lat){
      data = {
        room_id: roomId,
        latitude: lat,
        longitude: long,
      }
    } else {
      fetch('http://geolocation-db.com/json/f9902210-97f0-11eb-a459-b997d30983f1')
      .then(res => res.json())
      .then((calldata) => {
        data = {
          room_id: roomId,
          latitude: calldata.latitude,
          longitude: calldata.longitude,
        }
        console.log(data)
      }).then(() => {
        socket.emit("new room", data)
        console.log("POS UNDEFINED FALLBACK")
        console.log("Latitude = " + position.latitude)
        console.log("Longitude = " + position.longitude)
        console.log("Error = " + error)
      })
    }
    
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
                history.push("/room")
                console.log("POSITION SENT")
                console.log("Latitude = " + position.latitude)
                console.log("Longitude = " + position.longitude)
                console.log("Error = " + error)

                createRoom(socket, displayName, roomID, youtubeLink, position.latitude, position.longitude)
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
