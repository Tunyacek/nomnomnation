import { Box, Flex, Spacer, Image } from '@chakra-ui/react'
import { CreateButton, LoginRedirect, Logout } from '../Buttons/Button.tsx'
import logo from '../../../assets/logo_cream.jpeg'
import { Link } from 'react-router-dom'
//import axios from 'axios'
import axiosInstance from '../../../lib/interceptors/axios.ts'
import { useSelector } from 'react-redux'
import { type RootState } from '../../../lib/redux/store.ts'
import { useDispatch } from 'react-redux'
import { setAuth } from '../../../lib/redux/authSlice.ts'

export function Header() {
  const auth = useSelector((state: RootState) => state.auth.value)

  const dispatch = useDispatch()

  const logout = async () => {
    await axiosInstance.post('authentication/logout', {}, { withCredentials: true })
    localStorage.removeItem('token')
    dispatch(setAuth(false))
  }

  let links

  if (auth) {
    links = (
      <Flex direction="column" mr="30px">
        <Box py="10px" display="flex" justifyContent="center">
          <Logout onClick={logout} />
        </Box>
        <Box>
          <Link to="/add-recipe">
            <CreateButton />
          </Link>
        </Box>
      </Flex>
    )
  } else {
    links = (
      <Flex direction="column">
        <Link to="/login">
          <LoginRedirect />
        </Link>
      </Flex>
    )
  }
  return (
    <Box as="header">
      <Box>
        <Flex ml="5px" bg="#d0ffd5" align="center">
          <HeaderLogo />
          <Spacer />
          {links}
        </Flex>
      </Box>
    </Box>
  )
}

export function HeaderLogo() {
  return (
    <Box ml="10px">
      <Image src={logo} width="110px" height="110px" borderRadius="100%" />
    </Box>
  )
}
