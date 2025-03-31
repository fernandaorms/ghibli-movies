import { getBackdropImage } from '@/lib/tmdb';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

type Props = {
    movieImages: any,
}

export function MovieMedia(props: Props) {
    const backdrops = props.movieImages.backdrops ?? null;
    const posters = props.movieImages.posters ?? null;

    const gallery = [
        { id: 0, label: 'Backdrops', images: backdrops },
        { id: 1, label: 'Posters', images: posters }
    ];

    const [selectedTab, setSelectedTab] = useState(gallery[0]);

    return (
        <section className='gallery'>
            <div className='wrapper'>
                <nav className='flex gap-10 md:gap-16 items-baseline pb-2'>
                    <h2 className='font-medium text-xl md:text-2xl'>Media</h2>

                    <ul className='flex gap-6 relative'>
                        {gallery.map((item) => (
                            <motion.li
                                key={item.id}
                                initial={false}
                                whileHover={{
                                    color: item.id === selectedTab.id ? 'var(--foreground)' : 'var(--primary)',
                                    cursor: item.id === selectedTab.id ? 'default' : 'pointer'
                                }}
                                className='relative block cursor-pointer transition-colors h-fit'
                                onClick={() => setSelectedTab(item)}
                            >
                                <span className='font-medium'>{item.label} </span>
                                <span className='text-content text-sm'>({item.images.length})</span>

                                {item.id === selectedTab.id && (
                                    <motion.div
                                        layoutId='underline'
                                        className='absolute left-0  -bottom-1 h-[2px] rounded-full bg-primary w-full'
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </motion.li>
                        ))}
                    </ul>
                </nav>

                <div className='overflow-hidden relative w-full'>
                    <div className='absolute top-0 left-0 h-full w-10 bg-linear-to-r from-background to-transparent z-10'></div>
                    <div className='absolute top-0 right-0 h-full w-10 bg-linear-to-l from-background to-transparent z-10'></div>

                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={selectedTab.id}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 10, opacity: 1 }}
                            exit={{ x: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >

                            <ol className='flex py-5 gap-2 overflow-x-scroll'>
                                {selectedTab.images.map((image: any, index: number) => (
                                    <li key={index} className='block shrink-0'>
                                        <motion.div
                                            initial={{ scale: 1 }}
                                            whileHover={{ scale: 1.15, zIndex: 15 }}
                                            style={{
                                                backgroundImage: `url(${getBackdropImage(image.file_path)})`,
                                                width: selectedTab.id === 0 ? 375 : 175,
                                                height: selectedTab.id === 0 ? 200 : 250,
                                            }}
                                            className='relative shrink-0 bg-foreground-light rounded-xl bg-center bg-cover mx-auto z-10'
                                        >
                                            <div className='absolute top-0 left 0 h-full w-full opacity-0 md:opacity-35 bg-black hover:opacity-0 rounded-xl transition-opacity'></div>
                                        </motion.div>
                                    </li>
                                ))}
                            </ol>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
