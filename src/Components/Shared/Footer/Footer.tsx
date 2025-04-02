import { Box, Text } from '@chakra-ui/react'

export function Footer() {
  return (
    <Box bg="#d0ffd5" pb="15px" sx={{ '@media screen and (max-width: 509px)': { pb: '28px' } }}>
      <Box>
        <Text mt="20px" ml="10px">
          © {new Date().getFullYear()} Nikola Beránková 🦕
        </Text>
      </Box>
    </Box>
  )
}
