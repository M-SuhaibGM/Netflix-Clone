"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, AspectRatio, HStack, Image, Text } from '@chakra-ui/react';

import Link from 'next/link'
const page = () => {
  const [data, setdata] = useState(null)

  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');
    
    axios
      .put('/api/routes/moves', { id: idParam })
      .then((response) => {
        setdata(response.data);
      })
      .catch((error) => {

      });

  }, []);






  return (
    <div>

      <Box left="0px" bg="black" position="absolute"  h="100vh" w="100vw">

        <HStack color="white" zIndex="3" position="fixed">
          <Box as={Link} href="/data">
            <Image filter="invert(1)" width="40px" src='back.svg' />
          </Box>
          <Text pl="100px" fontSize="30px" fontWeight="700">{data?.title}</Text>
        </HStack>
        
        <AspectRatio   maxW="100vw" ratio={16 / 7}>
          <video
            controls
            poster={data?.thumbnail}
            src={data?.url}>
          </video>
        </AspectRatio>
      </Box> 
  

    </div>
  )
}

export default page