const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const COMPANY_ID = process.env.NEXT_PUBLIC_COMPANY_ID;
const IMG_BASE_URL = process.env.NEXT_PUBLIC_IMG_BASE_URL;

async function fetchFromTMDB(endpoints: string, query?: string[]) {
    let url = `${BASE_URL}/${endpoints}?api_key=${API_KEY}`;
    query?.forEach((value) => url += `&${value}`);

    const res = await fetch(url);

    if (!res.ok) throw new Error(`Error fetching ${endpoints}`);
    return res.json();
}

export async function getAllMovies() {
    return fetchFromTMDB(`company/${COMPANY_ID}/movies`);
}

export async function getMovieByID(id: any) {
    return fetchFromTMDB(`movie/${id}`);
}

export async function getMovieImages(id: any) {
    return fetchFromTMDB(`movie/${id}/images`, ['include_image_language=en,null']);
}

export async function getMovieCredits(id: any) {
    return fetchFromTMDB(`movie/${id}/credits`);
}

export async function getMovieReviews(id: any) {
    return fetchFromTMDB(`movie/${id}/reviews`);
}


// Getting Images
function getImage(file_path: string, file_size: string) {
    return `${IMG_BASE_URL}${file_size}${file_path}`;
}

type BackdropSizes = 'w300' | 'w780' | 'w1280' | 'original';

export function getBackdropImage(file_path: string, file_size: BackdropSizes = 'original') {
    return getImage(file_path, file_size);
}

type LogoSizes = 'w45' | 'w92' | 'w154' | 'w185' | 'w300' | 'w500' | 'original';

export function getLogoImage(file_path: string, file_size: LogoSizes = 'original') {
    return getImage(file_path, file_size);
}

type PosterSizes = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';

export function getPosterImage(file_path: string, file_size: PosterSizes = 'original') {
    return getImage(file_path, file_size);
}

type ProfileSizes = 'w45' | 'w185' | 'h632' | 'original';

export function getProfileImage(file_path: string, file_size: ProfileSizes = 'original') {
    return getImage(file_path, file_size);
}