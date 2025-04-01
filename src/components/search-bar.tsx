'use client';

import { AnimatePresence, motion } from 'motion/react';
import { FaArrowRotateLeft, FaMagnifyingGlass } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

type Props = {
    inputValue: string,
    scrolled: boolean,
    isSearchOpen: boolean,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    onChange: (e: React.FormEvent<HTMLInputElement>) => void,
    clearSearchBar: () => void,
}

export function SearchBar({ inputValue, scrolled, isSearchOpen, onSubmit, onChange, clearSearchBar }: Props) {
    const router = useRouter();

    const onClickSubmit = () => {
        clearSearchBar();
        router.push(`/movies?search=${inputValue.trim()}`);
    }

    return (
        <AnimatePresence initial={false}>
            {isSearchOpen ? (
                <motion.div
                    className={`wrapper ${scrolled ? 'mt-4' : ''}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                >
                    <form
                        onSubmit={(e) => onSubmit(e)}
                        className='relative grid items-center gap-4 bg-background text-foreground rounded-full h-[56px]'
                    >
                        <div className='absolute left-4 w-[16px] pr-6 border-r-2 border-foreground-light'>
                            <FaMagnifyingGlass
                                className='cursor-pointer'
                                onClick={onClickSubmit}
                            />
                        </div>

                        <input
                            type='text'
                            placeholder='Type and press Enter (↵)'
                            value={inputValue}
                            onChange={(e) => onChange(e)}
                            className='w-full h-[100%] block rounded-full pl-13 pr-8 border-2 border-foreground-light focus:border-primary focus:outline-none'
                        />

                        <motion.div
                            className='absolute right-2 xl:right-3 xl:px-4 xl:text-sm flex gap-2 items-center justify-center cursor-pointer bg-foreground-light h-[40px] w-fit min-w-[40px] rounded-full'
                            whileHover={{ scale: 1.1 }}
                            onClick={clearSearchBar}
                        >
                            <span className='hidden xl:inline-block uppercase'>Clear</span>
                            <FaArrowRotateLeft />
                        </motion.div>
                    </form>
                </motion.div>
            ) : null}

        </AnimatePresence>
    )
}
