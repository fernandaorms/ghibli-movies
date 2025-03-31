import Image from 'next/image';

export function Banner() {
    return (
        <section className='banner bg-primary w-full h-[30vh] min-h-[200px] py-15'>
            <div className='h-full flex justify-center'>
                <Image
                    src='/studio-ghibli-logo.svg'
                    alt='Studio Ghibli logo'
                    height={20}
                    width={80}
                    className='h-full w-auto'
                />
            </div>
        </section>
    )
}
