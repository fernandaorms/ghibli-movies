'use client';

import { motion, useAnimation, useInView } from 'motion/react';
import { useEffect, useRef } from 'react';

export function Start() {
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
                >
                    <div>
                        <h2 className='text-2xl lg:text-3xl xl:text-4xl font-semibold mb-2 lg:mb-4 xl:mb-6 text-white'>How it Started</h2>

                        <p>In 2021, I began my journey in web development by creating Ghibli Flix, a Studio Ghibli movie catalog. The goal was to replicate two Netflix pages using only HTML, CSS, and JavaScript.</p>
                        <p>At that stage, the site was purely visual, displaying a static, limited catalog with data from localhost and no interactive features.</p>
                    </div>

                    <div>

                    </div>
                </motion.div>
            </div>

        </section>
    )
}