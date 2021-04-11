import { Fragment } from "react"
import { Container, Text } from "@chakra-ui/react"

function Message({name, message}) {
    return (
        <Container maxW="container.md">
            <Text fontSize="sm" color="blue.600">{name} </Text>
            <Text fontSize="sm" color="black.900">{message}</Text>
        </Container>
    )
}

export default Message
