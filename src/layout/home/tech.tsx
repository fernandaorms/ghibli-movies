'use client';

import { once } from 'events';
import { motion, useAnimation, useInView } from 'motion/react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { RiNextjsLine, RiTailwindCssLine } from 'react-icons/ri';

export function Tech() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true })

    const mainControls = useAnimation();

    useEffect(() => {
        if (inView) {
            mainControls.start('visible');
        }
    }, [inView])

    return (
        <section
            id='tech'
            className='h-fit min-h-[50vh] max-h-[720px] py-12 lg:py-20 xl:py-28 flex items-center justify-center'
        >
            <div className='wrapper'>
                <motion.div
                    ref={ref}
                    variants={{
                        hidden: { opacity: 0, y: 75 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    initial='hidden'
                    animate={mainControls}
                    transition={{ duration: 0.5 }}
                >
                    <div className='max-w-[675px] mx-auto text-center'>
                        <h2 className='text-2xl lg:text-3xl xl:text-4xl font-semibold mb-2 lg:mb-4 xl:mb-6'>Technologies</h2>

                        <p className='text-content'>This project uses the {' '}
                            <Link
                                href='https://developer.themoviedb.org/docs/getting-started'
                                target='_blank'
                                className='font-medium underline hover:text-foreground transition-colors'
                            >
                                TMDB API
                            </Link>
                            {' '} for the movie catalog and was built with:</p>
                    </div>

                    <div className='flex items-center justify-center gap-4 flex-wrap font-medium mt-6 xl:mt-10'>
                        <div className='flex items-center gap-2 bg-foreground-light py-3 px-3 rounded-xl'>
                            <span>Next JSn</span>
                            <RiNextjsLine className='text-xl' />
                        </div>

                        <div className='flex items-center gap-2 bg-foreground-light py-3 px-3 rounded-xl'>
                            <span>Tailwind CSS</span>
                            <RiTailwindCssLine className='text-xl' />
                        </div>
                    </div>
                </motion.div>
            </div>

        </section>
    )
}
