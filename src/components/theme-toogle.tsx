'use client';

import { useTheme } from 'next-themes'
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { FaMoon, FaSun } from "react-icons/fa6";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    if (!theme) return <div className='bg-transparent h-10 w-10 rounded-full'></div>;

    return (
        <>
            <motion.div
                className='bg-foreground-light h-10 w-10 flex items-center justify-center rounded-full cursor-pointer'
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                whileHover={{ scale: 1.125 }}
            >
                {theme === 'light' ? (
                    <FaSun className='' />
                ) : (
                    <FaMoon className='' />
                )}
            </motion.div>
        </>
    )
}
