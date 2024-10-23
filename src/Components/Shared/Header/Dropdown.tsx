import { Box } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Select, { type MultiValue, type ActionMeta } from 'react-select'
import makeAnimated from 'react-select/animated'

export interface Category {
  id: string
  title: string
}

interface DropdownProps {
  onCategoryChange: (selectedCategories: Category[]) => void
}

interface SelectOption {
  value: string
  label: string
}

export function Dropdown({ onCategoryChange }: DropdownProps) {
  const [categories, setCategories] = useState<SelectOption[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const categoriesData = response.data || []
        const formattedCategories: SelectOption[] = categoriesData.map((category: Category) => ({
          value: category.id,
          label: category.title,
        }))
        setCategories(formattedCategories)
      } catch (error) {
        console.error('Error fetching categories', error)
      }
    }

    fetchCategories()
  }, [])

  const animatedComponents = makeAnimated()

  const handleChange = (
    selectedOptions: MultiValue<SelectOption>,
    _actionMeta: ActionMeta<SelectOption>
  ) => {
    const selectedCategories = selectedOptions.map((option) => ({
      id: option.value,
      title: option.label,
    }))
    onCategoryChange(selectedCategories)
  }

  return (
    <Box
      width="600px"
      sx={{
        '@media screen and (max-width: 1272px)': {
          width: '450px',
        },
        '@media screen and (max-width: 1996px)': {
          width: '450px',
        },
        '@media screen and (max-width: 1147px)': {
          width: '300px',
        },
        '@media screen and (max-width: 767px)': {
          width: '375px',
          pb: '20px',
          ml: '30px',
        },
      }}
    >
      <Select
        placeholder="Kategorie"
        options={categories}
        isMulti
        closeMenuOnSelect={false}
        components={animatedComponents}
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary25: '#9acc9c',
            primary: '#9acc9c',
          },
        })}
        onChange={(newValue, actionMeta) =>
          handleChange(newValue as MultiValue<SelectOption>, actionMeta as ActionMeta<SelectOption>)
        }
      />
    </Box>
  )
}
