import { Fragment } from "react"
import { Container, Text } from "@chakra-ui/react"

function Message({ name, message }) {
  return (
    <Container maxW="container.md">
      <Text fontSize="sm" color="red.300">{name}</Text>
      <Text fontSize="sm" color="white">{message}</Text>
    </Container>
  )
}

export default Message
