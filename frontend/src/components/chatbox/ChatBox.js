import { InputLeftAddon, InputRightAddon } from "@chakra-ui/input"
import { Button, Input, InputGroup } from "@chakra-ui/react"
import { VStack, StackDivider, Box } from "@chakra-ui/layout"
import { EmailIcon } from "@chakra-ui/icons"
import Message from './Message'

function sendMessage(message) {
    // check for blank or empty string
    if (!message || /^\s*$/.test(message)) {
        return
    }

    alert(message)
    // send message via socket io
}

function onKeyPress(event, message) {
    // 13 = enter key
    if (event.keyCode !== 13) {
        return
    }

    sendMessage(message)
}

function ChatBox() {
    let message = ""

    return (
        <Box maxWidth="600px" borderWidth="1px" borderRadius="lg" padding={3}>
            <VStack divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch">

                <Message name="Anonymous" message="Some random message" />
                <Message name="Anonymous" message="Some random dwamessage" />
                <Message name="Anonymous" message="Some randomdawda message" />
                <Message name="Anonymous" message="Some radawdawndom message" />
            </VStack>

            <InputGroup marginTop={3}>
                <InputLeftAddon>
                    <EmailIcon />
                </InputLeftAddon>
                <Input onChange={event => message = event.target.value}
                    variant="outline"
                    placeholder="Send a message..."
                    onKeyDown={event => onKeyPress(event, message)} />
                <InputRightAddon padding={0}>
                    <Button onClick={() => sendMessage(message)}
                        borderLeftRadius={0}
                        colorScheme="red">Send</Button>
                </InputRightAddon>
            </InputGroup>
        </Box>
    )
}

export default ChatBox
