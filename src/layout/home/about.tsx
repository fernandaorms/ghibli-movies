'use client';

import { AnimationControls, motion, useAnimation, useInView } from 'motion/react';
import { useEffect, useRef } from 'react';

export function About() {
    const ref = useRef<HTMLDivElement | null>(null);
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
            className='min-h-[70vh] py-12 lg:py-20 xl:py-28 flex items-center justify-center'
        >
            <div className='wrapper mb-6'>
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

                    <div className='flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-8 lg:gap-10 mt-6 xl:mt-10 '>
                        <SingleStep
                            number={1}
                            title={'Search for a movie'}
                            content={'Type the name of a Studio Ghibli movie in the search bar to find what you\'re looking for.'}
                            delay={0.5}
                            mainControls={mainControls}
                        />

                        <SingleStep
                            number={2}
                            title={'Click on Search'}
                            content={'Hit the "Search" button to see all the results found!'}
                            delay={1}
                            mainControls={mainControls}
                        />

                        <SingleStep
                            number={3}
                            title={'Have fun'}
                            content={'Enjoy browsing the full catalog and discovering more about these amazing movies!'}
                            delay={1.5}
                            mainControls={mainControls}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

const SingleStep = ({
    number,
    title,
    content,
    delay,
    mainControls,
}: {
    number: number
    title: string,
    content: string,
    delay: number
    mainControls: AnimationControls,
}) => {
    return (
        <motion.div
            className='w-60 text-center'
            variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 },
            }}
            initial='hidden'
            animate={mainControls}
            transition={{ duration: 0.5, delay: delay }}
        >
            <div className='h-16 lg:h-20 w-16 lg:w-20 flex items-center justify-center bg-primary-md rounded-full mx-auto border-4 border-white-20'>
                <span className='font-semibold text-2xl lg:text-3xl text-white'>{number}</span>
            </div>

            <div className='mt-4'>
                <span className='block mb-2 uppercase font-bold'>{title}</span>
                <p className='block flex-1 text-sm text-content'>{content}</p>
            </div>
        </motion.div>
    )
}
