'use client';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from "motion/react"
import { Header } from '@/layout/header';

export default function Home() {
    // return <Loading />
    return (
        <div className=''>
            <Header />

            <main className=''>
                <section
                    id='hero'
                    className='relative pt-32 h-[100vh]'>
                    <div className='lg:block hidden background-image !bg-fixed' style={{backgroundImage: 'url(/hero-bg-lg.webp)'}}></div>
                    <div className='hidden max-lg:block  background-image !bg-fixed' style={{backgroundImage: 'url(/hero-bg-md.webp)'}}></div>
                    <div className='relative wrapper flex items-center justify-center h-full'>
                            <h1 className='xl:text-7xl text-white'>Hero title bla bla bla</h1>
                    </div>
                </section>

                {/* <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                /> */}
                <section
                    id='about'
                    className='h-[100vh] max-h-[720px] py-28'
                >
                    <div className='wrapper'>
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <h2>About</h2>
                            <p>This Projects is a Studios Ghibli cathalog where you can search a movie and get to know more about it like: rating, overview, gallery, casting and even watch trailers if it’s available.</p>
                        </motion.div>
                    </div>

                </section>

                <section
                    id='start'
                    // className='h-[100vh] max-h-[720px] py-28 bg-foreground text-background'
                    className='h-[100vh] max-h-[720px] py-28 bg-primary-md text-neutral-light'
                >
                    <div className='wrapper'>
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <h2>How it Started</h2>
                            <p>In 2021, I started in web development by creating Ghibli Flix, a Studio Ghibli movie catalog. The goal was to replicate two Netflix pages using only HTML, CSS, and JavaScript.</p>
                            <p>At that stage, the site was purely visual, displaying a static, limited catalog with data from localhost and no interactive features.</p>
                        </motion.div>
                    </div>
                </section>

                <section
                    id='tech'
                    className='h-[100vh] max-h-[720px] py-28'
                >
                    <div className='wrapper'>
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <h2>Technologies</h2>
                            <p>This projects uses TMDB  API for the movies cathalog and the website was built with:
                                React JS, Javascrips (ES6), Node JS, CSS</p>
                        </motion.div>
                    </div>

                </section>


            </main>
            <footer className=''></footer>
        </div>
    );
}
