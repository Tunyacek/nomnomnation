import { Searchbar } from './Searchbar.tsx'
import { Dropdown } from '../Header/Dropdown.tsx'
import { Box, Flex, Spacer, useBreakpointValue } from '@chakra-ui/react'
import { type Category } from './Dropdown.tsx'

interface HeaderProps {
  onCategoryChange: (selectedCategories: Category[]) => void
  onSearchChange: (searchRecipe: string) => void
}

export function Toolbar({ onCategoryChange, onSearchChange }: HeaderProps) {
  const flexDisplayDirection = useBreakpointValue<'column' | 'row'>({
    base: 'column',
    md: 'row',
    lg: 'row',
  })

  return (
    <Box
      bg="#B0EBB4"
      height="80px"
      sx={{
        '@media screen and (max-width: 770px)': {
          height: '130px',
        },
      }}
    >
      <Flex direction={flexDisplayDirection} alignItems="center" height="100%">
        <Box
          ml="15px"
          flex="1"
          sx={{
            '@media screen and (max-width: 767px)': {
              pt: '20px',
            },
          }}
        >
          <Searchbar onSearchChange={onSearchChange} />
        </Box>
        <Spacer />
        <Box mr="15px">
          <Dropdown onCategoryChange={onCategoryChange} />
        </Box>
      </Flex>
    </Box>
  )
}
