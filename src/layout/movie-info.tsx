import { StarsRating } from '@/components/stars-rating';

type Props = {
    movie: any,
    movieDirector?: any,
}

export function MovieInfo(props: Props) {
    const releaseDate = new Date(props.movie.release_date);

    return (
        <div className={`text-white-75`}>
            <div className='mb-5'>
                <h1 className={`text-2xl lg:text-3xl font-semibold xl:text-4xl text-white`}>{props.movie.title} <span className='font-light'>({releaseDate.getFullYear()})</span></h1>

                <span className='block mb-2'>( {props.movie.original_title} - {props.movie.original_language})</span>

                <div className='flex items-center gap-2 text-sm flex-wrap'>
                    <span>{props.movie.release_date}</span>

                    <span className={`block w-1 h-1 mx-1.5 bg-white-75 rounded-full`}></span>

                    {props.movie.genres.length > 0 && (
                        <ul className='flex gap-2'>
                            {props.movie.genres.map((genre: any, index: number) => (
                                <li key={genre.id}>{genre.name}{index + 1 < props.movie.genres.length ? ', ' : ''}</li>
                            ))}
                        </ul>
                    )}
                    <span className={`block w-1 h-1 mx-1.5 bg-white-75 rounded-full`}></span>

                    <span>{props.movie.runtime} min</span>
                </div>
            </div>

            <div>
                <p className={`text-base lg:text-lg text-white italic`}>{props.movie.tagline}</p>
            </div>

            <div className={`my-5 flex items-center gap-2 text-sm font-medium text-white`}>
                <div className='flex items-center h-9 px-3 rounded-full gap-2 bg-semi-transparent'>
                    <StarsRating ratingValue={props.movie.vote_average / 10 * 5} color={'white'} />

                    <span>{(props.movie.vote_average / 10 * 5).toFixed(2)}</span>
                </div>

                <div className='flex items-center h-9 px-3 rounded-full gap-2 bg-semi-transparent '>
                    <span>{props.movie.vote_count} votes</span>
                </div>
            </div>

            <div>
                <span className={`text-white font-medium text-lg`}>Overview</span>
                <p className='text-sm'>{props.movie.overview}</p>
            </div>

            {props.movieDirector && (
                <div className='mt-5'>
                    <span className={`block text-white font-medium text-lg`}>{props.movieDirector.name}</span>
                    <span className='block text-sm'>{props.movieDirector.job}</span>
                </div>
            )}
        </div>
    )
}
