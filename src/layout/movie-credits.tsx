import { getProfileImage } from '@/lib/tmdb';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

type Props = {
    movieCredits: any,
}

type Credits = {
    id: number,
    label: string,
    info: any,
}

export function MovieCredits({ movieCredits }: Props) {
    const cast = movieCredits.cast ?? null;
    const crew = movieCredits.crew ?? null;

    const credits: Credits[] = [
        { id: 0, label: 'Cast', info: cast },
        { id: 1, label: 'Crew', info: crew }
    ];

    const [selectedTab, setSelectedTab] = useState(credits[0]);

    return (
        <section className='gallery'>
            <div className='wrapper'>
                <nav className='flex gap-10 md:gap-16 items-baseline pb-2'>
                    <h2 className='font-medium text-xl md:text-2xl'>Credits</h2>

                    <NavList
                        credits={credits}
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                </nav>

                <AnimatePresence mode='wait'>
                    <motion.div
                        key={selectedTab.id}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 10, opacity: 1 }}
                        exit={{ x: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className='overflow-clip relative w-full'
                    >
                        <div className='absolute top-0 left-0 h-full w-10 bg-linear-to-r from-background to-transparent z-10'></div>
                        <div className='absolute top-0 right-0 h-full w-10 bg-linear-to-l from-background to-transparent z-10'></div>

                        <CreditsList
                            selectedTab={selectedTab}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    )
}

const NavList = ({
    credits,
    selectedTab,
    setSelectedTab,
}: {
    credits: Credits[],
    selectedTab: any,
    setSelectedTab: (item: any) => void,
}) => {
    return (
        <ul className='flex gap-6 relative'>
            {credits.map((item) => (
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
                    <span className='text-content text-sm'>({item.info.length})</span>

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

const CreditsList = ({
    selectedTab
}: {
    selectedTab: any
}) => {
    return (
        <ol className='flex py-4 overflow-x-scroll'>
            {selectedTab.info.map((person: any, index: number) => (
                <li key={index} className='block !w-36 shrink-0'>
                    <motion.div
                        initial={{ scale: 1 }}
                        style={{ backgroundImage: `url(${getProfileImage(person.profile_path)})` }}
                        className='relative bg-foreground-light h-24 w-24 rounded-full flex items-center justify-center bg-center bg-cover mx-auto z-10'
                    />

                    <div className='text-center'>
                        <span className='block font-semibold mt-3'>{person.name}</span>
                        <span className='block text-xs font-light mb-1 text-content'>({person.original_name})</span>
                        <span className='block text-sm text-content'>{selectedTab.id === 0 ? person.character : person.job}</span>
                    </div>
                </li>
            ))}
        </ol>
    )
}
