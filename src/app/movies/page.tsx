'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { FaAnglesRight, FaArrowUpRightFromSquare } from 'react-icons/fa6';

import { Loading } from '@/components/loading';
import { Header } from '@/layout/header';
import { getAllMovies, getBackdropImage } from '@/lib/tmdb';
import { Banner } from '@/layout/banner';
import { Footer } from '@/layout/footer';

export default function Movies() {
    const searchParams = useSearchParams();
    const search = searchParams.get('search') || null;
    const [movies, setMovies] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [visibleCards, SetVisibleCards] = useState(6);

    useEffect(() => {
        getAllMovies()
            .then((data) => {
                if (search) setMovies(data.results.filter((movie: any) => searchMovies(movie, search.toLowerCase())));
                else setMovies(data.results);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [search]);

    const handleLoadMore = () => {
        SetVisibleCards((prev) => prev + 6);
    }

    if (loading) return <Loading />;

    return (
        <div>
            <Header />

            <main>
                <section
                    id='hero'
                    className='relative pt-32 h-[40vh] xl:h-[50vh]'
                >
                    <div className='lg:block hidden background-image bg-fixed' style={{ backgroundImage: 'url(/hero-bg-cat-lg.webp)' }}></div>
                    <div className='hidden max-lg:block  background-image cat-fixed' style={{ backgroundImage: 'url(/hero-bg-cat-md.webp)' }}></div>

                    <div className='relative wrapper h-full text-center flex items-center justify-center'>
                        <h1 className='text-2xl xl:text-4xl uppercase font-bold text-white pb-10'>Movies Catalog</h1>
                    </div>
                </section>

                <section className='movies'>
                    <div className='wrapper py-16'>
                        {search && (
                            <SearchIntro
                                length={movies.length}
                                search={search}
                            />
                        )}

                        {(movies.length > 0) && !error ? (
                            <div className=''>
                                <div className='grid lg:grid-cols-2 xl:grid-cols-3 gap-x-5 lg:gap-x-6 xl:gap-x-8 gap-y-8 xl:gap-y-10'>
                                    {movies.slice(0, visibleCards).map((movie: any) => (
                                        <AnimatePresence
                                            key={movie.id}
                                        >
                                            <motion.div
                                                key={movie.id}
                                                initial={{ opacity: 0, y: 50 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <MovieCard
                                                    movie={movie}
                                                />
                                            </motion.div>
                                        </AnimatePresence>
                                    ))}
                                </div>

                                {movies.length > visibleCards && (
                                    <div className='mt-10'>
                                        <ShowMore
                                            onClick={handleLoadMore}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <NoResults />
                        )}
                    </div>
                </section>

                <Banner />
            </main>

            <Footer />
        </div>
    )
}

const MovieCard = ({
    movie,
}: {
    movie: any,
}) => {
    return (
        <div>
            <div className='h-48 md:h-56 rounded-xl overflow-hidden cursor-pointer'>
                <motion.div
                    initial={{ scale: 1, opacity: 0.75 }}
                    whileHover={{ scale: 1.5, opacity: 1 }}
                    className='relative background-image-nf h-full w-full rounded-xl max-md:!opacity-100' style={{ backgroundImage: `url(${getBackdropImage(movie.backdrop_path)})` }}
                >
                    <Link
                        href={`/movies/${movie.id}`}
                        className='absolute top-0 left-0 h-full w-full bg-transparent z-50'
                    />

                    <div className='md:hidden bg-background h-10 w-10 flex items-center justify-center rounded-full cursor-pointer absolute z-10 right-2 top-2'>
                        <FaArrowUpRightFromSquare />
                    </div>
                </motion.div>
            </div>

            <div className='grid grid-cols-[auto_1fr_auto] gap-2 items-center'>
                <div className='w-fit my-4'>
                    <Link
                        className='hover:text-primary transition-colors'
                        href={`/movies/${movie.id}`}
                    >
                        <span className='block font-semibold text-xl'>{movie.title}</span>
                        <span className='block text-xs'>{movie.original_title}</span>
                    </Link>
                </div>

                <div className='w-full h-[0.75px] rounded-full bg-border'></div>

                <div className='w-fit'>
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
            </div>

            <div className='h-auto line-clamp-3 text-content mb-2'>
                <p className=''>{movie.overview}</p>
            </div>

            <Link
                className='max-sm:text-primary hover:text-primary transition-colors animated-link uppercase font-medium text-sm'
                href={`/movies/${movie.id}`}
            >
                <span>See more</span>
                <FaAnglesRight className='transition-transform' />
            </Link>
        </div>
    )
}

const SearchIntro = ({
    length,
    search,
}: {
    length: number,
    search: string,
}) => {
    return (
        <div className={`mb-6 ${length === 0 ? 'text-center' : ''}`}>
            <span className='text-lg font-semibold'>{length} Results for: </span>
            <span className='text-lg'>"{search}"</span>
        </div>
    )
}

const ShowMore = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            onClick={onClick}
            className='flex h-[48px] items-center bg-primary hover:bg-primary-md transition-colors text-white px-5 rounded-full cursor-pointer mx-auto'
        >
            Load More
        </button>
    )
}

const NoResults = () => {
    return (
        <div className='w-fit mx-auto text-foreground'>
            <div className='text-center mb-5'>
                <p className='text-2xl font-medium'>Sorry, no movies found!</p>

                <p className='text-lg'>
                    Try searching for something else or explore our {' '}
                    <Link href={'/movies'} className='text-primary hover:underline font-medium'>Movies Catalog</Link>
                </p>
            </div>
        </div>
    )
}

function searchMovies(movie: any, lowerSearch: string) {
    return (
        movie.title.toLowerCase().includes(lowerSearch)
        || movie.original_title.toLowerCase().includes(lowerSearch)
        || movie.overview.toLowerCase().includes(lowerSearch)
    )
}
