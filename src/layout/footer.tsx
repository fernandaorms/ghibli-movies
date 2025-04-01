import { motion } from 'motion/react';
import Link from 'next/link';
import { FaArrowUp, FaEnvelope, FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';

export function Footer() {
    return (
        <>
            <footer className='relative bg-footer-background mb-10 py-10'>
                <div className='wrapper flex flex-col lg:flex-row text-center lg:text-left items-center lg:justify-between gap-5'>
                    <div className='text-sm text-footer-foreground'>
                        <p>© 2025 Ghibli Movies. All rights reserved. {' '}</p>
                        <p>
                            Made by {' '}
                            <span className='font-semibold text-foreground'>fernanda{''}</span>
                            <span className='font-semibold text-primary'>orms</span>
                            .
                        </p>
                    </div>

                    <SocialNav />
                </div>
            </footer>

            <motion.div
                className='sticky bottom-5 ml-auto mr-5 bg-foreground text-background border-2 border-foreground-light h-10 w-10 flex items-center justify-center rounded-full cursor-pointer z-10'
                whileHover={{ scale: 1.1 }}
            >
                <Link href={'#hero'} className='absolute h-full w-full rounded-full'></Link>

                <FaArrowUp />
            </motion.div>
        </>
    )
}

const SocialNav = () => {
    return (
        <nav className='flex items-center gap-4'>
            <motion.div
                className='relative h-6 w-6 bg-foreground text-background flex items-center justify-center rounded-full transition-colors'
                whileHover={{ scale: 1.15 }}
            >
                <Link
                    href={'https://github.com/fernandaorms'}
                    className='absolute h-full w-full rounded-full'
                    target='_blank'
                />

                <FaGithub />
            </motion.div>

            <motion.div
                className='relative h-6 w-6 bg-foreground text-background flex items-center justify-center rounded-full transition-colors'
                whileHover={{ scale: 1.15 }}
            >
                <Link
                    href={'https://www.linkedin.com/in/fernandaorms/'}
                    className='absolute h-full w-full rounded-full'
                    target='_blank'
                />

                <FaLinkedinIn />
            </motion.div>

            <motion.div
                className='relative h-6 w-6 bg-foreground text-background flex items-center justify-center rounded-full transition-colors'
                whileHover={{ scale: 1.15 }}
            >
                <Link
                    href={'https://www.instagram.com/fernanda_orms/'}
                    className='absolute h-full w-full rounded-full'
                    target='_blank'
                />

                <FaInstagram />
            </motion.div>

            <motion.div
                className='relative h-6 w-6 bg-foreground text-background flex items-center justify-center rounded-full transition-colors'
                whileHover={{ scale: 1.15 }}
            >
                <Link
                    href={'mailto:or.fernanda@hotmail.com'}
                    className='absolute h-full w-full rounded-full'
                />

                <FaEnvelope />
            </motion.div>
        </nav>
    )
}
