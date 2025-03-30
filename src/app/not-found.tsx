import Link from 'next/link';

import { Header } from '@/layout/header';

export default function NotFound() {
    return (
        <div>
            <Header />

            <main>
                <section
                    id='hero'
                    className='relative pt-32 h-[40vh] xl:h-[50vh]'>
                    <div className='lg:block hidden background-image bg-fixed' style={{ backgroundImage: 'url(/hero-bg-lg.webp)' }}></div>
                    <div className='hidden max-lg:block  background-image bg-fixed' style={{ backgroundImage: 'url(/hero-bg-md.webp)' }}></div>

                    <div className='relative wrapper h-full text-center flex items-center justify-center'>
                        <h1 className='text-2xl xl:text-4xl uppercase font-bold text-white pb-10'>404</h1>
                    </div>
                </section>

                <section>
                    <div className='wrapper py-16'>
                        <div className='w-fit mx-auto text-foreground'>
                            <div className='text-center mb-5'>
                                <p className='text-2xl font-medium'>Oops! Page not found.</p>

                                <p className='text-lg'>
                                    The page you're looking for doesn't exist or may have been moved. {' '}
                                </p>
                            </div>

                            <div className='mt-10 flex items-center justify-center gap-4'>
                                <Link
                                    href={'/movies'}
                                    className='flex h-[48px] items-center bg-primary hover:bg-primary-md transition-colors text-white px-5 rounded-full cursor-pointer'
                                >
                                    Movies
                                </Link>

                                <Link
                                    href={'/movies'}
                                    className='flex h-[48px] items-center bg-transparent text-primary-md hover:text-primary border-2 border-primary-md hover:border-primary transition-colors px-5 rounded-full cursor-pointer'
                                >
                                    Homepage
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
