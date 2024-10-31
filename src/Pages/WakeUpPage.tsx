import { Center, Spinner, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const url = import.meta.env.VITE_BE_URL

const THREE_THOUSAND = 3000
const MAX_LOADING_DURATION = 30000

const loadingMessages = [
  'Server se spouští... asi. Možná. 😬',
  'Server si dal šlofíčka. Vydržte chvilku. 😪',
  'Server má právě kreativní pauzu, vydržte chvilku. ✨',
  'Server si dopřává trochu kávy. ☕',
]

export function WakeUp() {
  const toast = useToast()
  const [loading, setLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState('')

  useEffect(() => {
    setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)])

    const fetchData = async () => {
      setLoading(true)
      const timeoutId = setTimeout(() => {
        setLoading(false)
        toast({
          title: 'Chyba',
          description: 'Server je pomalý nebo spící. Zkuste to znovu.',
          status: 'error',
          duration: THREE_THOUSAND,
          isClosable: true,
        })
      }, MAX_LOADING_DURATION)

      try {
        const response = await axios.get(`${url}/wakeUp`)

        if (response.status === 200) {
          clearTimeout(timeoutId)
          setLoading(false)
        }
      } catch (error) {
        clearTimeout(timeoutId)
        toast({
          title: 'Chyba',
          description: 'Nepodařilo se probudit server. Zkuste to znovu později.',
          status: 'error',
          duration: THREE_THOUSAND,
          isClosable: true,
        })
        setLoading(false)
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
  } else {
    return <Navigate to="/home" />
  }
}
