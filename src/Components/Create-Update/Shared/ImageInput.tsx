/* eslint-disable react/prop-types */

import { type ChangeEvent } from 'react'
import { Box, FormLabel, Input } from '@chakra-ui/react'

export const ImageInput: React.FC<{ onChange: (e: ChangeEvent<HTMLInputElement>) => void }> = ({
  onChange,
}) => (
  <Box pb="5" mr="15px">
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
  </Box>
)
