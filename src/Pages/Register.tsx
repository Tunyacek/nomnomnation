import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from '@chakra-ui/react'

import { Footer } from '../Components/Shared/Footer/Footer'
import { BackButton, RegisterSubmit } from '../Components/Shared/Buttons/Button'
import { Link, Navigate } from 'react-router-dom'
import { type FormEvent, useState } from 'react'
import axios from 'axios'
import { Eye, EyeOff } from 'lucide-react'
import { Header } from '../Components/Shared/Header/Header'

const THREE_THOUSAND = 3000

const cleanInput = (input: string): string => {
  return input.trim().replace(/\s+/g, ' ')
}

export function RegisterForm() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const toast = useToast()

  const handleClickPassword = () => setShowPassword(!showPassword)
  const handleClickPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (passwordConfirm !== password) {
      toast({
        title: 'Hesla se neshodují',
        description: 'Zkontrolujte, zda se vaše hesla shodují.',
        status: 'error',
        duration: THREE_THOUSAND,
        isClosable: true,
      })
      return
    }

    try {
      const response = await axios.post('/register', {
        email,
        username,
        password,
      })

      if (response.status === 201) {
        setRedirect(true)
        toast({
          title: 'Účet vytvořen',
          description: 'Prosím, přihlašte se',
          status: 'success',
          duration: THREE_THOUSAND,
          isClosable: true,
        })
      }
    } catch (error: any) {
      let errorMessage = 'Došlo k chybě při registraci. Zkuste to znovu.'

      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.message
      ) {
        errorMessage = error.response.data.error.message
      }

      toast({
        title: 'Chyba při registraci',
        description: errorMessage,
        status: 'error',
        duration: THREE_THOUSAND,
        isClosable: true,
      })
    }
  }

  if (redirect) {
    return <Navigate to="/login" />
  }

  return (
    <Box bg="#d0ffd5">
      <Header />
      <Box bg="#B0EBB4" height="80px">
        <Link to={`/login`}>
          <BackButton />
        </Link>
      </Box>
      <Box
        minHeight="72.8vh"
        bg="#f3fff4"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Flex>
          <Text as="b" fontSize="30px" m="20px">
            Registrace
          </Text>
        </Flex>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3" m="20px">
            <Box>
              <FormControl isRequired>
                <FormLabel>Emailová adresa</FormLabel>
                <Input
                  type="email"
                  borderColor="#9acc9c"
                  maxW="400px"
                  bg="white"
                  focusBorderColor="#9acc9c"
                  onChange={(e) => setEmail(cleanInput(e.target.value))}
                  sx={{ '@media screen and (max-width: 650px)': { maxW: '250px' } }}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel>Uživatelské jméno</FormLabel>
                <Input
                  borderColor="#9acc9c"
                  maxW="300px"
                  bg="white"
                  focusBorderColor="#9acc9c"
                  onChange={(e) => setUsername(cleanInput(e.target.value))}
                  sx={{ '@media screen and (max-width: 650px)': { maxW: '250px' } }}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel>Heslo</FormLabel>
                <InputGroup
                  size="md"
                  maxW="400px"
                  sx={{ '@media screen and (max-width: 650px)': { maxW: '250px' } }}
                >
                  <Input
                    pr="4.5rem"
                    type={showPassword ? 'text' : 'password'}
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
                      onClick={handleClickPassword}
                      bg="#9acc9c"
                      _hover={{ background: '#8cb88d' }}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel>Kontrola hesla</FormLabel>
                <InputGroup
                  size="md"
                  maxW="400px"
                  sx={{ '@media screen and (max-width: 650px)': { maxW: '250px' } }}
                >
                  <Input
                    pr="4.5rem"
                    type={showPasswordConfirm ? 'text' : 'password'}
                    borderColor="#9acc9c"
                    focusBorderColor="#9acc9c"
                    bg="white"
                    onChange={(e) => setPasswordConfirm(cleanInput(e.target.value))}
                  />
                  <InputRightElement>
                    <Button
                      h="1.75rem"
                      width="30px"
                      size="xl"
                      onClick={handleClickPasswordConfirm}
                      bg="#9acc9c"
                      _hover={{ background: '#8cb88d' }}
                    >
                      {showPasswordConfirm ? <EyeOff /> : <Eye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Box>
          </Flex>
          <Box ml="100px" mt="30px" sx={{ '@media screen and (max-width: 650px)': { ml: '80px' } }}>
            <RegisterSubmit />
          </Box>
        </form>
      </Box>
      <Footer />
    </Box>
  )
}
