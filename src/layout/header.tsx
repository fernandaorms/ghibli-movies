'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toogle';
import { Logo } from '@/components/logo';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform } from 'motion/react';

export function Header() {
    const pathname = usePathname();
    const { scrollY } = useScroll();

    const color = useTransform(scrollY, [0, 100], ['var(--white)', 'var(--foreground)']);
    const backgroundColor = useTransform(scrollY, [0, 100], ['transparent', 'var(--background)']);
    const height = useTransform(scrollY, [0, 100], [128, 80]);
    // const boxShadow = useTransform(scrollY, [0, 100], ['none', '0 0 12px var(--foreground-light)']);

    return (
        <>
            <motion.header
                className='z-50 fixed w-full top-0 py-2 xl:py-4'
                style={{ color, backgroundColor, height }}
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