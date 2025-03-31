'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';

import { Loading } from '@/components/loading';
import { Header } from '@/layout/header';
import { MovieInfo } from '@/layout/movie-info';
import { MovieMedia } from '@/layout/movie-media';
import { MovieCredits } from '@/layout/movie-credits';
import { getBackdropImage, getMovieByID, getMovieCredits, getMovieImages, getPosterImage } from '@/lib/tmdb';

const COMPANY_ID = process.env.NEXT_PUBLIC_COMPANY_ID;

export default function Page() {
    const { id } = useParams();

    const [movie, setMovie] = useState<any>(null);
    const [movieImages, setMovieImages] = useState<any>(null);
    const [movieCredits, setMovieCredits] = useState<any>(null);
    const [movieDirector, setMovieDirector] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getMovieByID(id)
            .then((data) => {
                const found = data.production_companies?.some((company: any) => company.id.toString() === COMPANY_ID);
                setAuthorized(found);

                setMovie(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load movie.');
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        getMovieImages(id)
            .then((data) => setMovieImages(data))
            .catch(() => setMovieImages(null));

        getMovieCredits(id)
            .then((data) => setMovieCredits(data))
            .catch(() => setMovieCredits(null));
    }, [movie])

    useEffect(() => {
        if (!movieCredits || !movieCredits.crew) return;

        const director = movieCredits.crew.find((crew: any) => crew.job === 'Director');
        if (director) setMovieDirector(director);

    }, [movieCredits])

    if (loading) return <Loading />;
    if (error || !movie || !authorized) return notFound();

    return (
        <div>
            <Header />

            <main>
                <section className='hero relative pt-32 min-h-[75vh] lg:min-h-[75vh]'>
                    <div className='background-image backdrop' style={{ backgroundImage: `url(${getBackdropImage(movie.backdrop_path)})` }}></div>

                    <div className='relative wrapper grid grid-cols-[1fr] lg:grid-cols-[auto_1fr] gap-12 pt-8 pb-16'>
                        <div className='hidden lg:block'>
                            <Image
                                className='rounded-xl'
                                src={`${getPosterImage(movie.poster_path)}`}
                                alt='Movie Poster'
                                width={300}
                                height={38}
                                priority
                            />
                        </div>

                        <div className='max-w-[575px]'>
                            <MovieInfo movie={movie} movieDirector={movieDirector} />
                        </div>
                    </div>
                </section>

                <div className='flex flex-col gap-10 md:gap-16 pt-10 md:pt-16 pb-20'>
                    {movieImages && (
                        <MovieMedia movieImages={movieImages} />
                    )}

                    {(movieImages && movieCredits) && (
                        <div className='wrapper'><div className='h-0.5 w-full bg-foreground-light rounded-full'></div></div>
                    )}
                    {movieCredits && (
                        <MovieCredits movieCredits={movieCredits} />
                    )}
                </div>

                <div className='wrapper'>
                    {movieImages && (
                        <pre className='overflow-x-hidden'>
                            {
                                // JSON.stringify(movieImages, null, 2)
                            }
                        </pre>
                    )}
                </div>
            </main>
        </div>
    )
}