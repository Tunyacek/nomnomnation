/* eslint-disable react/prop-types */

import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Text,
  Grid,
  Stack,
  Flex,
  UnorderedList,
  ListItem,
  Tag,
  Center,
  Spinner,
} from '@chakra-ui/react'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ZERO = 0

interface Category {
  id: string
  title: string
}

interface Recipe {
  id: string
  image_url: string
  title: string
  summary: string
  categoryId: { category: Category }[]
}

interface RecipeCardProps {
  recipe: Recipe
}

interface RecipeListProps {
  selectedCategories: Category[]
  searchRecipe: string
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Box>
      <Card
        my="5px"
        mx="5px"
        maxW="400px"
        maxH="650px"
        sx={{
          '@media screen and (min-width: 900px) and (max-width: 1140px)': {
            maxW: '600px',
            ml: '30px',
          },

          '@media screen and (min-width: 515px) and (max-width: 699px)': {
            maxW: '600px',
          },
        }}
      >
        <Link to={`/recipes/${recipe.id}`}>
          <CardBody>
            <Box>
              <Flex justifyContent="center">
                <Image
                  objectFit="cover"
                  src={recipe.image_url}
                  width="300px"
                  height="300px"
                  alt={recipe.title}
                  borderRadius="lg"
                />
              </Flex>
              <Stack mt="6" spacing="3">
                <Heading size="md" textAlign="center" fontSize="23px">
                  {recipe.title}
                </Heading>
                <Divider />
                <Text noOfLines={3} fontSize="19px" textAlign="center" height="85px">
                  {recipe.summary}
                </Text>
              </Stack>
            </Box>
          </CardBody>
        </Link>
        <Divider />
        <CardFooter>
          <Box mb="50px" display="flex" flexWrap="wrap" justifyContent="center" alignItems="center">
            {recipe.categoryId?.map((categoryRel, index) => (
              <Tag
                justifyContent={'center'}
                maxW="160px"
                height="35px"
                fontSize="15px"
                color="#f8fae5"
                key={index}
                variant="solid"
                bg="#9acc9c"
                margin="1px"
              >
                {categoryRel.category.title}
              </Tag>
            ))}
          </Box>
        </CardFooter>
      </Card>
    </Box>
  )
}

const url = import.meta.env.VITE_BE_URL

const loadingMessages = [
  'Chvilinku, recepty si dávají kafe. ☕',
  'Trpělivost, recepty mají pauzu na svačinu. 🌮',
  'Prosím počkejte, recepty právě hledají správnou cestu. 🚦',
  'Vydržte chvilku, recepty se ještě pečou v troubě. 🍰',
]

export const RecipeList: React.FC<RecipeListProps> = ({ selectedCategories, searchRecipe }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState('')

  useEffect(() => {
    setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)])

    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('No token found')
        }
        const response = await axios.get(`${url}/recipes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const recipesData = response.data || []
        setRecipes(recipesData)
      } catch (error) {
        console.error('Error fetching recipes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

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

  const filteredRecipes = recipes
    .filter((recipe) => {
      const recipeCategories = recipe.categoryId || []
      return selectedCategories.length > ZERO
        ? recipeCategories.some((categoryRel) =>
            selectedCategories.some((category) => category.id === categoryRel?.category?.id)
          )
        : true
    })
    .filter((recipe) => recipe.title.toLowerCase().includes(searchRecipe.toLowerCase()))

  if (filteredRecipes.length === ZERO) {
    return (
      <Flex justifyContent="center">
        <Box>
          <Text fontSize="30px" mt="40px">
            Recepty nenalezeny🥺
          </Text>
          <Text m="10px" fontSize="20px">
            Co se stalo?
          </Text>
          <UnorderedList>
            <ListItem m="10px">Název neodpovídá žádnému receptu</ListItem>
            <ListItem m="10px">Kategorie nemá žádné recepty</ListItem>
            <ListItem m="10px">Recepty byly smazány</ListItem>
            <ListItem m="10px">Chyba u nás na serveru, nebo v komunikaci se serverem</ListItem>
          </UnorderedList>
        </Box>
      </Flex>
    )
  }

  return (
    <Box my="20px" ml="10px">
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={3}
        sx={{
          '@media screen and (max-width: 1440px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
          },
          '@media screen and (max-width: 1140px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          '@media screen and (max-width: 699px)': {
            gridTemplateColumns: 'repeat(1, 1fr)',
          },
        }}
      >
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Grid>
    </Box>
  )
}
