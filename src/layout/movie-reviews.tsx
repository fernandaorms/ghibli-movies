import { StarsRating } from '@/components/stars-rating';
import { getProfileImage } from '@/lib/tmdb';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { FaAnglesRight, FaXmark } from 'react-icons/fa6';

type Props = {
    reviews: any[],
}

export function MovieReviews({ reviews }: Props) {
    const [reviewIndex, setReviewIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenReview = (index: number) => {
        setReviewIndex(index);
        setIsOpen(true);
    }

    return (
        <section className='reviews'>
            <div className='wrapper'>
                <nav className='flex gap-10 md:gap-16 items-baseline pb-2'>
                    <h2 className='font-medium text-xl md:text-2xl'>
                        Reviews
                        <span className='text-content text-sm'> ({reviews.length})</span>
                    </h2>
                </nav>

                <div className='overflow-hidden relative w-full'>
                    <div className='absolute top-0 left-0 h-full w-10 bg-linear-to-r from-background to-transparent z-10'></div>
                    <div className='absolute top-0 right-0 h-full w-10 bg-linear-to-l from-background to-transparent z-10'></div>

                    <AnimatePresence mode='wait'>
                        <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 10, opacity: 1 }}
                            exit={{ x: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ReviewsList
                                reviews={reviews}
                                onClick={handleOpenReview}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {isOpen ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className='fixed top-0 left-0 h-screen w-screen bg-dark py-15 xl:py-20 overflow-hidden'
                            style={{ zIndex: 100 }}
                        >
                            <SingleReview
                                review={reviews[reviewIndex]}
                                setIsOpen={setIsOpen}
                            />
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
        </section>
    )
}

const ReviewsList = ({
    reviews,
    onClick,
}: {
    reviews: any[],
    onClick: (index: number) => void,
}) => {
    return (
        <ul className='overflow-x-scroll flex gap-2 md:gap-5 py-4 pr-5'>
            {reviews.map((review: any, index: number) => (
                <li
                    key={index}
                    className='shrink-0 h-[232px] max-w-[97%] md:max-w-[50%] bg-background border-2 border-border rounded-xl px-5 py-5 flex flex-col'
                >
                    <div className='h-7 flex items-center justify-between gap-5 xl:gap-50'>
                        <div>
                            {review.author_details?.rating && (
                                <div className='flex items-center h-7 w-fit px-3 rounded-full gap-2 bg-foreground-light text-sm font-medium'>
                                    <StarsRating ratingValue={review.author_details.rating / 10 * 5} color={'primary'} />

                                    <span>{(review.author_details.rating / 10 * 5).toFixed(1)}</span>
                                </div>
                            )}
                        </div>

                        <button
                            className='max-sm:text-primary hover:text-primary transition-colors animated-link uppercase font-medium text-sm cursor-pointer'
                            onClick={() => onClick(index)}
                        >
                            <span>Read All</span>

                            <FaAnglesRight className='transition-transform' />
                        </button>
                    </div>

                    <div className='line-clamp-3 text-content my-4'>
                        {review.content && (
                            <p>{review.content}</p>
                        )}
                    </div>

                    <div className='grid grid-cols-[auto_1fr] gap-2 mt-auto'>
                        <div
                            className='h-12 w-12 bg-foreground-light rounded-full border-2 border-border'
                            style={{
                                backgroundImage: review.author_details.avatar_path ? `url(${getProfileImage(review.author_details.avatar_path)})` : '',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover'
                            }}
                        />

                        <div className=''>
                            <span className='block font-medium'>{review.author}</span>
                            <span className='block text-sm text-content'>{new Date(review.updated_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

const SingleReview = ({
    review,
    setIsOpen
}: {
    review: any,
    setIsOpen: (status: boolean) => void,
}) => {
    return (
        <div className='wrapper h-full w-full flex items-center justify-center'>
            <div className='w-full max-w-[575px] h-full grid grid-col-[60px_1fr]'>
                <motion.div
                    className='bg-dark-md h-10 w-10 flex items-center justify-center rounded-full cursor-pointer z-10 ml-auto mb-5 mt-auto'
                    whileHover={{ scale: 1.125 }}
                    onClick={() => setIsOpen(false)}
                >
                    <FaXmark />
                </motion.div>

                <div className='h-fit max-h-full min-h-[275px] w-full bg-background border-2 border-border rounded-xl px-5 py-5 grid grid-rows-[28px_1fr_48px]'>
                    <div className='h-7 flex items-center justify-between gap-5 xl:gap-50'>
                        <div>
                            {review.author_details?.rating && (
                                <div className='flex items-center h-7 w-fit px-3 rounded-full gap-2 bg-foreground-light text-sm font-medium'>
                                    <StarsRating ratingValue={review.author_details.rating / 10 * 5} color={'primary'} />

                                    <span>{(review.author_details.rating / 10 * 5).toFixed(1)}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='text-content my-5 overflow-scroll'>
                        {review.content && (
                            <p>{review.content}</p>
                        )}
                    </div>

                    <div className='grid grid-cols-[auto_1fr] gap-2 mt-auto'>
                        <div
                            className='h-12 w-12 bg-foreground-light rounded-full border-2 border-border'
                            style={{
                                backgroundImage: review.author_details.avatar_path ? `url(${getProfileImage(review.author_details.avatar_path)})` : '',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover'
                            }}
                        />

                        <div className=''>
                            <span className='block font-medium'>{review.author}</span>
                            <span className='block text-sm text-content'>{new Date(review.updated_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}