import { motion } from 'motion/react';
import { FaAlignJustify, FaXmark } from 'react-icons/fa6';

type Props = {
    isMenuOpen: boolean
    onClick: () => void,
}

export function MenuToogle(props: Props) {
    return (
        <motion.div
            className={`xl:hidden bg-foreground-light h-10 w-10 flex items-center justify-center rounded-full cursor-pointer  z-10 ${props.isMenuOpen ? 'text-white' : ''}`}
            onClick={props.onClick}
            whileHover={{ scale: 1.125 }}
        >
            {props.isMenuOpen ? (
                <FaXmark />
            ) : (
                <FaAlignJustify />
            )}
        </motion.div>
    )
}
