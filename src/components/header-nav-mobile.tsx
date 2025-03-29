import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';

type Props = {
    pathname: string,
    isMenuOpen: boolean,
    onClick: () => void,
}

export function HeaderNavMobile(props: Props) {
    return (
        <AnimatePresence initial={false}>
            {props.isMenuOpen ? (
                <motion.div
                    className='xl:hidden bg-primary-sm text-white fixed z-0 right-0 top-0 w-full max-w-[576px]'
                    initial={{ opacity: 0, x: 50, paddingTop: 'calc(80px + 4rem)' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                >
                    <nav className='h-screen flex flex-col gap-8 px-12 text-2xl uppercase'>
                        <Link href={'/'}>Home</Link>
                        <Link href={'/movies'}>Movies</Link>

                        {props.pathname === '/' && (
                            <>
                                <Link href={'#about'} onClick={props.onClick}>About</Link>
                                <Link href={'#start'} onClick={props.onClick}>Start</Link>
                                <Link href={'#tech'} onClick={props.onClick}>Tech</Link>
                            </>
                        )}
                    </nav>
                </motion.div>
            ) : null}
        </AnimatePresence>
    )
}
