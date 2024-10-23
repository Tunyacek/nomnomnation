import { Box, Flex } from '@chakra-ui/react'
import { SubmitForm } from '../Components/Createpage/SubmitForm'
import { Footer } from '../Components/Shared/Footer/Footer'
import { Link, Navigate } from 'react-router-dom'
import { BackButton } from '../Components/Shared/Buttons/Button'
import { useEffect, useState } from 'react'
import { Header } from '../Components/Shared/Header/Header'
import { useDispatch } from 'react-redux'
import { setAuth } from '../lib/redux/authSlice.ts'
import { useSelector } from 'react-redux'
import { type RootState } from '../lib/redux/store.ts'
//import axios from 'axios'
import axiosInstance from '../lib/interceptors/axios.ts'

export function Createpage() {
  const [redirect, setRedirect] = useState(false)
  const auth = useSelector((state: RootState) => state.auth.value)

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/authentication/user')
        if (response.status === 200 && response.data) {
          dispatch(setAuth(true))
        } else {
          setRedirect(true)
          dispatch(setAuth(false))
        }
      } catch (error) {
        console.error('Authentication failed:', error)
        setRedirect(true)
        dispatch(setAuth(false))
      }
    }

    fetchData()
  }, [dispatch])

  if (redirect) {
    return <Navigate to="/login" />
  }

  if (!auth) {
    return <Navigate to="/login" />
  }

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
        <SubmitForm />
      </Box>
      <Footer />
    </Flex>
  )
}
