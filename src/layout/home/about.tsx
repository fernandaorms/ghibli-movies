'use client';

import { motion, useAnimation, useInView } from 'motion/react';
import { useEffect, useRef } from 'react';

export function About() {
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
            id='about'
            className='h-fit min-h-[50vh] max-h-[720px] py-12 lg:py-20 xl:py-28'
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
                        <h2 className='text-2xl lg:text-3xl xl:text-4xl font-semibold mb-2 lg:mb-4 xl:mb-6'>About The Project</h2>

                        <p className='text-content'>This project is a Studio Ghibli catalog where you can search for movies and learn more about them, including ratings, overviews, galleries and users reviews.</p>
                    </div>

                    <div>

                    </div>
                </motion.div>
            </div>

        </section>
    )
}