import {
  Box,
  Button,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  UnorderedList,
  useToast,
} from '@chakra-ui/react'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

const THREE_THOUSAND = 3000
const ZERO = 0
const ONE = 1

interface ListProps {
  ingredientList: string[]
  setIngredientList: React.Dispatch<React.SetStateAction<string[]>>
}

export function IngredientList({ ingredientList, setIngredientList }: ListProps) {
  const [ingredientInput, setIngredientInput] = useState('')

  const addIngredient = () => {
    if (!ingredientInput.trim()) {
      return
    }

    setIngredientList([...ingredientList, ingredientInput])
    setIngredientInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addIngredient()
    }
  }

  const deleteIngredient = (index: number) => {
    const newIngredientList = [...ingredientList]
    newIngredientList.splice(index, ONE)
    setIngredientList(newIngredientList)
  }

  return (
    <Box pb="5" mr="15px">
      <FormLabel fontWeight="semibold">Ingredience</FormLabel>
      <InputGroup>
        <Input
          bg={'white'}
          onChange={(e) => setIngredientInput(e.target.value)}
          onKeyDown={handleKeyDown}
          value={ingredientInput}
          minLength={ONE}
        />
        <InputRightElement>
          <Button onClick={addIngredient} bg="#9acc9c" _hover={{ background: '#8cb88d' }}>
            <Icon as={Plus} />
          </Button>
        </InputRightElement>
      </InputGroup>

      {ingredientList.length > ZERO && (
        <UnorderedList styleType="none" border="1px solid #e9e8e8" borderRadius="5px" margin="10px">
          {ingredientList.map((item, index) => (
            <ListItem
              bg={'white'}
              key={index}
              borderBottom="1px solid #e9e8e8"
              padding="5px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {item}
              <Button onClick={() => deleteIngredient(index)} variant="ghost" colorScheme="red">
                <Icon as={Minus} />
              </Button>
            </ListItem>
          ))}
        </UnorderedList>
      )}
    </Box>
  )
}

interface InstructionListProps {
  instructionList: string[]
  setInstructionList: React.Dispatch<React.SetStateAction<string[]>>
}

export function InstructionList({ instructionList, setInstructionList }: InstructionListProps) {
  const [instructionInput, setInstructionInput] = useState('')

  const addInstruction = () => {
    if (!instructionInput.trim()) {
      return
    }

    setInstructionList([...instructionList, instructionInput])
    setInstructionInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addInstruction()
    }
  }

  const deleteInstruction = (index: number) => {
    const newInstructionList = [...instructionList]
    newInstructionList.splice(index, ONE)
    setInstructionList(newInstructionList)
  }

  return (
    <Box pb="5" mr="15px">
      <FormLabel fontWeight="semibold">Instrukce</FormLabel>
      <InputGroup>
        <Input
          bg={'white'}
          onChange={(e) => setInstructionInput(e.target.value)}
          onKeyDown={handleKeyDown}
          value={instructionInput}
          minLength={ONE}
        />
        <InputRightElement>
          <Button onClick={addInstruction} bg="#9acc9c" _hover={{ background: '#8cb88d' }}>
            <Icon as={Plus} />
          </Button>
        </InputRightElement>
      </InputGroup>

      {instructionList.length > ZERO && (
        <UnorderedList styleType="none" border="1px solid #e9e8e8" borderRadius="5px" margin="10px">
          {instructionList.map((item, index) => (
            <ListItem
              bg={'white'}
              key={index}
              borderBottom="1px solid #e9e8e8"
              padding="5px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {item}
              <Button onClick={() => deleteInstruction(index)} variant="ghost" colorScheme="red">
                <Icon as={Minus} />
              </Button>
            </ListItem>
          ))}
        </UnorderedList>
      )}
    </Box>
  )
}

interface CategoryInputProps {
  categoryList: string[]
  setCategoryList: React.Dispatch<React.SetStateAction<string[]>>
}

export function CategoryList({ categoryList, setCategoryList }: CategoryInputProps) {
  const toast = useToast()
  const [categoryInput, setCategoryInput] = useState('')

  const addCategory = () => {
    if (categoryInput.length > 25) {
      toast({
        title: 'Kategorie je moc dlouhá.',
        status: 'error',
        duration: THREE_THOUSAND,
        isClosable: true,
      })
      return
    }

    if (!categoryInput.trim()) {
      return
    }

    const newCategory = categoryInput

    setCategoryList([...categoryList, newCategory])
    setCategoryInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addCategory()
    }
  }

  const deleteCategory = (index: number) => {
    const newCategoryList = [...categoryList]
    newCategoryList.splice(index, ONE)
    setCategoryList(newCategoryList)
  }

  return (
    <Box pb="5" mr="15px">
      <FormLabel fontWeight="semibold">Kategorie</FormLabel>
      <InputGroup>
        <Input
          bg={'white'}
          onChange={(e) => setCategoryInput(e.target.value)}
          onKeyDown={handleKeyDown}
          value={categoryInput}
          minLength={ONE}
        />
        <InputRightElement>
          <Button onClick={addCategory} bg="#9acc9c" _hover={{ background: '#8cb88d' }}>
            <Icon as={Plus} />
          </Button>
        </InputRightElement>
      </InputGroup>

      {categoryList.length > ZERO && (
        <UnorderedList styleType="none" border="1px solid #e9e8e8" borderRadius="5px" margin="10px">
          {categoryList.map((item, index) => (
            <ListItem
              bg={'white'}
              key={index}
              borderBottom="1px solid #e9e8e8"
              padding="5px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {item}
              <Button onClick={() => deleteCategory(index)} variant="ghost" colorScheme="red">
                <Icon as={Minus} />
              </Button>
            </ListItem>
          ))}
        </UnorderedList>
      )}
    </Box>
  )
}
