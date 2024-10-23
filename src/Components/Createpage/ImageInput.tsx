/* eslint-disable react/prop-types */

import { type ChangeEvent } from 'react'
import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react'

export const ImageInput: React.FC<{ onChange: (e: ChangeEvent<HTMLInputElement>) => void }> = ({
  onChange,
}) => (
  <Box pb="5" mr="15px">
    <FormControl isRequired>
      <FormLabel fontWeight="semibold">Obrázek</FormLabel>
      <Input
        type="file"
        accept="image/*"
        onChange={onChange}
        variant="unstyled"
        _focus={{
          boxShadow: 'none',
        }}
        width="300px"
      />
    </FormControl>
  </Box>
)
