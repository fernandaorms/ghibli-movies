'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';

import { Loading } from '@/components/loading';
import { Header } from '@/layout/header';
import { getBackdrop, getMovieByID, getMovieImages, getPoster } from '@/lib/tmdb';

const COMPANY_ID = process.env.NEXT_PUBLIC_COMPANY_ID;

export default function Page() {
    const { id } = useParams();

    const [movie, setMovie] = useState<any>(null);
    const [movieImages, setMovieImages] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getMovieByID(id)
            .then((data) => {
                setMovie(data);

                const found = data.production_companies?.some((company: any) => company.id.toString() === COMPANY_ID);
                setAuthorized(found);

                getMovieImages(id)
                    .then((data) => setMovieImages(data))
                    .catch(() => setMovieImages(null))

                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load movie.');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <Loading />;
    if (error || !movie || !authorized) return notFound();

    return (
        <div>
            <Header />

            <main>
                <section
                    id='hero'
                    className='relative pt-32 min-h-[75vh] lg:min-h-[75vh]'>
                    <div className='background-image bg-fixed' style={{ backgroundImage: `url(${getBackdrop(movie.backdrop_path)})` }}></div>

                    {/* <div className='relative wrapper h-full text-center flex items-center justify-center'>
                        <h1 className='text-2xl xl:text-4xl uppercase font-bold text-white pb-10'>{movie.title}</h1>
                    </div> */}
                    <div className='relative wrapper grid grid-cols-[1fr] lg:grid-cols-[auto_1fr]'>
                        <div className='hidden lg:block'>
                            <Image
                                className='dark:invert rounded-lg'
                                src={`${getPoster(movie.poster_path)}`}
                                alt='Next.js logo'
                                width={320}
                                height={38}
                                priority
                            />
                        </div>

                        <div>
                            <h1 className='text-2xl lg:text-3xl font-semibold xl:text-4xl text-white pb-10'>{movie.title} ({movie.release_date})</h1>
                        </div>
                    </div>
                </section>

                <div className='wrapper'>
                    <h1>Single Movie: {id}</h1>

                    {movieImages && (
                        <div>

                        </div>
                    )}
                    <pre className='overflow-x-hidden'>
                        {
                            JSON.stringify(movieImages, null, 2)
                        }
                    </pre>
                </div>
            </main>
        </div>
    )
}