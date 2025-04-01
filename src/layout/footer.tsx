import { motion } from 'motion/react';
import Link from 'next/link';
import { FaArrowUp } from 'react-icons/fa6';

export function Footer() {
    return (
        <footer className='relative'>
            <div className='wrapper'>

            </div>

            <motion.div
                className='fixed bottom-5 right-5 bg-foreground text-background border-2 border-foreground-light h-10 w-10 flex items-center justify-center rounded-full cursor-pointer z-10'
                whileHover={{ scale: 1.1 }}
            >
                <Link href={'#hero'} className='absolute h-full w-full rounded-full'></Link>

                <FaArrowUp />
            </motion.div>
        </footer>
    )
}
