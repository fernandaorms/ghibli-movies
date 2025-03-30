import { FaRegStar, FaStar } from 'react-icons/fa6';

type Props = {
    ratingValue: number,
    starsNumber?: number,
    color?: string,
}

export function StarsRating(props: Props) {
    const stars = props.starsNumber ?? 5;
    const color = props.color ?? 'primary';
    const fill = Math.floor(props.ratingValue);

    return (
        <div className={`flex text-${color}`}>
            {[...Array(stars)].map((_, index) => (
                <div key={index}>
                    {index + 1 <= fill ? (
                        <FaStar />
                    ) : (
                        <FaRegStar key={index} />
                    )}
                </div>
            ))}
        </div>
    )
}
