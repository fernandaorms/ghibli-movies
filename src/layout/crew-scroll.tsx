import { getBackdropImage } from '@/lib/tmdb'
import { motion } from 'motion/react'
import Link from 'next/link'
import { FaAnglesRight } from 'react-icons/fa6'

type Props = {
    movieID: string,
    crewArray: any[],
}

export function CrewScroll(props: Props) {
    return (
        <div className='crew'>
            <div className='flex items-baseline gap-2 justify-between md:flex-col md:block mb-5'>
                <h2 className='font-medium text-xl md:text-2xl'>Crew</h2>

                {/* <Link
                    className='hover:text-primary transition-colors animated-link uppercase font-medium text-[14px]'
                    href={`/movies/${props.movieID}/credits`}
                >
                    <span>See all</span>
                    <FaAnglesRight className='transition-transform' />
                </Link> */}
            </div>

            <div className='overflow-clip relative'>
                <div className='absolute top-0 left-0 h-full w-10 bg-linear-to-r from-background to-transparent z-10'></div>
                <div className='absolute top-0 right-0 h-full w-10 bg-linear-to-l from-background to-transparent z-10'></div>

                <motion.ol
                    className='flex py-4'
                    drag='x'
                    dragConstraints={{ left: -250, right: 20 }}
                    whileTap={{ cursor: 'grabbing' }}
                >
                    {props.crewArray.map((crew: any) => (
                        <li key={crew.id} className='block !w-36 shrink-0'>
                            <motion.div
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.25 }}
                                style={{ backgroundImage: `url(${getBackdropImage(crew.profile_path)})` }}
                                className='relative bg-foreground-light h-24 w-24 rounded-full flex items-center justify-center bg-center bg-cover mx-auto z-10'
                            >
                                <div className='absolute top-0 left 0 h-full w-full opacity-0 md:opacity-35 bg-black hover:opacity-0 rounded-full transition-opacity'></div>
                            </motion.div>

                            <div className='text-center'>
                                <span className='block font-semibold mt-3'>{crew.name}</span>
                                <span className='block text-xs font-light mb-1 text-content'>({crew.original_name})</span>
                                <span className='block text-sm text-content'>{crew.job}</span>
                            </div>
                        </li>
                    ))}
                </motion.ol>
            </div>
        </div>
    )
}
