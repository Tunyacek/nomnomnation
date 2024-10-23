/* eslint-disable react/prop-types */

import { Box, Button, ButtonGroup, Input } from '@chakra-ui/react'
import { ArrowLeft, ArrowRight, Pen, Trash2 } from 'lucide-react'
import { type ChangeEvent } from 'react'

const ZERO = 0

interface AddImageProps {
  onUpload: (filePath: string) => void
}

export function CreateButton() {
  return (
    <Button
      color="#f8fae5"
      bg="#9acc9c"
      _hover={{ background: '#8cb88d' }}
      borderRadius="lg"
      mb="18px"
      mr="5px"
    >
      Vytvořit nový recept
    </Button>
  )
}

export function SubmitRecipeButton() {
  return (
    <Button
      bg="#9acc9c"
      _hover={{ background: '#8cb88d' }}
      borderRadius="lg"
      width="200px"
      type="submit"
    >
      Vytvořit recept
    </Button>
  )
}

export const AddImage: React.FC<AddImageProps> = ({ onUpload }) => {
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > ZERO) {
      const file = event.target.files[ZERO]

      const formData = new FormData()
      formData.append('image', file)

      try {
        const response = await fetch('/upload-endpoint', {
          method: 'POST',
          body: formData,
        })

        const result = await response.json()
        onUpload(result.imagePath)
      } catch (error) {
        console.error('Error uploading file:', error)
      }
    }
  }

  return (
    <Box>
      <Input type="file" accept="image/*" onChange={handleFileChange} style={{ border: 'none' }} />
    </Box>
  )
}
export function PrevNextButtons() {
  return (
    <ButtonGroup py="7" display="flex" justifyContent="center" alignItems="center">
      <Button
        width="150px"
        leftIcon={<ArrowLeft />}
        variant="solid"
        bg="#9acc9c"
        color="#f8fae5"
        _hover={{ background: '#8cb88d' }}
      >
        Předchozí
      </Button>
      <Button
        width="150px"
        rightIcon={<ArrowRight />}
        variant="solid"
        bg="#9acc9c"
        color="#f8fae5"
        _hover={{ background: '#8cb88d' }}
      >
        Další
      </Button>
    </ButtonGroup>
  )
}

export function BackButton() {
  return (
    <Button
      leftIcon={<ArrowLeft />}
      width="125px"
      ml="15px"
      mt="20px"
      variant="solid"
      bg="#f3fff4"
      color="#8cb88d"
      _hover={{ background: '#defde0' }}
    >
      Zpět
    </Button>
  )
}

export function DeleteRecipe({ onClick }: { onClick: () => void }) {
  return (
    <Button colorScheme="red" variant="outline" onClick={onClick}>
      <Trash2 />
    </Button>
  )
}

export function UpdateRecipe() {
  return (
    <Button colorScheme="yellow" variant="outline">
      <Pen />
    </Button>
  )
}

export function LoginRedirect({ isHeader = true }) {
  return (
    <Button
      variant="outline"
      borderColor="#575757"
      color="#575757"
      _hover={{ background: '#9acc9c', color: 'white' }}
      mr={isHeader ? '30px' : '0px'}
    >
      Přihlásit
    </Button>
  )
}

export function RegisterRedirect({ isDarker = false }) {
  return (
    <Button
      color={isDarker ? 'black' : '#8cb88d'}
      variant="outline"
      _hover={{ background: isDarker ? '#9dcc9d85' : '#9dcc9d85', color: 'white' }}
      borderColor={isDarker ? 'black' : '#9acc9c'}
    >
      Vytvořit nový účet
    </Button>
  )
}

export function LoginSubmit() {
  return (
    <Button type="submit" bg="#9acc9c" _hover={{ background: '#8cb88d' }}>
      Přihlásit
    </Button>
  )
}

export function RegisterSubmit() {
  return (
    <Button type="submit" bg="#9acc9c" _hover={{ background: '#8cb88d' }}>
      Vytvořit účet
    </Button>
  )
}

type LogoutProps = {
  onClick?: () => void
}

export function Logout({ onClick }: LogoutProps) {
  return (
    <Button
      variant="outline"
      borderColor="#9acc9c"
      color="#9acc9c"
      _hover={{ background: '#8cb88d' }}
      onClick={onClick}
    >
      Odhlásit
    </Button>
  )
}
