import { getBackdropImage, getPosterImage } from '@/lib/tmdb';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { FaExpand } from 'react-icons/fa6';
import { Gallery } from '@/components/gallery';

type Props = {
    movieImages: any,
}

type Media = {
    id: number,
    label: string,
    images: any,
}

export function MovieMedia({ movieImages }: Props) {
    const backdrops = movieImages.backdrops ?? null;
    const posters = movieImages.posters ?? null;

    const media: Media[] = [
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

    return (
        <section className='media'>
            <div className='wrapper'>
                <nav className='flex gap-10 md:gap-16 items-baseline pb-2'>
                    <h2 className='font-medium text-xl md:text-2xl'>Media</h2>

                    <NavList
                        media={media}
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
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
                            <ImagesList
                                selectedTab={selectedTab}
                                handleOpen={handleOpen}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {isOpen ? (
                        <Gallery
                            selectedTab={selectedTab}
                            galleryIndex={galleryIndex}
                            setIsOpen={setIsOpen}
                            setGalleryIndex={setGalleryIndex}
                        />
                    ) : null}
                </AnimatePresence>
            </div>
        </section>
    )
}

const NavList = ({
    media,
    selectedTab,
    setSelectedTab,
}: {
    media: Media[],
    selectedTab: any,
    setSelectedTab: (item: any) => void,
}) => {
    return (
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
    )
}

const ImagesList = ({
    selectedTab,
    handleOpen,
}: {
    selectedTab: any,
    handleOpen: (index: number) => void,
}) => {
    return (
        <ol className='flex py-5 gap-3 overflow-x-scroll'>
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

                        <div className='md:hidden bg-background h-10 w-10 flex items-center justify-center rounded-full cursor-pointer absolute z-10 right-2 bottom-2'>
                            <FaExpand />
                        </div>
                    </motion.div>
                </li>
            ))}
        </ol>
    )
}
