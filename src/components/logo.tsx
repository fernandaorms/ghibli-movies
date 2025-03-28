import Link from 'next/link';

export function Logo() {
    return (
        <div>
            <Link
                href={'/'}
                className='text-2xl font-bold uppercase'
            >
                Ghibli
                <span className='font-light'> Movies</span>
            </Link>
        </div>
    )
}
