import { Icon, Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react'
import { Search } from 'lucide-react'
import { useState } from 'react'

interface SearchbarProps {
  onSearchChange: (searchRecipe: string) => void
}

export function Searchbar({ onSearchChange }: SearchbarProps) {
  const [searchRecipe, setSearchRecipe] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchRecipe(event.target.value)
    onSearchChange(event.target.value)
  }

  return (
    <Stack>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={Search} color="gray.500" />
        </InputLeftElement>
        <Input
          ml="5px"
          bg="white"
          placeholder="Vyhledávání receptu"
          value={searchRecipe}
          onChange={handleChange}
          focusBorderColor="#9acc9c"
          sx={{
            '@media screen and (max-width: 1272px)': {
              width: '600px',
            },
            '@media screen and (max-width: 1996px)': {
              width: '600px',
            },
            '@media screen and (max-width: 1147px)': {
              width: '300px',
            },
            '@media screen and (max-width: 767px)': {
              width: '375px',
            },
          }}
        />
      </InputGroup>
    </Stack>
  )
}
