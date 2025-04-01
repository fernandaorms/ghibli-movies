'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';
import Link from 'next/link';

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

export function Start() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true })

    const mainControls = useAnimation();

    useEffect(() => {
        if (inView) {
            mainControls.start('visible');
        }
    }, [inView])

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const refImage = useRef<HTMLDivElement | null>(null);
    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!refImage.current) return;

        const rect = refImage.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section
            id='start'
            className='h-fit min-h-[50vh] max-h-[720px] py-12 lg:py-20 xl:py-28 bg-primary-md text-white-75'
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
                    className='grid lg:grid-cols-2 gap-6 lg:gap-16 items-center'
                >
                    <div className='max-lg:mx-auto lg:ml-auto text-center lg:text-left lg:max-w-[575px]'>
                        <h2 className='text-2xl lg:text-3xl xl:text-4xl font-semibold mb-2 lg:mb-4 xl:mb-6 text-white'>How it Started</h2>

                        <div className='text-white-75'>
                            <p>
                                In 2021, I began my journey in web development by creating {' '}
                                <Link
                                    href='https://fernandaorms.github.io/netflix-clone/home.html'
                                    target='_blank'
                                    className='font-medium underline hover:text-white transition-colors'
                                >
                                    Ghibli Flix
                                </Link>
                                , a Studio Ghibli movie catalog. The goal was to replicate two Netflix pages using only HTML, CSS, and JavaScript.
                            </p>
                            <p className='mt-6'>At that stage, the site was purely visual, displaying a static, limited catalog with data from localhost and no interactive features.</p>
                        </div>
                    </div>

                    <motion.div
                        ref={refImage}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className='w-full max-w-[575px] max-lg:mx-auto lg:mr-auto bg-white-20 p-3 lg:p-4 rounded-xl shadow-lg'
                        style={{
                            transformStyle: 'preserve-3d',
                            transform,
                        }}
                    >
                        <div
                            className='w-full aspect-16/9 bg-center bg-cover rounded-xl shadow-lg'
                            style={{
                                backgroundImage: 'url(/ghibliflix.webp)',
                                transform: 'translateZ(75px)',
                                transformStyle: 'preserve-3d',
                            }}
                        />

                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
