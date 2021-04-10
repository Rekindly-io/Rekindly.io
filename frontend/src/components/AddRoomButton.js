import React from 'react';
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
    ModalCloseButton,
    useDisclosure
  } from '@chakra-ui/react';

import {useContext, useEffect, useState} from "react";
import { SocketContext } from '../context/socket'
import { useHistory } from 'react-router-dom';

//
// class AddRoomButton extends React.Component{
//
//     constructor(){
//         super();
//         this.state = {
//             isOpen : false,
//             roomID : "",
//             youtubeLink : "",
//             displayName : "",
//             // history : useHistory(),
//         }
//     }
//
//     render(){
//
//         return (
//         <div>
//             <Button onClick={() => this.setState({isOpen : true})}>Create room!</Button>
//
//             <Modal
//                 isOpen={this.state.isOpen}
//             >
//             <ModalOverlay/>
//             <ModalContent>
//                 <ModalHeader>Create a room!</ModalHeader>
//                 <ModalCloseButton />
//                 <ModalBody pb={6}>
//                 <FormControl>
//                     <FormLabel>Display Name</FormLabel>
//                     <Input onChange={(displayName) => this.setState({displayName : displayName})} placeholder="Display Name" />
//                 </FormControl>
//                 <FormControl>
//                     <FormLabel>Room ID</FormLabel>
//                     <Input onChange={(id) => this.setState({roomID : id})} placeholder="Room ID" />
//                 </FormControl>
//                 <FormControl>
//                     <FormLabel>YouTube Link</FormLabel>
//                     <Input onChange={(link) => this.setState({youtubeLink : link})} placeholder="Paste YouTube Link" />
//                 </FormControl>
//                 </ModalBody>
//
//                 <ModalFooter>
//                 <Button onClick={() => {
//                     this.setState({isOpen : false})
//                     socket.emit('new room', this.state.roomID)
//                     socket.emit('new user', this.state.displayName)
//                     this.history.pushState(null, 'room');
//                 }} colorScheme="blue" mr={3}>
//                     Create room
//                 </Button>
//                 <Button onClick={() => this.setState({isOpen : false})}>Cancel</Button>
//                 </ModalFooter>
//             </ModalContent>
//             </Modal>
//         </div>
//       )
//     }
// }
//

function AddRoomButton() {

    const socket = useContext(SocketContext);
    const history = useHistory();

    const [isOpen, setIsOpen] = useState(false);
    const [roomID, setRoomID] = useState(false);
    const [youtubeLink, setYoutubeLink] = useState(false);
    const [displayName, setDisplayName] = useState(false);

    return(
      <div>
          <Button onClick={() => setIsOpen(true)}>Create room!</Button>
                       <Modal
                          isOpen={isOpen}
                      >
                      <ModalOverlay/>
                      <ModalContent>
                          <ModalHeader>Create a room!</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody pb={6}>
                          <FormControl>
                              <FormLabel>Display Name</FormLabel>
                              <Input onChange={(displayName) => {
                                  console.log("Emitting ping")
                                  setDisplayName(displayName)
                              }} placeholder="Display Name" />
                          </FormControl>
                          <FormControl>
                              <FormLabel>Room ID</FormLabel>
                              <Input onChange={(id) => setRoomID(id)} placeholder="Room ID" />
                          </FormControl>
                          <FormControl>
                              <FormLabel>YouTube Link</FormLabel>
                              <Input onChange={(link) => setYoutubeLink(link)} placeholder="Paste YouTube Link" />
                          </FormControl>

                          </ModalBody>
                          <ModalFooter>
                              <Button onClick={() => {
                                  setIsOpen(false)
                                  socket.emit('new room', "testID")
                                  socket.emit('new user', "testname")
                                  history.push('/room');
                              }} colorScheme="blue" mr={3}>
                                  Create room
                              </Button>
                              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                          </ModalFooter>
                      </ModalContent>
                       </Modal>
      </div>
    )
}

export default AddRoomButton
