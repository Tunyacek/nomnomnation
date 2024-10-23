import { Box, Flex } from '@chakra-ui/react'
import { Footer } from '../Components/Shared/Footer/Footer'
import { Recipe } from '../Components/Recipepage/Recipe'
import { Header } from '../Components/Shared/Header/Header'
import { BackButton } from '../Components/Shared/Buttons/Button'
import { Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAuth } from '../lib/redux/authSlice.ts'
import { useSelector } from 'react-redux'
import { type RootState } from '../lib/redux/store.ts'
import axiosInstance from '../lib/interceptors/axios.ts'
//import axios from 'axios'

export function Recipepage() {
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
  }, [])

  if (redirect) {
    return <Navigate to="/login" />
  }
  if (!auth) {
    return <Navigate to="/login" />
  }
  return (
    <Flex direction="column" minHeight="100vh" bg="#f3fff4">
      <Box bg="#d0ffd5">
        <Header />

        <Box bg="#B0EBB4" height="80px">
          <Link to={`/recipes`}>
            <BackButton />
          </Link>
        </Box>
      </Box>
      <Box flex="1">
        <Recipe />
      </Box>
      <Footer />
    </Flex>
  )
}
