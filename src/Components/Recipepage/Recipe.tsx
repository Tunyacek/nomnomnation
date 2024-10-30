import {
  Box,
  Flex,
  Heading,
  Icon,
  ListItem,
  OrderedList,
  Text,
  Image,
  Spacer,
  Divider,
  UnorderedList,
  useToast,
  Tag,
  Center,
  Spinner,
} from '@chakra-ui/react'
import axios from 'axios'
import { CookingPot, Salad, Utensils } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Rating, { FullStar, EmptyStar } from '../Createpage/Rating'
import { DeleteRecipe } from '../Shared/Buttons/Button'
import { useNavigate } from 'react-router-dom'

interface Category {
  id: string
  title: string
}

interface Recipe {
  id: string
  image_url: string
  title: string
  summary: string
  prep_time: number
  cook_time: number
  portions: number
  ingredients: string[]
  instructions: string[]
  categoryId: { category: Category }[]
  rating: string
}

const loadingMessages = [
  'Chvilinku, recept si dává kafe. ☕',
  'Trpělivost, recept má pauzu na svačinu. 🌮',
  'Prosím počkejte, recept právě hledá správnou cestu. 🚦',
  'Vydržte chvilku, recept se ještě peče v troubě. 🍰',
]

const THREE_THOUSAND = 3000

const url = import.meta.env.VITE_BE_URL

export function Recipe() {
  const toast = useToast()
  const navigate = useNavigate()

  const { id } = useParams<{ id: string }>()

  const [recipe, setRecipe] = useState<Recipe>()
  const [loading, setLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState('')

  useEffect(() => {
    setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)])

    const fetchRecipe = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('No token found')
        }
        const response = await axios.get(`${url}/recipes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setRecipe(response.data)
      } catch (error) {
        console.error('Error fetching recipes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [id])

  const deleteRecipe = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No token found')
      }
      await axios.delete(`${url}/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      toast({
        title: 'Recept úspěšně smazán.',
        status: 'success',
        duration: THREE_THOUSAND,
        isClosable: true,
      })
      navigate('/recipes')
    } catch (err) {
      const error = err as Error
      toast({
        title: 'Chyba při mazání receptu.',
        description: error.message,
        status: 'error',
        duration: THREE_THOUSAND,
        isClosable: true,
      })
      throw error
    }
  }

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

  if (!recipe) {
    return (
      <Flex justifyContent="center">
        <Box>
          <Text fontSize="30px" mt="40px">
            Recept nenalezen🥺
          </Text>
          <Text m="10px" fontSize="20px">
            Co se stalo?
          </Text>
          <UnorderedList>
            <ListItem m="10px">Recept byl smazán</ListItem>
            <ListItem m="10px">Chyba v url</ListItem>
            <ListItem m="10px">Chyba u nás na serveru, nebo v komunikaci se serverem</ListItem>
          </UnorderedList>
        </Box>
      </Flex>
    )
  }

  const ratingMap: { [key: string]: number } = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  }

  const stars = ratingMap[recipe.rating] || 0

  return (
    <Box>
      <Box display="flex" gap="2" justifyContent="flex-end" pr="10px" py="10px">
        <DeleteRecipe onClick={deleteRecipe} />
      </Box>

      <Flex flexDirection="column" alignItems="center">
        <Image
          m="40px"
          src={recipe.image_url}
          width="600px"
          height="400px"
          objectFit="cover"
          borderRadius="xl"
          sx={{
            '@media screen and (max-width: 1200px)': {
              width: '500px',
              height: '320px',
            },
            '@media screen and (max-width: 766px)': {
              width: '300px',
              height: '200px',
            },
          }}
        />

        <Heading my="30px">{recipe.title}</Heading>
        <Flex justifyContent="center" alignItems="center" m="15px" mb="30px">
          <Icon as={Salad} />
          <Text ml="5px" mr="15px">
            : {recipe.prep_time} min
          </Text>
          <Spacer width="10px" />
          <Icon as={CookingPot} />
          <Text ml="5px" mr="15px">
            : {recipe.cook_time} min
          </Text>
          <Spacer width="10px" />
          <Icon as={Utensils} />
          <Text ml="5px">: {recipe.portions}</Text>
        </Flex>
        <Box textAlign="center" mb="40px">
          <Text fontWeight="bold" m="5px">
            Shrnutí
          </Text>
          <Text
            maxWidth="1000px"
            sx={{
              '@media screen and (max-width: 766px)': {
                maxWidth: '400px',
              },
            }}
          >
            {recipe.summary}
          </Text>
        </Box>
      </Flex>
      <Divider />
      <Flex direction="column" justifyContent="center" alignItems="center" m="20px">
        <Text fontWeight="bold" mt="10px">
          Ingredience:
        </Text>
        <Box pt="15px">
          <OrderedList mt="10px" pl="20px">
            {recipe.ingredients.map((ingredient, index) => (
              <ListItem key={index} maxWidth="500px" my="5px">
                {ingredient}
              </ListItem>
            ))}
          </OrderedList>
        </Box>
      </Flex>
      <Divider />
      <Flex direction="column" justifyContent="center" alignItems="center" m="20px">
        <Text fontWeight="bold" mt="10px">
          Instrukce:
        </Text>
        <Box pt="15px">
          <OrderedList mt="10px" pl="20px">
            {recipe.instructions.map((instruction, index) => (
              <ListItem key={index} maxWidth="500px" my="5px">
                {instruction}
              </ListItem>
            ))}
          </OrderedList>
        </Box>
      </Flex>
      <Divider />
      <Flex flexDirection="column" alignItems="center" mt="40px">
        <Box textAlign="center" mb="20px">
          <Text fontWeight="bold" fontSize="lg">
            Hodnocení
          </Text>
          <Rating
            count={5}
            value={stars}
            size={30}
            edit={false}
            emptyIcon={<EmptyStar />}
            fullIcon={<FullStar />}
          />
        </Box>
        <Box textAlign="center">
          <Text fontWeight="bold" mb="10px">
            Kategorie
          </Text>
          <Box
            margin="5px"
            mb="50px"
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
          >
            {recipe.categoryId.map((categories, index) => (
              <Tag
                justifyContent={'center'}
                m="5px"
                color="#f8fae5"
                key={index}
                variant="solid"
                bg="#9acc9c"
                sx={{
                  '@media screen and (max-width: 3040px)': {
                    width: '190px',
                    height: '35px',
                    fontSize: '14px',
                  },
                  '@media screen and (max-width: 699px)': {
                    width: '175px',
                    height: '30px',
                    fontSize: '13px',
                  },
                }}
              >
                {categories.category.title}
              </Tag>
            ))}
          </Box>
        </Box>
      </Flex>
      <Box></Box>
    </Box>
  )
}
