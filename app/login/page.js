"use client"
import { VStack, Text, Image, Box, Input, Button, grid, HStack, Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import Link from 'next/link'
import { useState, useRef } from 'react'
import axios from 'axios'

const page = () => {
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
    const password = event.target[1].value;

    const response = await axios.put('/api/routes/user', {
      email,
      password,
    });
    const data = response.data;
    setmessage(data.message)
    if (data.message === 'Logged in successfully') {
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('user', data.user.username);
      window.location.href = '/data';
    }
  }




  const ref = useRef()
  return (
    <div>


      <Box sx={basicBoxStyles}>
        <Box bg="blackAlpha.600" h="100vh" w="100vw">

          <Flex p="20px" justifyContent="space-between">
            <Image zIndex="4" w="150px" src='logo.svg' />
            <Box as={Link} href="/">
              <Image width="30px" filter="invert(1)" src='cross.png' />
            </Box>
          </Flex>

          <Box h="80vh" justifyContent="center" align="center" w="100vw">


            <VStack zIndex="3" bg="black" color="white" h="400px" width="400px">
              <Heading my="20px" ml="50px" alignSelf="start">
                Sign in
              </Heading>
              <form ref={ref} onSubmit={(e) => { handlesubmit(e); ref.current.reset() }}>
                <Input cursor="pointer" _placeholder={{ color: 'white' }} bg="gray" border="none" width="300px" colorScheme="white" type='text' name='email' placeholder='Email or Phone Number' />
                <Input cursor="pointer" _placeholder={{ color: 'white' }} my="20px" bg="gray" colorScheme="white" border="none" width="300px" type='password' name='password' placeholder='Password' />
                <Button cursor="pointer" width="300px" colorScheme="red" color="white" type='submit'>Login</Button>
              </form>
              <Flex mt="20px" gap="20px" >
                <Image w="30px" mb="20px" src='google.png' />
                <Image w="30px" mb="20px" src='linked.png' />
              </Flex>
              <Text fontSize="15px" fontWeight="300">{message}</Text>
              <HStack>
                <Text fontSize="15px" color="gray.400" fontWeight="400">If You are new in Netflix?</Text>
                <Text as={Link} href="/register" fontSize="15px" fontWeight="400" >Create Account</Text>
              </HStack>
            </VStack>


          </Box>
        </Box>



      </Box>

    </div>
  )
}

export default page