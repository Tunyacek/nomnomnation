/* eslint-disable react/prop-types */
import axios from 'axios'
import {
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import Rating from '../Shared/Rating'
import {
  CookTimeInput,
  PortionsInput,
  PrepTimeInput,
  SummaryInput,
  TitleInput,
} from '../Shared/SingleInputs'
import { ImageInput } from '../Shared/ImageInput'
import { CategoryList, IngredientList, InstructionList } from '../Shared/ListInputs'
import { UpdateRecipeButton } from '../../Shared/Buttons/Button'

interface Category {
  id: string
  title: string
}

interface FormValues {
  title: string
  summary: string
  prep_time: number
  cook_time: number
  image_url: string
  portions: number
  rating: Rating
  ingredients: string[]
  instructions: string[]
  categoryTitles: string[]
}

const THREE_THOUSAND = 3000
const ZERO = 0
const ONE = 1
const TWO = 2
const THREE = 3
const FOUR = 4
const FIVE = 5

type Rating = 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE'

const url = import.meta.env.VITE_BE_URL

const loadingMessages = [
  'Chvilinku, recept si dává kafe. ☕',
  'Trpělivost, recept má pauzu na svačinu. 🌮',
  'Prosím počkejte, recept právě hledá správnou cestu. 🚦',
  'Vydržte chvilku, recept se ještě peče v troubě. 🍰',
]

export const UpdateForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>({
    title: '',
    summary: '',
    prep_time: ZERO,
    cook_time: ZERO,
    image_url: '',
    portions: ZERO,
    rating: 'ONE',
    ingredients: [],
    instructions: [],
    categoryTitles: [],
  })

  const { id } = useParams<{ id: string }>()

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [rating, setRating] = useState<number>(ZERO)
  const [loading, setLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [categoryList, setCategoryList] = useState<string[]>([])
  const [ingredientList, setIngredientList] = useState<string[]>([])
  const [instructionList, setInstructionList] = useState<string[]>([])
  const toast = useToast()
  const navigate = useNavigate()

  const ratingMap: { [key: string]: number } = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  }

  const handlePrepTimeChange = (_valueAsString: string, valueAsNumber: number) => {
    setValues((prevValues) => ({
      ...prevValues,
      prep_time: isNaN(valueAsNumber) ? 0 : valueAsNumber,
    }))
  }

  const handleCookTimeChange = (_valueAsString: string, valueAsNumber: number) => {
    setValues((prevValues) => ({
      ...prevValues,
      cook_time: isNaN(valueAsNumber) ? 0 : valueAsNumber,
    }))
  }

  const handlePortionsChange = (_valueAsString: string, valueAsNumber: number) => {
    setValues((prevValues) => ({
      ...prevValues,
      portions: isNaN(valueAsNumber) ? 0 : valueAsNumber,
    }))
  }

  const handleInputChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { valueAsString: string; valueAsNumber: number },
    field?: string
  ) => {
    if ('target' in event) {
      const { name, value } = event.target
      setValues((prevValues) => ({ ...prevValues, [name]: value }))
    } else if (field) {
      setValues((prevValues) => ({ ...prevValues, [field]: event.valueAsNumber }))
    }
  }

  useEffect(() => {
    setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)])

    const fetchData = async () => {
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
        const recipe = response.data

        const extractedCategories = recipe.categoryId.map(
          (item: { category: Category }) => item.category.title
        )

        setRating(ratingMap[recipe.rating] || ZERO)
        setIngredientList(recipe.ingredients || [])
        setCategoryList(extractedCategories || [])
        setInstructionList(recipe.instructions || [])

        setValues({
          title: recipe.title || '',
          summary: recipe.summary || '',
          prep_time: recipe.prep_time || ZERO,
          cook_time: recipe.cook_time || ZERO,
          image_url: recipe.image_url || '',
          portions: recipe.portions || ZERO,
          rating: recipe.rating || 'ONE',
          ingredients: recipe.ingredients || [],
          instructions: recipe.instructions || [],
          categoryTitles: recipe.categoryTitles || [],
        })
      } catch (error) {
        console.error('Error fetching recipes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  useEffect(() => {
    return () => {
      if (imageFile) {
        URL.revokeObjectURL(values.image_url)
      }
    }
  }, [imageFile])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[ZERO]
    if (file) {
      setImageFile(file)
      const previewUrl = URL.createObjectURL(file)
      setValues((prevValues) => ({
        ...prevValues,
        image_url: previewUrl,
      }))
    }
  }

  const handleImageUpload = async (): Promise<string> => {
    if (!imageFile) {
      return values.image_url
    }

    const formData = new FormData()
    formData.append('file', imageFile)

    try {
      const response = await axios.post(`${url}/images`, formData)
      return response.data.path
    } catch (err) {
      const error = err as Error
      toast({
        title: 'Nahrávání obrázku selhalo.',
        description: error.message,
        status: 'error',
        duration: THREE_THOUSAND,
        isClosable: true,
      })
      throw error
    }
  }

  const handleUpdate = async (event: FormEvent) => {
    event.preventDefault()

    const convertRatingToEnum = (rating: number): Rating => {
      switch (rating) {
        case ONE:
          return 'ONE'
        case TWO:
          return 'TWO'
        case THREE:
          return 'THREE'
        case FOUR:
          return 'FOUR'
        case FIVE:
          return 'FIVE'
        default:
          throw new Error(`Hodnocení receptu je povinné.`)
      }
    }

    if (categoryList.length === ZERO) {
      toast({
        title: 'Kategorie jsou povinné.',
        status: 'error',
        duration: THREE_THOUSAND,
        isClosable: true,
      })
      return
    }

    const uniqueCategories = Array.from(new Set(categoryList))

    if (ingredientList.length === ZERO) {
      toast({
        title: 'Ingredience jsou povinné.',
        status: 'error',
        duration: THREE_THOUSAND,
        isClosable: true,
      })
      return
    }

    if (instructionList.length === ZERO) {
      toast({
        title: 'Instrukce jsou povinné.',
        status: 'error',
        duration: THREE_THOUSAND,
        isClosable: true,
      })
      return
    }

    setIsUpdating(true)

    try {
      const imageUrl = await handleImageUpload()

      const data = {
        ...values,
        image_url: imageUrl,
        rating: convertRatingToEnum(rating),
        ingredients: ingredientList,
        instructions: instructionList,
        categoryTitles: uniqueCategories,
      }

      const token = localStorage.getItem('token')

      await axios.put(`${url}/recipes/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      toast({
        title: 'Recept úspěšně změněn.',
        status: 'success',
        duration: THREE_THOUSAND,
        isClosable: true,
      })

      setValues({
        title: '',
        summary: '',
        prep_time: ZERO,
        cook_time: ZERO,
        image_url: '',
        portions: ZERO,
        rating: 'ONE',
        ingredients: [],
        instructions: [],
        categoryTitles: [],
      })
      setImageFile(null)
      setRating(ZERO)
      setIngredientList([])
      setInstructionList([])
      setCategoryList([])

      navigate('/recipes')
    } catch (err) {
      const error = err as Error
      toast({
        title: 'Nastala chyba.',
        description: error.message,
        status: 'error',
        duration: THREE_THOUSAND,
        isClosable: true,
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Box>
      {loading ? (
        <Center h="full" flexDirection="column" height="100vh">
          <Spinner color="teal.500" size="lg" borderWidth="4px" />
          <Text mt="20px" fontSize="25px">
            {loadingMessage}
          </Text>
        </Center>
      ) : isUpdating ? (
        <Center height="100vh" flexDirection="column">
          <Spinner color="teal.500" size="lg" borderWidth="4px" />
          <Text mt="20px" fontSize="25px">
            Recept už se řítí do databáze!
          </Text>
        </Center>
      ) : (
        <form onSubmit={handleUpdate}>
          <Flex direction="column" maxW="600px" pt="15px" pl="15px">
            <TitleInput value={values.title} onChange={handleInputChange} />
            <SummaryInput value={values.summary} onChange={handleInputChange} />
            <Flex direction="row" gap="90px">
              <Box pb="5" mr="15px">
                <ImageInput onChange={handleFileChange} />
              </Box>
              <Image src={values.image_url} height="150px" width="150px" borderRadius="10px" />
            </Flex>
            <IngredientList ingredientList={ingredientList} setIngredientList={setIngredientList} />
            <InstructionList
              instructionList={instructionList}
              setInstructionList={setInstructionList}
            />
            <Box pb="5" mr="15px">
              <FormControl isRequired>
                <FormLabel fontWeight="semibold">Hodnocení</FormLabel>
                <Rating
                  count={5}
                  value={rating}
                  edit={true}
                  onChange={(value) => setRating(value)}
                />
              </FormControl>
            </Box>
            <Box pb="5px" mr="15px" width="250px">
              <PortionsInput value={values.portions} onChange={handlePortionsChange} />
            </Box>
            <CategoryList categoryList={categoryList} setCategoryList={setCategoryList} />
            <HStack spacing="15px" pb="5" mr="15px">
              <PrepTimeInput value={values.prep_time} onChange={handlePrepTimeChange} />
              <CookTimeInput value={values.cook_time} onChange={handleCookTimeChange} />
            </HStack>
            <Box pb="5" mr="15px" textAlign="right">
              <UpdateRecipeButton />
            </Box>
          </Flex>
        </form>
      )}
    </Box>
  )
}
