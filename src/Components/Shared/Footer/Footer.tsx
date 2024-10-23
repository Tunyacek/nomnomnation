import { Box, Divider, Text } from '@chakra-ui/react'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <Box bg="#d0ffd5">
      <Divider />
      <Box>
        <Text pt="10px" pb="10px" pl="15px">
          © {year} Niky 🦕
        </Text>
      </Box>
    </Box>
  )
}
