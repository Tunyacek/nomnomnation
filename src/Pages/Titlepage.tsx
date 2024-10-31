import { Box, ButtonGroup, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { Header } from '../Components/Shared/Header/Header'
import { Footer } from '../Components/Shared/Footer/Footer'
import potImage from '../assets/onder-ortel-rpMvlIvT9hM-unsplash.jpg'
import { CornerRightDown } from 'lucide-react'
import { LoginRedirect, RegisterRedirect } from '../Components/Shared/Buttons/Button'
import { Link } from 'react-router-dom'

export function Titlepage() {
  return (
    <Box bg="#d0ffd5">
      <Header />
      <Box minHeight="83.2vh" bg="#f3fff4">
        <Box position="relative" w="100%" h="83.2vh">
          <Image src={potImage} h="100%" w="100%" objectFit="cover" />
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            position="absolute"
            top="0"
            left="0"
            width="100%"
            mt="150px"
            zIndex="1"
            color="black"
            textAlign="left"
            pl="100px"
            sx={{
              '@media screen and (max-width: 509px)': {
                pl: '30px',
              },
            }}
          >
            <Heading
              fontSize="70px"
              ml="40px"
              mb="70px"
              sx={{
                '@media screen and (max-width: 699px)': {
                  fontSize: '50px',
                  ml: '25px',
                  mb: '50px',
                },
                '@media screen and (max-width: 509px)': {
                  fontSize: '35px',
                  ml: '0px',
                  mb: '50px',
                },
              }}
            >
              Nom Nom Nation
            </Heading>
            <Text
              fontSize="19px"
              ml="40px"
              mb="30px"
              sx={{
                '@media screen and (max-width: 699px)': {
                  fontSize: '15px',
                  ml: '25px',
                  mb: '45px',
                },
                '@media screen and (max-width: 509px)': {
                  fontSize: '15px',
                  ml: '0px',
                  mb: '45px',
                },
              }}
            >
              Vaše osobní kuchařka na dosah ruky.
            </Text>
            <Text
              fontSize="19px"
              ml="40px"
              mb="30px"
              sx={{
                '@media screen and (max-width: 699px)': {
                  fontSize: '15px',
                  ml: '25px',
                  mb: '45px',
                },
                '@media screen and (max-width: 509px)': {
                  fontSize: '15px',
                  ml: '0px',
                  mb: '45px',
                },
              }}
            >
              Ukládejte, sdílejte a objevujte chutné recepty na jednom místě!
            </Text>

            <Flex
              direction="row"
              my="30px"
              ml="42px"
              fontSize="19px"
              sx={{
                '@media screen and (max-width: 699px)': {
                  fontSize: '15px',
                  ml: '25px',
                  mb: '45px',
                },
                '@media screen and (max-width: 509px)': {
                  fontSize: '15px',
                  ml: '0px',
                  mb: '45px',
                },
              }}
            >
              <Text>Nemáte účet? Zaregistrujte se zde</Text>
              <Box ml="5px" mt="10px">
                <CornerRightDown size="20px" />
              </Box>
            </Flex>
            <ButtonGroup
              ml="175px"
              sx={{
                '@media screen and (max-width: 699px)': {
                  fontSize: '15px',
                  ml: '110px',
                  width: '250px',
                },
                '@media screen and (max-width: 509px)': {
                  fontSize: '15px',
                  ml: '0px',
                  width: '250px',
                },
              }}
            >
              <Link to="/login">
                <LoginRedirect isHeader={false} />
              </Link>
              <Link to="/register">
                <RegisterRedirect isDarker={true} />
              </Link>
            </ButtonGroup>
          </Flex>
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}
