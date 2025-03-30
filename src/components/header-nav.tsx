import Link from 'next/link';

type Props = {
    pathname: string
}

export function HeaderNav(props: Props) {
    return (
        <nav className='hidden xl:flex gap-8 text-sm font-semibold uppercase'>
            <Link href={'/'} className='menu-item'>Home</Link>
            <Link href={'/movies'} className='menu-item'>Movies</Link>

            {props.pathname === '/' && (
                <>
                    <Link href={'#about'} className='menu-item'>About</Link>
                    <Link href={'#start'} className='menu-item'>Start</Link>
                    <Link href={'#tech'} className='menu-item'>Tech</Link>
                </>
            )}
        </nav>
    )
}
