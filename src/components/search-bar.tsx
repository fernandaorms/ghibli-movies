import { AnimatePresence, motion } from 'motion/react';
import { FaArrowRotateLeft, FaMagnifyingGlass, FaRegTrashCan } from 'react-icons/fa6';

type Props = {
    inputValue: string,
    scrolled: boolean,
    isSearchOpen: boolean,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    onChange: (e: React.FormEvent<HTMLInputElement>) => void,
    clearSearchBar: () => void,
}

export function SearchBar(props: Props) {
    return (
        <AnimatePresence initial={false}>
            {props.isSearchOpen ? (
                <motion.div
                    className={`wrapper ${props.scrolled ? 'mt-4' : ''}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                >
                    <form
                        onSubmit={(e) => props.onSubmit(e)}
                        className='relative grid items-center gap-4 bg-background text-foreground rounded-full h-[56px]'
                    >
                        <div className='absolute left-4 w-[16px] pr-6 border-r-2 border-foreground-light'>
                            <FaMagnifyingGlass />
                        </div>

                        <input
                            type='text'
                            placeholder='Serach at Ghibli Movies...'
                            value={props.inputValue}
                            onChange={(e) => props.onChange(e)}
                            className='w-full h-[100%] block rounded-full pl-13 pr-8 border-2 border-foreground-light focus:border-primary focus:outline-none'
                        />

                        <motion.div
                            className='absolute right-2 xl:right-3 xl:px-4 xl:text-sm flex gap-2 items-center justify-center cursor-pointer bg-foreground-light h-[40px] w-fit min-w-[40px] rounded-full'
                            whileHover={{ scale: 1.1 }}
                            onClick={props.clearSearchBar}
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
