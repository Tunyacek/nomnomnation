import {
  Box,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react'
import { Header } from '../Components/Shared/Header/Header'
import { Footer } from '../Components/Shared/Footer/Footer'
import potImage from '../assets/onder-ortel-rpMvlIvT9hM-unsplash.jpg'
import { CornerRightDown } from 'lucide-react'
import { LoginRedirect, RegisterRedirect } from '../Components/Shared/Buttons/Button'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

const THREE_THOUSAND = 3000
const MAX_LOADING_DURATION = 10000

const loadingMessages = [
  'Server se spouští... asi. Možná. 😬',
  'Server si dal šlofíčka. Vydržte chvilku. 😪',
  'Server má právě kreativní pauzu, vydržte chvilku. ✨',
  'Server si dopřává trochu kávy. ☕',
]

export function Titlepage() {
  const toast = useToast()
  const [loading, setLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState('')

  useEffect(() => {
    setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)])

    const fetchData = async () => {
      const timeoutId = setTimeout(() => {
        setLoading(false)
        toast({
          title: 'Časový limit serveru',
          description: 'Server reaguje příliš dlouho. Zkuste to znovu později.',
          status: 'error',
          duration: THREE_THOUSAND,
          isClosable: true,
        })
      }, MAX_LOADING_DURATION)

      try {
        const response = await axios.get('/wakeUp')
        if (response.status === 200) {
          setLoading(false)
          clearTimeout(timeoutId)
        }
      } catch (error) {
        setLoading(false)
        clearTimeout(timeoutId)
        toast({
          title: 'Chyba',
          description: 'Nepodařilo se probudit server. Zkuste to znovu později.',
          status: 'error',
          duration: THREE_THOUSAND,
          isClosable: true,
        })
      }
    }

    fetchData()
  }, [toast])

  if (loading) {
    return (
      <Center h="full" flexDirection="column" height="100vh">
        <Spinner color="teal.500" size="lg" borderWidth="4px" />
        <Text mt="20px" fontSize="25px">
          {loadingMessage}
        </Text>
      </Center>
    )
  }

  return (
    <Box bg="#d0ffd5">
      <Header />
      <Box minHeight="83.2vh" bg="#f3fff4">
        <Box position="relative" w="100%" h="83.2vh">
          <Image src={potImage} h="100%" w="100%" objectFit="cover" />
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            zIndex="1"
            color="black"
            textAlign="left"
            pl="100px"
          >
            <Heading
              fontSize="70px"
              ml="40px"
              mb="70px"
              sx={{
                '@media screen and (max-width: 699px)': {
                  fontSize: '50px',
                  ml: '25px',
                  mb: '50px',
                },
                '@media screen and (max-width: 509px)': {
                  fontSize: '35px',
                  ml: '25px',
                  mb: '50px',
                },
              }}
            >
              Nom Nom Nation
            </Heading>
            <Text
              fontSize="19px"
              ml="40px"
              mb="30px"
              sx={{
                '@media screen and (max-width: 699px)': {
                  fontSize: '15px',
                  ml: '25px',
                  mb: '45px',
                },
                '@media screen and (max-width: 509px)': {
                  fontSize: '15px',
                  ml: '25px',
                  mb: '45px',
                },
              }}
            >
              Vaše osobní kuchařka na dosah ruky.
            </Text>
            <Text
              fontSize="19px"
              ml="40px"
              mb="30px"
              sx={{
                '@media screen and (max-width: 699px)': {
                  fontSize: '15px',
                  ml: '25px',
                  mb: '45px',
                },
                '@media screen and (max-width: 509px)': {
                  fontSize: '15px',
                  ml: '25px',
                  mb: '45px',
                },
              }}
            >
              Ukládejte, sdílejte a objevujte chutné recepty na jednom místě!
            </Text>

            <Flex
              direction="row"
              my="30px"
              ml="35px"
              fontSize="19px"
              sx={{
                '@media screen and (max-width: 699px)': {
                  fontSize: '15px',
                  ml: '25px',
                  mb: '45px',
                },
                '@media screen and (max-width: 509px)': {
                  fontSize: '15px',
                  ml: '25px',
                  mb: '45px',
                },
              }}
            >
              <Text>Nemáte účet? Zaregistrujte se zde</Text>
              <Box>
                <CornerRightDown />
              </Box>
            </Flex>
            <ButtonGroup
              ml="175px"
              sx={{
                '@media screen and (max-width: 699px)': {
                  fontSize: '15px',
                  ml: '110px',
                  width: '250px',
                },
                '@media screen and (max-width: 509px)': {
                  fontSize: '15px',
                  ml: '90px',
                  width: '250px',
                },
              }}
            >
              <Link to="/login">
                <LoginRedirect isHeader={false} />
              </Link>
              <Link to="/register">
                <RegisterRedirect isDarker={true} />
              </Link>
            </ButtonGroup>
          </Flex>
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}
