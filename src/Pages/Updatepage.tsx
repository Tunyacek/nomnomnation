import { Box, Flex } from '@chakra-ui/react'
import { Footer } from '../Components/Shared/Footer/Footer'
import { Header } from '../Components/Shared/Header/Header'
import { UpdateForm } from '../Components/Create-Update/Updatepage/UpdateForm'
import { Link } from 'react-router-dom'
import { BackButton } from '../Components/Shared/Buttons/Button'

export function Updatepage() {
  return (
    <Flex direction="column" minHeight="100vh" bg="#f3fff4">
      <Box bg="#d0ffd5">
        <Box ml="10px">
          <Header />
        </Box>
      </Box>
      <Box bg="#B0EBB4" height="80px">
        <Link to={`/recipes`}>
          <BackButton />
        </Link>
      </Box>
      <Box flex="1">
        <UpdateForm />
      </Box>
      <Footer />
    </Flex>
  )
}
