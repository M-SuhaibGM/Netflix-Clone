"use client"
import { VStack, Text, Image, Box, Input, Button, grid, HStack, Flex, Heading, list } from '@chakra-ui/react'
import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useState } from 'react'
import { useRef } from 'react'

const Register = () => {
  const [message, setmessage] = useState("")

  const basicBoxStyles = {
    w: '100vw',
    h: '100vh',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '20px',
    background:
      'url(bg.jpg) center/cover no-repeat',
  }
  const handlesubmit = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const username = event.target[1].value;
    const password = event.target[2].value;
  
    try {
      const response = await axios.post('/api/routes/user', {
        email,
        username,
        password,
      });
  
      const data = response.data;
      setmessage(data);
    } catch (error) {
      console.error(error);
    }
  };
   const ref=useRef()

  return (
    <div>


      <Box sx={basicBoxStyles}>
        <Box bg="blackAlpha.600" h="100vh" w="100vw">
          <Flex p="20px" justifyContent="space-between">
            <Image zIndex="4" w="150px" src='logo.svg' />
            <Box as={Link} href="/"   >
              <Image width="30px" filter="invert(1)" src='cross.png' />
            </Box>
          </Flex>

          <Box h="80vh" justifyContent="center" align="center" w="100vw">


            <VStack zIndex="3" bg="black" color="white" h="450px" width="400px">
              <Heading my="10px" ml="50px" alignSelf="start">
                Create Account
              </Heading>
              <form ref={ref} onSubmit={(e)=>{handlesubmit(e); ref.current.reset()}}>
                <Input cursor="pointer" _placeholder={{ color: 'white' }} bg="gray" border="none" width="300px" colorScheme="white" type='text' name='email' placeholder='Email or Phone Number' />
                <Input cursor="pointer" _placeholder={{ color: 'white' }} bg="gray" mt="20px" border="none" width="300px" colorScheme="white" type='text' name='username' placeholder='Username' />
                <Input cursor="pointer" _placeholder={{ color: 'white' }} my="20px" bg="gray" colorScheme="white" border="none" width="300px" type='password' name='password' placeholder='Password' />
                <Button cursor="pointer" width="300px" colorScheme="red" color="white" type='submit'>Create account</Button>
              </form>
              <Flex mt="20px" gap="20px" >
                <Image w="30px"  src='google.png' />
                <Image w="30px"  src='linked.png' />
              </Flex>
              <Text fontSize="15px" fontWeight="300">{message}</Text>
              <HStack>
                <Text fontSize="15px" color="gray.400" fontWeight="400">If You already have an account?</Text>
                <Text as={Link} href="/login" fontSize="15px" fontWeight="400" >Sign in</Text>
              </HStack>
            </VStack>


          </Box>
        </Box>



      </Box>

    </div>
  )
}

export default Register