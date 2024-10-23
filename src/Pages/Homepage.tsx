import { Box, Flex } from '@chakra-ui/react'
import { Footer } from '../Components/Shared/Footer/Footer.tsx'
import { Header } from '../Components/Shared/Header/Header.tsx'
import { RecipeList } from '../Components/Homepage/RecipeList.tsx'
import { useEffect, useState } from 'react'
import { type Category } from '../Components/Shared/Header/Dropdown.tsx'
import { Navigate } from 'react-router-dom'
import { Toolbar } from '../Components/Shared/Header/Toolbar.tsx'
import { useDispatch } from 'react-redux'
import { setAuth } from '../lib/redux/authSlice.ts'
import { useSelector } from 'react-redux'
import { type RootState } from '../lib/redux/store.ts'
//import axios from 'axios'
import axiosInstance from '../lib/interceptors/axios.ts'

export function Homepage() {
  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.auth.value)

  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [searchRecipe, setSearchRecipe] = useState('')
  const [redirect, setRedirect] = useState(false)

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

  const handleCategoryChange = (categories: Category[]) => {
    setSelectedCategories(categories)
  }

  const handleSearchChange = (recipe: string) => {
    setSearchRecipe(recipe)
  }

  return (
    <Flex direction="column" minHeight="100vh" bg="#f3fff4">
      <Header />

      <Box>
        <Toolbar onCategoryChange={handleCategoryChange} onSearchChange={handleSearchChange} />
      </Box>
      <Box flex="1">
        <RecipeList selectedCategories={selectedCategories} searchRecipe={searchRecipe} />
      </Box>
      <Footer />
    </Flex>
  )
}
