import { getBackdropImage, getPosterImage } from '@/lib/tmdb';
import { motion } from 'motion/react';
import { FaXmark } from 'react-icons/fa6';

type Props = {
    selectedTab: any,
    galleryIndex: number,
    setIsOpen: (status: boolean) => void,
    setGalleryIndex: (index: number) => void,
}

export function Gallery({ selectedTab, galleryIndex, setIsOpen, setGalleryIndex }: Props) {
    return (
        <motion.div
            key={selectedTab.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed top-0 left-0 h-screen w-screen bg-background opacity-90 text-white'
            style={{zIndex: 100}}
        >
            <div className='wrapper h-full flex flex-col justify-between py-4 xl:py-12 gap-2'>
                <Top
                    selectedTab={selectedTab}
                    setIsOpen={setIsOpen}
                />

                <FeaturedImage
                    selectedTab={selectedTab}
                    galleryIndex={galleryIndex}
                />

                <div className='overflow-clip relative w-full '>
                    <div className='absolute top-0 left-0 h-full w-10 bg-linear-to-r from-background to-transparent z-20'></div>
                    <div className='absolute top-0 right-0 h-full w-10 bg-linear-to-l from-background to-transparent z-20'></div>

                    <ImagesList
                        selectedTab={selectedTab}
                        galleryIndex={galleryIndex}
                        setGalleryIndex={setGalleryIndex}
                    />
                </div>
            </div>
        </motion.div>
    )
}

const Top = ({
    selectedTab, setIsOpen
}: {
    selectedTab: any, setIsOpen: (status: boolean) => void
}) => {
    return (
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
    )
}

const FeaturedImage = ({
    selectedTab,
    galleryIndex,
}: {
    selectedTab: any,
    galleryIndex: number,
}) => {
    return (
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
    )
}

const ImagesList = ({
    selectedTab,
    galleryIndex,
    setGalleryIndex,
}: {
    selectedTab: any,
    galleryIndex: number
    setGalleryIndex: (index: number) => void,
}) => {
    return (
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
                            />
                        </motion.div>
                    </div>
                </li>
            ))}
        </ol>
    )
}
