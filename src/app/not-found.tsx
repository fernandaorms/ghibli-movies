import Link from 'next/link';

import { Header } from '@/layout/header';

export default function NotFound() {
    return (
        <div>
            <Header />

            <main>
                <section
                    id='hero'
                    className='relative pt-32 h-[100vh]'>
                    <div className='lg:block hidden background-image dark-filter' style={{ backgroundImage: 'url(/hero-bg-lg.webp)' }}></div>
                    <div className='hidden max-lg:block  background-image dark-filter' style={{ backgroundImage: 'url(/hero-bg-md.webp)' }}></div>

                    <div className='relative wrapper h-full text-center flex items-center justify-center'>
                        <div className='w-full bg-amber grid gap-2'>
                            <h2 className='text-2xl xl:text-4xl uppercase font-bold text-white'>Not Found</h2>
                            <p>Could not find requested resource</p>
                            <Link href='/' className='block mt-5'>Return Home</Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
