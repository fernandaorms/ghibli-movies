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
import { SearchBar } from '@/components/search-bar';
import { useRouter } from 'next/navigation'

export function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchBarValue, setSearchBarValue] = useState('');

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setScrolled(latest > 100);
    });

    const toggleSearch = () => {
        if (isMenuOpen) setIsMenuOpen(false);
        setIsSearchOpen(!isSearchOpen);
    }

    const toggleMenuOpen = () => {
        if (isSearchOpen) setIsSearchOpen(false);
        setIsMenuOpen(!isMenuOpen);
    }

    const searchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSearchBarValue('');
        router.push(`/movies?search=${searchBarValue}`);
    }

    const handleSearchBarChange = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchBarValue(e.currentTarget.value);
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

                    <SearchBar onChange={handleSearchBarChange} inputValue={searchBarValue} scrolled={scrolled} isSearchOpen={isSearchOpen} onSubmit={searchSubmit} />

                    <HeaderNavMobile pathname={pathname} isMenuOpen={isMenuOpen} onClick={toggleMenuOpen} />
                </div>
            </motion.header>
        </>

    )
}
