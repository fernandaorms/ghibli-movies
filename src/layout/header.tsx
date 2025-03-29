'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toogle';
import { Logo } from '@/components/logo';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useState } from 'react';
import { FaMagnifyingGlass, FaAlignJustify, FaXmark, FaX } from 'react-icons/fa6';

export function Header() {
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setScrolled(latest > 100);
    });

    const toggleSearch = () => {
        if (isOpen) setIsOpen(false);
        console.log('Search toggle :)')
    }

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        console.log(isOpen);
    }

    return (
        <>
            <motion.header
                className='z-50 fixed w-full top-0 '
                initial={{
                    color: 'var(--white)',
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    height: 128,
                }}
                animate={{
                    color: scrolled ? 'var(--foreground)' : 'var(--white)',
                    backgroundColor: scrolled ? 'var(--background)' : 'rgba(0, 0, 0, 0)',
                    height: scrolled ? 80 : 128,
                }}
                transition={{ duration: .3, ease: 'easeInOut' }}
            >
                <div className='h-full w-full'>
                    <div className='h-full w-full wrapper flex justify-between items-center'>
                        <Logo />

                        <nav className='hidden xl:flex gap-8 text-sm font-semibold uppercase'>
                            <Link href={'/'}>Home</Link>
                            <Link href={'/movies'}>Movies</Link>

                            {pathname === '/' && (
                                <>
                                    <Link href={'#about'}>About</Link>
                                    <Link href={'#start'}>Start</Link>
                                    <Link href={'#tech'}>Tech</Link>
                                </>
                            )}
                        </nav>

                        <div className='flex justify-end gap-4'>
                            <ThemeToggle isOpen={isOpen} />

                            <motion.div
                                className={`bg-foreground-light h-10 w-10 flex items-center justify-center rounded-full cursor-pointer z-10${isOpen ? ' text-white' : ''}`}
                                onClick={toggleSearch}
                                whileHover={{ scale: 1.125 }}
                            >
                                <FaMagnifyingGlass />
                            </motion.div>

                            <motion.div
                                className={`xl:hidden bg-foreground-light h-10 w-10 flex items-center justify-center rounded-full cursor-pointer z-10${isOpen ? ' text-white' : ''}`}
                                onClick={toggleOpen}
                                whileHover={{ scale: 1.125 }}
                            >
                                {isOpen ? (
                                    <FaXmark />
                                ) : (
                                    <FaAlignJustify />
                                )}
                            </motion.div>



                        </div>
                    </div>

                    <AnimatePresence initial={false}>
                        {isOpen ? (
                            <motion.div
                                className='xl:hidden bg-primary-md text-white fixed right-0 top-0 w-full max-w-[576px]'
                                initial={{ opacity: 0, x: 50, paddingTop: 'calc(80px + 4rem)' }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                            >
                                <nav className='h-screen flex flex-col gap-8 px-12 text-2xl uppercase'>
                                    <Link href={'/'}>Home</Link>
                                    <Link href={'/movies'}>Movies</Link>

                                    {pathname === '/' && (
                                        <>
                                            <Link href={'#about'}>About</Link>
                                            <Link href={'#start'}>Start</Link>
                                            <Link href={'#tech'}>Tech</Link>
                                        </>
                                    )}
                                </nav>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>
            </motion.header>
        </>

    )
}