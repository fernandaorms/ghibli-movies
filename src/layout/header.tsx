'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toogle';
import { Logo } from '@/components/logo';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useState } from 'react';
import { FaMagnifyingGlass, FaAlignJustify, FaXmark, FaX } from 'react-icons/fa6';
import { MenuToogle } from '@/components/menu-toogle';
import { SearchToogle } from '@/components/search-toogle';
import { HeaderNav } from '@/components/header-nav';
import { HeaderNavMobile } from '@/components/header-nav-mobile';

export function Header() {
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setScrolled(latest > 100);
    });

    const toggleSearch = () => {
        if (isMenuOpen) setIsMenuOpen(false);
        console.log('Search toggle :)')
    }

    const toggleMenuOpen = () => {
        setIsMenuOpen(!isMenuOpen);
        console.log(isMenuOpen);
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

                        <HeaderNav pathname={pathname} />

                        <div className='flex justify-end gap-4 relative'>
                            <ThemeToggle isMenuOpen={isMenuOpen} />

                            <SearchToogle isMenuOpen={isMenuOpen} onClick={toggleSearch} />

                            <MenuToogle isMenuOpen={isMenuOpen} onClick={toggleMenuOpen} />
                        </div>
                    </div>

                    <HeaderNavMobile pathname={pathname} isMenuOpen={isMenuOpen} onClick={toggleMenuOpen} />
                </div>
            </motion.header>
        </>

    )
}
