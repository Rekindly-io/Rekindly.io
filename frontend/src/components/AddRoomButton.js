import React, {Fragment} from "react";
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
  useDisclosure,
} from "@chakra-ui/react";

class AddRoomButton extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      roomID: "",
      youtubeLink: "",
      displayName: "",
    };
  }

  render() {
    return (
      <Fragment>
        <Button bg="red.600" zIndex={2} pos="absolute" top="10" left="10" onClick={() => this.setState({ isOpen: true })}>
          Create a new room!
        </Button>

        <Modal isOpen={this.state.isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create a room!</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Display Name</FormLabel>
                <Input
                  onChange={(displayName) =>
                    this.setState({ displayName: displayName })
                  }
                  placeholder="Display Name"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Room ID</FormLabel>
                <Input
                  onChange={(id) => this.setState({ roomID: id })}
                  placeholder="Room ID"
                />
              </FormControl>
              <FormControl>
                <FormLabel>YouTube Link</FormLabel>
                <Input
                  onChange={(link) => this.setState({ youtubeLink: link })}
                  placeholder="Paste YouTube Link"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={() => this.setState({ isOpen: false })}
                colorScheme="blue"
                mr={3}
              >
                Create room
              </Button>
              <Button onClick={() => this.setState({ isOpen: false })}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Fragment>
    );
  }
}

export default AddRoomButton;
