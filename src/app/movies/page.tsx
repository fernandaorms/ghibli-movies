'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useSearchParams } from 'next/navigation';

import { Loading } from '@/components/loading';
import { Header } from '@/layout/header';
import { getAllMovies, getBackdrop, getPoster } from '@/lib/tmdb';

export default function Movies() {
    const searchParams = useSearchParams();
    const search = searchParams.get('search') || null;

    const [newMovies, setNewMovies] = useState<any>(null);
    const [movies, setMovies] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

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

    // useEffect(() => {
    //     console.log(movies.lenght);
    // }, [search, movies])

    if (loading) return <Loading />;
    // if (error) return notFound();

    return (
        <div>
            <Header />

            <main>
                <section
                    id='hero'
                    className='relative pt-32 h-[40vh] xl:h-[50vh]'>
                    <div className='lg:block hidden background-image bg-fixed' style={{ backgroundImage: 'url(/hero-bg-lg.webp)' }}></div>
                    <div className='hidden max-lg:block  background-image bg-fixed' style={{ backgroundImage: 'url(/hero-bg-md.webp)' }}></div>

                    <div className='relative wrapper h-full text-center flex items-center justify-center'>
                        <h1 className='text-2xl xl:text-4xl uppercase font-bold text-white pb-10'>Movies Catalog</h1>
                    </div>
                </section>
            </main>

            <div className='wrapper'>
                {search && (
                    <p>{movies.length} Results for: "{search}"</p>
                )}

                {(movies.length > 0) && !error ? (
                    <>
                        <div className='grid md:grid-cols-3 lg:grid-cols-3 gap-4'>
                            {movies.map((movie: any) => (
                                <div key={movie.id} className='p-4 border rounded-lg'>
                                    <div className='backdrop'>
                                        <p>Backdrop</p>
                                        <Image
                                            className='dark:invert'
                                            src={`${getBackdrop(movie.backdrop_path)}`}
                                            alt='Next.js logo'
                                            width={180}
                                            height={38}
                                            priority
                                        />
                                    </div>

                                    <div className='poster'>
                                        <p>Poster</p>
                                        <Image
                                            className='dark:invert'
                                            src={`${getPoster(movie.poster_path)}`}
                                            alt='Next.js logo'
                                            width={180}
                                            height={38}
                                            priority
                                        />
                                    </div>

                                    <div className='info'>
                                        <p>Original Language: {movie.original_language}</p>
                                        <p>Original Title: {movie.original_title}</p>
                                        <p>Popularity: {movie.popularity}</p>
                                        <p>Release Date: {movie.release_date}</p>
                                        <p>Vote Avarage: {movie.vote_average}</p>
                                        <p>Vote Count: {movie.vote_count}</p>
                                    </div>

                                    <Link href={`/movies/${movie.id}`} className='text-lg font-semibold'>{movie.title}</Link>

                                    <p>{movie.overview}</p>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className='text-foreground text-2xl'>
                        <p>Sorry, no movies found :(</p>
                    </div>
                )}
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
