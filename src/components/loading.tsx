
import Image from 'next/image';
import { motion } from 'motion/react';

export function Loading() {
    return (
        <div className='absolute top-0 left-0 w-screen h-screen bg-background flex flex-col items-center justify-center gap-20 py-20'>
            <div className='text-lg text-center uppercase flex gap-1.5'>
                <span>Loading</span>

                <motion.span
                    animate={{ opacity: [0.2, 1, 0.2], x: [0, 0, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                    style={{
                        letterSpacing: '4px'
                    }}
                >
                    ...
                </motion.span>
            </div>

            <div className='w-50'>
                <Image
                    className='w-full'
                    src='/totoro-walking.gif'
                    alt='Totoro walking.'
                    width={200}
                    height={0}
                    priority
                />
            </div>
        </div>
    )
}
