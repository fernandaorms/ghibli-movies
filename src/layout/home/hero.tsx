'use client';

import { motion, useAnimation, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { FaArrowDown, FaMagnifyingGlass } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function Hero() {
    const heroRef = useRef<HTMLElement | null>(null);
    const router = useRouter();
    const [inputValue, setInputValue] = useState('');
    const ref = useRef(null);
    const inView = useInView(ref, { once: true })
    const mainControls = useAnimation();

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    }

    const clearForm = () => {
        setInputValue('');
    }

    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        clearForm();
        router.push(`/movies?search=${inputValue.trim()}`);
    }

    const scrollHero = () => {
        if (heroRef.current) {
            const offset = heroRef.current.offsetHeight - 80;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (inView) {
            mainControls.start('visible');
        }
    }, [inView])

    return (
        <section
            id='hero'
            className='relative pt-32 h-[100vh]'
            ref={heroRef}
        >
            <div className='lg:block hidden background-image home' style={{ backgroundImage: 'url(/hero-bg-lg.webp)' }}></div>
            <div className='hidden max-lg:block  background-image home' style={{ backgroundImage: 'url(/hero-bg-md.webp)' }}></div>

            <motion.div
                ref={ref}
                variants={{
                    hidden: { opacity: 0, x: -75 },
                    visible: { opacity: 1, x: 0 },
                }}
                initial='hidden'
                animate={mainControls}
                transition={{ duration: 0.3 }}
                className='relative wrapper h-full flex flex-col text-white'
            >
                <div className='flex-1 flex flex-col justify-center text-center'>
                    <div>
                        <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2'>Studios Ghibli.<br />Get to know the movies catalog!</h1>
                        <p className='text-lg '>Ready to explore? Get started and browse a full list of movies with descriptions, ratings, and more!</p>
                    </div>

                    <div className='w-full max-w-[460px] mx-auto mt-6 lg:mt-10'>
                        <form
                            onSubmit={(e) => formSubmit(e)}
                            className='relative grid items-center gap-4 bg-white-20 text-white rounded-full h-[60px]'
                        >
                            <input
                                type='text'
                                placeholder='Search at Ghibli Movies...'
                                value={inputValue}
                                onChange={(e) => handleChange(e)}
                                className='placeholder-white-75 w-full h-[100%] block rounded-full pl-5 md:pl-6 pr-[60px] md:pr-[128px] border-2 border-foreground-light focus:border-primary focus:outline-none'
                            />

                            <button
                                className='absolute top-[6px] right-2 h-[48px] px-4 md:px-8 bg-primary hover:bg-primary-md transition-colors rounded-full text-white cursor-pointer'
                            >
                                <span className='hidden md:block font-medium'>Search</span>
                                <FaMagnifyingGlass className='md:hidden' />
                            </button>
                        </form>
                    </div>
                </div>

                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: 10 }}
                    exit={{ y: 0 }}
                    transition={{
                        repeat: Infinity,
                        duration: 0.5,
                        repeatType: 'reverse'
                    }}
                    onClick={scrollHero}
                    className='h-[40px] w-[40px] border-2 border-white rounded-full bg-semi-transparent flex items-center justify-center mx-auto mt-20 mb-15 cursor-pointer'
                >
                    <FaArrowDown />
                </motion.div>
            </motion.div>
        </section>
    )
}