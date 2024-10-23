import {
  Box,
  Text,
  Input,
  Flex,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
  FormControl,
} from '@chakra-ui/react'
import { HeaderLogo } from '../Components/Shared/Header/Header'
import { Footer } from '../Components/Shared/Footer/Footer'
import { BackButton, LoginSubmit, RegisterRedirect } from '../Components/Shared/Buttons/Button'
import { Link, Navigate } from 'react-router-dom'
import { type FormEvent, useState } from 'react'
import axios from 'axios'
import { Eye, EyeOff } from 'lucide-react'
import { useSelector } from 'react-redux'
import { type RootState } from '../lib/redux/store'

const THREE_THOUSAND = 3000

const cleanInput = (input: string): string => {
  return input.trim().replace(/\s+/g, ' ')
}

export function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [show, setShow] = useState(false)

  const auth = useSelector((state: RootState) => state.auth.value)
  const toast = useToast()

  const handleClick = () => setShow(!show)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const response = await axios.post(`/login`, {
        username,
        password,
      })

      const { token } = response.data

      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setRedirect(true)
    } catch (error: any) {
      let errorMessage = 'Došlo k chybě při přihlašování. Zkuste to znovu.'
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error.message || errorMessage
      }
      toast({
        title: 'Chyba při přihlášení',
        description: errorMessage,
        status: 'error',
        duration: THREE_THOUSAND,
        isClosable: true,
      })
    }
  }
  if (redirect || auth) {
    return <Navigate to="/recipes" />
  }

  return (
    <Box bg="#d0ffd5">
      <Box ml="5px">
        <HeaderLogo />
      </Box>
      <Box bg="#B0EBB4" height="80px">
        <Link to={`/`}>
          <BackButton />
        </Link>
      </Box>
      <Box
        minHeight="83.2vh"
        bg="#f3fff4"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Flex>
          <Text as="b" fontSize="30px" m="20px">
            Přihlášení
          </Text>
        </Flex>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3" m="20px">
            <Box>
              <FormControl isRequired>
                <FormLabel>Uživatelské jméno</FormLabel>
                <Input
                  width="400px"
                  borderColor="#9acc9c"
                  bg="white"
                  focusBorderColor="#9acc9c"
                  onChange={(e) => setUsername(cleanInput(e.target.value))}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel>Heslo</FormLabel>
                <InputGroup size="md" width="400px">
                  <Input
                    pr="4.5rem"
                    type={show ? 'text' : 'password'}
                    borderColor="#9acc9c"
                    focusBorderColor="#9acc9c"
                    bg="white"
                    onChange={(e) => setPassword(cleanInput(e.target.value))}
                  />
                  <InputRightElement>
                    <Button
                      h="1.75rem"
                      width="30px"
                      size="xl"
                      onClick={handleClick}
                      bg="#9acc9c"
                      _hover={{ background: '#8cb88d' }}
                    >
                      {show ? <EyeOff /> : <Eye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Box>
          </Flex>
          <Box ml="175px" mt="30px">
            <LoginSubmit />
          </Box>
        </form>
        <Box mt="20px">
          <Link to="/register">
            <RegisterRedirect />
          </Link>
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}
