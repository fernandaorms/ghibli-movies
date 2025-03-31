import { FaArrowDown } from 'react-icons/fa6';

export function Hero() {
    return (
        <section
            id='hero'
            className='relative pt-32 h-[100vh]'
        >
            <div className='lg:block hidden background-image' style={{ backgroundImage: 'url(/hero-bg-lg.webp)' }}></div>
            <div className='hidden max-lg:block  background-image' style={{ backgroundImage: 'url(/hero-bg-md.webp)' }}></div>

            <div className='relative wrapper flex items-center justify-center h-full'>
                <h1 className='xl:text-7xl text-white'>Hero title bla bla bla</h1>
            </div>

            <div>
                <FaArrowDown />
            </div>
        </section>
    )
}