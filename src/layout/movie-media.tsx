import { getBackdropImage, getPosterImage } from '@/lib/tmdb';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import Image from 'next/image';

type Props = {
    movieImages: any,
}

export function MovieMedia(props: Props) {
    const backdrops = props.movieImages.backdrops ?? null;
    const posters = props.movieImages.posters ?? null;

    const media = [
        { id: 0, label: 'Backdrops', images: backdrops },
        { id: 1, label: 'Posters', images: posters }
    ];

    const [selectedTab, setSelectedTab] = useState(media[0]);
    const [isOpen, setIsOpen] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);

    const handleOpen = (index: number) => {
        setIsOpen(true);
        setGalleryIndex(index);
    }

    useEffect(() => {
        console.log(isOpen, galleryIndex);
    }, [isOpen, galleryIndex]);

    return (
        <section className='media'>
            <div className='wrapper'>
                <nav className='flex gap-10 md:gap-16 items-baseline pb-2'>
                    <h2 className='font-medium text-xl md:text-2xl'>Media</h2>

                    <ul className='flex gap-6 relative'>
                        {media.map((item) => (
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
                                    <li
                                        key={index}
                                        className='block shrink-0 cursor-pointer'
                                        onClick={() => handleOpen(index)}
                                    >
                                        <motion.div
                                            initial={{ scale: 1 }}
                                            whileHover={{ scale: 1.15, zIndex: 15 }}
                                            style={{
                                                backgroundImage: `url(${selectedTab.id === 0 ? getBackdropImage(image.file_path) : getPosterImage(image.file_path)})`,
                                                width: selectedTab.id === 0 ? 375 : 175,
                                                aspectRatio: selectedTab.id === 0 ? '16/9' : '2/3',
                                            }}
                                            className='relative bg-foreground-light rounded-xl bg-center bg-cover mx-auto z-10'
                                        >
                                            <div className='absolute top-0 left 0 h-full w-full opacity-0 md:opacity-35 bg-black hover:opacity-0 rounded-xl transition-opacity'></div>
                                        </motion.div>
                                    </li>
                                ))}
                            </ol>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {isOpen ? (
                        <motion.div
                            key={selectedTab.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className='fixed top-0 left-0 h-screen w-screen bg-background opacity-90 text-white z-50'
                        >
                            <div className='wrapper h-full flex flex-col justify-between py-4 xl:py-12 gap-2'
                            >
                                <div className='font-medium text-foreground flex items-center justify-between'>
                                    <div className='uppercase xl:text-xl'>
                                        <span>{selectedTab.label} Gallery</span>
                                    </div>

                                    <motion.div
                                        className='bg-foreground-light h-10 w-10 flex items-center justify-center rounded-full cursor-pointer  z-10'
                                        whileHover={{ scale: 1.125 }}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <FaXmark />
                                    </motion.div>
                                </div>

                                <div
                                    className='flex items-center justify-center'
                                    style={{
                                        flex: 1,
                                    }}>
                                    <motion.div
                                        key={0}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        // exit={{ opacity: 0 }}
                                        style={{
                                            backgroundImage: `url(${selectedTab.id === 0 ? getBackdropImage(selectedTab.images[galleryIndex].file_path) : getPosterImage(selectedTab.images[galleryIndex].file_path)})`,
                                            aspectRatio: selectedTab.id === 0 ? '16/9' : '2/3',
                                            width: selectedTab.id === 0 ? '50%' : 'auto',
                                            height: selectedTab.id === 0 ? 'auto' : '100%',

                                        }}
                                        className={`relative bg-foreground-light rounded-xl bg-center bg-cover z-10 ${selectedTab.id === 0 ? 'max-lg:!w-full max-xl:!w-[75%]' : ''}`}
                                    />
                                </div>


                                <div className='overflow-clip relative w-full '>
                                    <div className='absolute top-0 left-0 h-full w-10 bg-linear-to-r from-background to-transparent z-20'></div>
                                    <div className='absolute top-0 right-0 h-full w-10 bg-linear-to-l from-background to-transparent z-20'></div>

                                    <ol className='flex gap-2 overflow-x-scroll py-4'>
                                        {selectedTab.images.map((image: any, index: number) => (
                                            <li
                                                key={index}
                                                className='block shrink-0'
                                                style={{
                                                    cursor: galleryIndex === index ? 'default' : 'pointer'
                                                }}
                                                onClick={() => setGalleryIndex(index)}
                                            >
                                                <div className='overflow-hidden rounded-xl'>
                                                    <motion.div
                                                        initial={{ scale: 1 }}
                                                        whileHover={{ scale: 1.15, zIndex: 15 }}
                                                        style={{
                                                            backgroundImage: `url(${selectedTab.id === 0 ? getBackdropImage(image.file_path) : getPosterImage(image.file_path)})`,
                                                            width: selectedTab.id === 0 ? 200 : 120,
                                                            aspectRatio: selectedTab.id === 0 ? '16/9' : '2/3',
                                                            border: galleryIndex === index ? '4px solid var(--primary)' : 'none',
                                                        }}
                                                        className='relative bg-foreground-light rounded-xl bg-center bg-cover mx-auto z-10'
                                                    >
                                                        <div
                                                            style={{
                                                                opacity: galleryIndex === index ? '0' : '0.35',
                                                            }}
                                                            className='absolute top-0 left 0 h-full w-full max-md:!opacity-0 bg-black hover:!opacity-0 rounded-xl transition-opacity'
                                                        >

                                                        </div>
                                                    </motion.div>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
        </section>
    )
}
