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

class QueueButton extends React.Component{
    constructor(){
        super(); 
        this.state = {
            isOpen : false, 
            youtubeLink : "", 
        }
    }




    render(){
    return (
        <div>
            <Button onClick={() => this.setState({isOpen : true})}> Add a song! </Button>
            
            <Modal
                isOpen={this.state.isOpen}
            >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Add a song!</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                <FormControl>
                    <FormLabel>YouTube Link</FormLabel>
                    <Input onChange={(link) => this.setState({youtubeLink : link})} placeholder="Paste YouTube Link" />
                </FormControl>
                </ModalBody>
    
                <ModalFooter>
                <Button onClick={() => this.setState({isOpen : false})} colorScheme="blue" mr={3}>
                    Add a song
                </Button>
                <Button onClick={() => this.setState({isOpen : false})}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
            </Modal>
        </div>
      )
    }
}



// function QueueButton() {
//     const { isOpen, onOpen, onClose } = useDisclosure()
  
//     const initialRef = React.useRef()
//     const finalRef = React.useRef()
  

//   }

export default QueueButton; 