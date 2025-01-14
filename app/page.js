"use client"

import React from 'react'
import "./page.css"
import { Box, Button, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { useEffect } from 'react'
const page = () => {

 

    return (
        <>
            <Box bg="black">
                <div className="main">
                    <nav>
                        <span className="img">
                            <img src="logo.svg" alt="logo" />
                        </span>

                        <Flex align="center" gap="10px">
                            <Box h="30px" className="btn english">
                                English
                            </Box>

                            <Box borderRadius="10px" className='red btn' as={Link} href="/login" >
                                Sign in
                            </Box>
                        </Flex>
                    </nav>
                    <div className="box">
                    </div>
                    <div className="con">
                        <span className="h">Unlimited movies, TV shows, and more</span>
                        <span className="boxes">Watch anywhere. Cancel anytime.</span>
                        <span className="boxes">Ready to watch? Enter your email to create or restart your membership.
                        </span>
                        <span className="span">
                            <input type="text" placeholder="   Email Adress" />
                            <Box as={Link} href="/data" >
                                <button > Get Started</button>
                            </Box>
                        </span>


                    </div>

                    <div className="line">
                    </div>
                </div>
                <section className="first">



                    <div className="text">
                        <span className="header">Enjoy on your TV</span>
                        <span>Watch on Smart TVs, Playstation, Xbox,</span>
                        <span>Chromecast, Apple TV, Blu-ray players, and</span>
                        <span>more.</span>
                    </div>
                    <div className="seimg">
                        <img src="tv.png" alt="" />
                        <video autoPlay loop  src="video.mp4"  ></video>
                    </div>


                </section>


                <div className="line"></div>
                <section className="first">
                    <div className="seimg">
                        <img src="img.jpg" />
                    </div>
                    <div className="text">
                        <span className="header">Download your shows</span>
                        <span>to watch offline</span>
                        <span>Save your favorites easily and always have</span>
                        <span>something to watch.</span>
                    </div>

                </section>

                <div className="line"></div>
                <section className="first">
                    <div className="text">
                        <span className="header">Create profiles for kids</span>
                        <span>Send kids on adventures with their favorite</span>
                        <span>characters in a space made just for them—free</span>
                        <span>with your membership.</span>

                    </div>
                    <div className="seimg">
                        <img src="bottom.png" alt="" />

                    </div>
                </section>
                <section className="faq">
                    <h1>Frequently Asked Questions</h1>
                    <span>what is netflix?</span>
                </section>

            </Box>

        </>
    )
}
export default page