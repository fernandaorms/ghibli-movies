import Link from 'next/link';

export function Logo() {
    return (
        <div>
            <Link
                href={'/'}
                className='uppercase flex flex-col-reverse xl:block'
            >
                <span className='font-bold text-2xl'>Ghibli</span>
                <span className='font-light text-md -mb-2.5 xl:text-2xl xl:mt-0'> Movies</span>
            </Link>
        </div>
    )
}
