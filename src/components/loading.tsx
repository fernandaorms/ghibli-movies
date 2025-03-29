
import Image from 'next/image';
import { motion } from 'motion/react';

export function Loading() {
    const dotVariants = {
        pulse: {
            scale: [1, 1.5, 1],
            transition: {
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
            },
        },
    }

    return (
        <div className='absolute top-0 left-0 w-screen h-screen bg-background flex flex-col items-center justify-center gap-20 py-20'>
            <div className='text-lg text-center uppercase flex gap-2 items-baseline'>
                <span>Loading</span>

                <motion.div
                    animate='pulse'
                    transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
                    className='container'
                >
                    <motion.div className='dot bg-foreground' variants={dotVariants} />
                    <motion.div className='dot bg-foreground' variants={dotVariants} />
                    <motion.div className='dot bg-foreground' variants={dotVariants} />
                    <StyleSheet />
                </motion.div>
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

function StyleSheet() {
    return (
        <style>
            {`
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
            }

            .dot {
                width: 2px;
                height: 2px;
                border-radius: 50%;
                will-change: transform;
            }
            `}
        </style>
    )
}