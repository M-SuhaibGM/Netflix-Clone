"use client"
import { HStack, VStack, Image, Text, Flex, Box, AspectRatio, Button, Heading, Avatar, } from '@chakra-ui/react';
import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import "./style.css"
import {
    Container,
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
const page = () => {
    const router = useRouter()


    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [data, setdata] = useState(null)
    const [name, setname] = useState(null)
    const [boxdata, setboxdata] = useState(false)
    const [info, setinfo] = useState(null)
    const [id, setid] = useState("")
    const [favourit, setfavourit] = useState(null)
    const [idd, setidd] = useState(null)
    const [boxes, setBoxes] = useState(null);


    useEffect(() => {

        axios
            .put('/api/routes/fav', { id })
            .then((response) => {
                setBoxes(response.data);
            })
            .catch((error) => {

            });

    }, [id])



    useEffect(() => {

        axios
            .patch('/api/routes/fav', { id })
            .then((response) => {
                setfavourit(response.data);
            })
            .catch((error) => {


            });

    }, [id])

    useEffect(() => {


        if (idd != null) {
            axios
                .delete('/api/routes/fav?id=' + idd)
                .then((response) => {
                    setfavourit(response.data)
                })
                .catch((error) => {

                });
        }
    }, [idd])

    useEffect(() => {


        if (idd != null) {
            axios
                .delete('/api/routes/icon?id=' + idd)
                .then((response) => {
                    setBoxes(response.data)
                })
                .catch((error) => {

                });
        }
    }, [idd])

    const [brightness, setBrightness] = useState(100);

    const handleBoxClick = () => {
        setBrightness(brightness === 100 ? 10 : 100);
    };



    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'false') {
        return <VStack h="100vh" w="100vw" bg="black" justifyContent="center" alignItems="center">
            <Flex>
                <Text fontSize="30px" color="red">Error 404</Text>
                <Text fontSize="30" color="white">|Page not found</Text>
            </Flex>
            <Text color="white" fontSize="30px">login first to use netflix</Text>
            <Box as={Link} href="/login">
                <Button color="white" colorScheme="red">login</Button>
            </Box>
        </VStack>;
    }



    useEffect(() => {


        const user = localStorage.getItem('user');
        setname(user)




        axios
            .get('/api/routes/moves')
            .then((response) => {
                setMovie(response.data);
            })
            .catch((error) => {
                setError(error.message);
            });



        axios.post('/api/routes/moves')
            .then((response) => {
                setdata(response.data);
            })
            .catch((error) => {
                setError(error.message);
            });



    }, []);


    const logout = () => {
        localStorage.setItem('isLoggedIn', false);
        localStorage.setItem('user', null);
        window.location.href = '/';

    }
    if (name != null) {

        console.log(name)
    }
    const [isScrolling, setIsScrolling] = useState(false); // Track scrolling state
    const [lastScrollY, setLastScrollY] = useState(0); // Keep track of the last scroll position

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            // Scrolling down
            setIsScrolling(false);
        } else {
            // Scrolling up
            setIsScrolling(true);
        }

        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);
    return (
        <>
            <Container style={{ filter: `brightness(${brightness}%)` }} bg="black" minW="100vw" minH="100vh"  >
                <VStack w="100vw" h="100vh">
                    <Flex
                        style={{
                            position: 'fixed',
                            top: 0,
                            width: '100%',
                            height: '60px',
                            backgroundColor: '#333',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'transform 0.3s ease',
                            transform: isScrolling ? 'translateY(0)' : 'translateY(-100%)',
                        }}
                        zIndex={10} left="0px" pl="10px" pt="10px" gap="20px" width="99vw" h="60px" align="start" color="white" position="fixed">
                        <Box as={Link} href="/"  >
                            <Image width="40px" filter="invert(1)" src='back.svg' />
                        </Box>
                        <Image width="100px" src='logo.svg' />
                        <Text fontSize="15px" cursor="pointer" fontWeight="600">Home</Text>
                        <Text fontSize="15px" cursor="pointer" fontWeight="600">Series</Text>
                        <Text fontSize="15px" cursor="pointer" fontWeight="600">Films</Text>
                        <Text fontSize="15px" cursor="pointer" fontWeight="600">New & Populor</Text>
                        <Text fontSize="15px" cursor="pointer" fontWeight="600">My list</Text>
                        <Text fontSize="15px" cursor="pointer" fontWeight="600">Search by Language</Text>
                        <Text fontSize="15px" cursor="pointer" fontWeight="600">Tranding</Text>
                        <Button color="white" ml="200px" onClick={logout} colorScheme='red' size="sm" fontSize="15px">Logout</Button>
                        <Flex gap="10px" justify="center">
                            <Avatar width="30px" h="30px" />
                            <Text fontSize="20px" fontWeight="600">{name}</Text>

                        </Flex>


                    </Flex>
                    <Box left="0px" position="absolute" h="100vh" w="100vw">
                        <AspectRatio maxW="100vw" ratio={16 / 7}>
                            <video
                                className='video'
                                autoPlay
                                loop
                                muted
                                poster={movie?.thumbnail}
                                src={movie?.url}>
                            </video>
                        </AspectRatio>

                        <VStack zIndex="5" width="40vw" align="start" position="absolute" top="150px" left="100px" >
                            <Text color="white" fontSize="35px" fontWeight="700">{movie?.title}</Text>
                            <Text color="white" flexWrap="wrap" fontSize="15px" mt="30px" fontWeight="500">{movie?.description}</Text>

                            <Flex gap="20px">

                                {movie != null ? <Button cursor="pointer" onClick={() => { setboxdata(true); setinfo(movie); handleBoxClick() }} colorScheme='whiteAlpha'> more info   <Image pl={1} filter="invert(1)" w="20px" src='info.svg' /></Button> : ""}

                                <Box   >
                                    <Button cursor="pointer" onClick={() => router.push(`/watch?id=${movie?._id}`)} textAlign="center" ><Image width="20px" src='play.svg' /> play</Button>
                                </Box>
                            </Flex>
                        </VStack>




                    </Box>


                </VStack>

                <Heading zIndex={5} p={2} color="white">Tranding now</Heading>







                <Flex flexWrap="wrap" gap="30px"  >
                    {data?.map((item) => (
                        <Popover key={item._id} trigger="hover" openDelay={300}>
                            <PopoverTrigger>
                                <Image
                                    position="relative"
                                    mb="50px"
                                    cursor="pointer"
                                    h="200px"
                                    w="300px"
                                    borderRadius="10px"
                                    src={item.thumbnail}
                                    _hover={{ filter: 'brightness(0)', }}
                                />
                            </PopoverTrigger>
                            <PopoverContent
                                zIndex={5}
                                top="-250px"
                                left="-150px"
                                w="300px"
                                position="absolute"
                                h="280px"
                                overflow="hidden"
                                borderRadius="10px"
                                bg="black"
                            >
                                <Image src={item.thumbnail} h="200px" w="300px" objectFit="cover" />
                                <Flex p={2} justifyContent="space-between">
                                    <Flex gap="10px">
                                        <Image
                                            p={2}
                                            onClick={() => router.push(`/watch?id=${item._id}`)}
                                            cursor="pointer"
                                            textAlign="center"
                                            width="40px"
                                            bg="white"
                                            borderRadius="40px"
                                            src='play.svg'
                                        />
                                        {boxes?.some((box) => (box.id) === item._id) ? (
                                            <Image
                                                cursor="pointer"
                                                p={2}
                                                borderColor="black"
                                                filter="invert(1)"
                                                width="40px"
                                                borderRadius="40px"
                                                border="2px "
                                                src='yes.svg'
                                            />
                                        ) : (
                                            <Image
                                                cursor="pointer"
                                                p={2}
                                                borderRadius="40px"
                                                border="2px "
                                                onClick={() => { setid(item._id) }}
                                                borderColor="black"
                                                filter="invert(1)"
                                                width="40px"
                                                src="plus.svg"
                                            />
                                        )}
                                    </Flex>
                                    <Image cursor="pointer" onClick={() => { setboxdata(true); setinfo(item); handleBoxClick(item._id) }} p={2} borderRadius="40px" border="2px" borderColor="black" filter="invert(1)" width="40px" src='info.svg' />
                                </Flex >
                                <Text fontSize="15px" fontWeight="500" pl={2} color="white">{item.title}</Text>
                            </PopoverContent >
                        </Popover >
                    ))}

                </Flex >

                <Heading color="white" pb="20px" zIndex={5}>My List</Heading>

                <Flex gap="30px" flexWrap="wrap">
                    {favourit?.map((item) => (
                        <Popover key={item._id} trigger="hover" openDelay={300}  >
                            <PopoverTrigger>
                                <Image
                                    position="relative"
                                    mb="50px"
                                    cursor="pointer"
                                    h="200px"
                                    w="300px"
                                    borderRadius="10px"
                                    src={item.thumbnail}
                                    _hover={{
                                        filter: 'brightness(0)',
                                    }}

                                />
                            </PopoverTrigger>
                            <PopoverContent
                                zIndex={5}
                                top="-250px"
                                left="-150px"

                                w="300px"

                                position="absolute"
                                h="280px"
                                overflow="hidden"
                                borderRadius="10px"
                                bg="black"
                            >
                                <Image
                                    src={item.thumbnail}
                                    h="200px"
                                    w="300px"

                                    objectFit="cover"
                                />
                                <Flex p={2} justifyContent="space-between">
                                    <Flex gap="10px">
                                        <Image p={2} onClick={() => router.push(`/watch?id=${item.data}`)} cursor="pointer" textAlign="center" width="40px" bg="white" borderRadius="40px" src='play.svg' />
                                        <Image cursor="pointer" p={2} borderRadius="40px" border="2px " onClick={() => setidd(item.data)} borderColor="black" filter="invert(1)" width="40px" src='cross.png' />
                                    </Flex>
                                    <Image cursor="pointer" onClick={() => { setboxdata(true); setinfo(item); handleBoxClick() }} p={2} borderRadius="40px" border="2px" borderColor="black" filter="invert(1)" width="40px" src='info.svg' />
                                </Flex>
                                <Text fontSize="15px" fontWeight="500" pl={2} color="white">{item.title}</Text>
                            </PopoverContent>
                        </Popover>
                    ))}

                </Flex>







            </Container >

            {boxdata && <Box position="fixed" h="400px" borderRadius="10px" w="500px" bg="black" zIndex="10" top="100px" left="400px" >
                <Image zIndex={12} onClick={() => { setboxdata(false); handleBoxClick() }} position="absolute" right="10px" top="5px" cursor="pointer" filter="invert(1)" width="20px" src='cross.png' />

                <video
                    className='video'
                    autoPlay
                    loop
                    muted
                    poster={info.thumbnail}
                    src={info.url}>
                </video>

                <Flex p={2} justifyContent="space-between"  >
                    <Button px="10px" onClick={() => router.push(`/watch?id=${info._id}`)} cursor="pointer" textAlign="center" bg="white" borderRadius="10px"  >
                        <Image src='play.svg' width="20px" />play
                    </Button>
                    <Text fontSize="20px" fontWeight="500" color="white">{info.title}</Text>
                    <Image cursor="pointer" p={2} borderRadius="40px" bg="white" width="40px" src='plus.svg' />
                </Flex>
                <Text px={4} fontSize="15px" fontWeight="300" color="white">{info.description}</Text>

            </Box>
            }


        </>
    )
}

export default page