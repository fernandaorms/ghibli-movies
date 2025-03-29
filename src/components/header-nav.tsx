import Link from 'next/link';

type Props = {
    pathname: string
}

export function HeaderNav(props: Props) {
    return (
        <nav className='hidden xl:flex gap-8 text-sm font-semibold uppercase'>
            <Link href={'/'}>Home</Link>
            <Link href={'/movies'}>Movies</Link>

            {props.pathname === '/' && (
                <>
                    <Link href={'#about'}>About</Link>
                    <Link href={'#start'}>Start</Link>
                    <Link href={'#tech'}>Tech</Link>
                </>
            )}
        </nav>
    )
}
