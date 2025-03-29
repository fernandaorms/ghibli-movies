import { AnimatePresence, motion } from 'motion/react';
import { FaMagnifyingGlass } from 'react-icons/fa6';

type Props = {
    inputValue: string,
    scrolled: boolean,
    isSearchOpen: boolean,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    onChange: (e: React.FormEvent<HTMLInputElement>) => void,
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
                        className='relative grid items-center gap-4 bg-background text-foreground rounded-full h-[56px] border-2 border-foreground-light'
                    >
                        <div className='absolute left-4 w-[16px] pr-6 border-r-2 border-foreground-light'>
                            <FaMagnifyingGlass />
                        </div>

                        <input
                            type='text'
                            placeholder='Serach at Ghibli Movies...'
                            value={props.inputValue}
                            onChange={(e) => props.onChange(e)}
                            className='w-full h-[100%] block rounded-full pl-13 pr-8'
                        />
                    </form>
                </motion.div>
            ) : null}

        </AnimatePresence>
    )
}
