/* eslint-disable react/prop-types */

import { type ChangeEvent } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Textarea,
} from '@chakra-ui/react'

export const TitleInput: React.FC<{
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}> = ({ value, onChange }) => (
  <Box pb="5" mr="15px">
    <FormControl isRequired>
      <FormLabel fontWeight="semibold">Název</FormLabel>
      <Input bg={'white'} name="title" onChange={onChange} value={value} />
    </FormControl>
  </Box>
)

export const SummaryInput: React.FC<{
  value: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}> = ({ value, onChange }) => (
  <Box pb="5" mr="15px">
    <FormControl isRequired>
      <FormLabel fontWeight="semibold">Shrnutí</FormLabel>
      <Textarea bg={'white'} name="summary" onChange={onChange} value={value} minHeight="150px" />
    </FormControl>
  </Box>
)

interface TimeInputProps {
  value: number
  onChange: (valueAsString: string, valueAsNumber: number) => void
}

export const PrepTimeInput: React.FC<TimeInputProps> = ({ value, onChange }) => (
  <Box pr="15px" mr="15px">
    <FormControl isRequired>
      <FormLabel fontWeight="semibold">Čas přípravy (min)</FormLabel>
      <NumberInput bg="white" name="prep_time" onChange={onChange} value={value}>
        <NumberInputField />
      </NumberInput>
    </FormControl>
  </Box>
)

export const CookTimeInput: React.FC<TimeInputProps> = ({ value, onChange }) => (
  <Box pl="15px" mr="15px">
    <FormControl isRequired>
      <FormLabel fontWeight="semibold">Čas vaření (min)</FormLabel>
      <NumberInput bg="white" name="cook_time" onChange={onChange} value={value}>
        <NumberInputField />
      </NumberInput>
    </FormControl>
  </Box>
)

export const PortionsInput: React.FC<TimeInputProps> = ({ value, onChange }) => (
  <Box>
    <FormControl isRequired>
      <FormLabel fontWeight="semibold">Počet porcí</FormLabel>
      <NumberInput bg="white" name="portions" onChange={onChange} value={value}>
        <NumberInputField />
      </NumberInput>
    </FormControl>
  </Box>
)
