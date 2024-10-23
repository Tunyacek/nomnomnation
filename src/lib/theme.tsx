import { extendTheme } from '@chakra-ui/react'
import '@fontsource/pacifico'
import '@fontsource/poppins'

const theme = extendTheme({
  fonts: {
    heading: `'Pacifico', cursive`,
    body: `'Poppins', sans-serif`,
  },
})

export default theme
