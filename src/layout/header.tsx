'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toogle';
import { Logo } from '@/components/logo';
import { usePathname } from 'next/navigation';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useState } from 'react';

export function Header() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setScrolled(latest > 100);
    });

    return (
        <>
            <motion.header
                className='z-50 fixed w-full top-0 py-2 xl:py-4'
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
                    <ThemeToggle />
                </div>


            </motion.header>
        </>

    )
}
