'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';

import { Loading } from '@/components/loading';
import { Header } from '@/layout/header';
import { getBackdropImage, getMovieByID, getMovieCredits, getMovieImages, getPosterImage, getProfileImage } from '@/lib/tmdb';
import { StarsRating } from '@/components/stars-rating';
import { motion } from 'motion/react';
import Link from 'next/link';
import { FaAnglesRight } from 'react-icons/fa6';
import { CastScroll } from '@/layout/cast-scroll';
import { CrewScroll } from '@/layout/crew-scroll';
import { div } from 'motion/react-client';
import { MovieInfo } from '@/layout/movie-info';

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
                <section
                    id='hero'
                    className='relative pt-32 min-h-[75vh] lg:min-h-[75vh]'>
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

                {movieCredits && (
                    <section className='credits bg-amber-200'>
                        <div className='wrapper flex flex-col gap-12'>
                            {movieCredits?.cast?.length > 0 && (
                                <CastScroll movieID={movie.id} castArray={movieCredits.cast.slice(0, 12)} />
                            )}
                            {(movieCredits?.cast?.length > 0 && movieCredits?.crew?.length > 0) && (
                                <div className='h-0.5 w-full bg-foreground-light rounded-full'></div>
                            )}
                            {movieCredits?.crew?.length > 0 && (
                                <CrewScroll movieID={movie.id} crewArray={movieCredits.crew.slice(0, 12)} />
                            )}
                        </div>
                    </section>
                )}

                <div className='wrapper'>
                    {movieImages && (
                        <pre className='overflow-x-hidden'>
                            {
                                JSON.stringify(movieImages, null, 2)
                            }
                        </pre>
                    )}
                </div>
            </main>
        </div>
    )
}