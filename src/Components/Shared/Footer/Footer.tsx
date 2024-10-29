import { Box, Divider, Text } from '@chakra-ui/react'

export function Footer() {
  return (
    <Box bg="#d0ffd5">
      <Divider />
      <Box>
        <Text pt="10px" pb="10px" pl="15px">
          © {new Date().getFullYear()} Nikola Beránková 🦕
        </Text>
      </Box>
    </Box>
  )
}
