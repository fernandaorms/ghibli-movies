import { getBackdropImage } from '@/lib/tmdb'
import { motion } from 'motion/react'
import Link from 'next/link'
import { FaAnglesRight } from 'react-icons/fa6'

type Props = {
    movieID: string,
    castArray: any[],
}

export function CastScroll(props: Props) {
    return (
        <div className='cast'>
            <div className='flex items-baseline gap-2 justify-between md:block'>
                <h2 className='font-medium text-xl md:text-2xl'>Cast</h2>

                <Link
                    className='hover:text-primary transition-colors animated-link uppercase font-medium text-[14px]'
                    href={`/movies/${props.movieID}/credits`}
                >
                    <span>See all</span>
                    <FaAnglesRight className='transition-transform' />
                </Link>
            </div>

            <ol className='flex overflow-x-scroll py-5'>
                {props.castArray.map((cast: any, index: number) => (
                    <li
                        key={cast.id}
                        className='block !w-36 shrink-0'
                    >
                        <motion.div
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.25 }}
                            style={{ backgroundImage: `url(${getBackdropImage(cast.profile_path)})` }}
                            className='relative bg-foreground-light h-24 w-24 rounded-full flex items-center justify-center bg-center bg-cover mx-auto z-50'
                        >
                            <div className='absolute top-0 left 0 h-full w-full opacity-0 md:opacity-35 bg-black hover:opacity-0 rounded-full transition-opacity'></div>
                        </motion.div>

                        <div className='text-center'>
                            <span className='block font-semibold mt-3'>{cast.name}</span>
                            <span className='block text-xs font-light mb-1'>({cast.original_name})</span>
                            <span className='block text-sm'>{cast.character}</span>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    )
}
