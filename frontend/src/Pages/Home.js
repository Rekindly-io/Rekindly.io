import { Box, Text, Heading } from "@chakra-ui/react"

function Home() {
    return (
        <Box bg="black" minHeight="100vh" minWidth="min-content">
            <Heading color="white" as="span" fontSize="3xl">{"<"}</Heading>
            <Heading color="white" as="span" fontSize="1xl">See what the world is listening to</Heading>
        </Box>
    )
}

export default Home
