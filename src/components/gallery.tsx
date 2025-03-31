import { getBackdropImage, getPosterImage } from '@/lib/tmdb';
import { motion } from 'motion/react';
import { FaXmark } from 'react-icons/fa6';

type Props = {
    selectedTab: any,
    galleryIndex: number,
    setIsOpen: (status: boolean) => void,
    setGalleryIndex: (index: number) => void,
}

export function Gallery(props: Props) {
    return (
        <motion.div
            key={props.selectedTab.id}
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
                        <span>{props.selectedTab.label} Gallery</span>
                    </div>

                    <motion.div
                        className='bg-foreground-light h-10 w-10 flex items-center justify-center rounded-full cursor-pointer  z-10'
                        whileHover={{ scale: 1.125 }}
                        onClick={() => props.setIsOpen(false)}
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
                            backgroundImage: `url(${props.selectedTab.id === 0 ? getBackdropImage(props.selectedTab.images[props.galleryIndex].file_path) : getPosterImage(props.selectedTab.images[props.galleryIndex].file_path)})`,
                            aspectRatio: props.selectedTab.id === 0 ? '16/9' : '2/3',
                            width: props.selectedTab.id === 0 ? '50%' : 'auto',
                            height: props.selectedTab.id === 0 ? 'auto' : '100%',

                        }}
                        className={`relative bg-foreground-light rounded-xl bg-center bg-cover z-10 ${props.selectedTab.id === 0 ? 'max-lg:!w-full max-xl:!w-[75%]' : ''}`}
                    />
                </div>

                <div className='overflow-clip relative w-full '>
                    <div className='absolute top-0 left-0 h-full w-10 bg-linear-to-r from-background to-transparent z-20'></div>
                    <div className='absolute top-0 right-0 h-full w-10 bg-linear-to-l from-background to-transparent z-20'></div>

                    <ol className='flex gap-2 overflow-x-scroll py-4'>
                        {props.selectedTab.images.map((image: any, index: number) => (
                            <li
                                key={index}
                                className='block shrink-0'
                                style={{
                                    cursor: props.galleryIndex === index ? 'default' : 'pointer'
                                }}
                                onClick={() => props.setGalleryIndex(index)}
                            >
                                <div className='overflow-hidden rounded-xl'>
                                    <motion.div
                                        initial={{ scale: 1 }}
                                        whileHover={{ scale: 1.15, zIndex: 15 }}
                                        style={{
                                            backgroundImage: `url(${props.selectedTab.id === 0 ? getBackdropImage(image.file_path) : getPosterImage(image.file_path)})`,
                                            width: props.selectedTab.id === 0 ? 200 : 120,
                                            aspectRatio: props.selectedTab.id === 0 ? '16/9' : '2/3',
                                            border: props.galleryIndex === index ? '4px solid var(--primary)' : 'none',
                                        }}
                                        className='relative bg-foreground-light rounded-xl bg-center bg-cover mx-auto z-10'
                                    >
                                        <div
                                            style={{
                                                opacity: props.galleryIndex === index ? '0' : '0.35',
                                            }}
                                            className='absolute top-0 left 0 h-full w-full max-md:!opacity-0 bg-black hover:!opacity-0 rounded-xl transition-opacity'
                                        />
                                    </motion.div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </motion.div>
    )
}