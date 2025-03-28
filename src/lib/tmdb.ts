const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const COMPANY_ID = process.env.NEXT_PUBLIC_COMPANY_ID;

async function fetchFromTMDB(endpoint: string, query?: string[]) {
    let url = `${BASE_URL}${endpoint}?api_key=${API_KEY}`;
    query?.forEach((value) => url += `&${value}`);

    const res = await fetch(url);

    if (!res.ok) throw new Error(`Error fetching ${endpoint}`);
    return res.json();
}

export async function getAllMovies() {
    return fetchFromTMDB(`/company/${COMPANY_ID}/movies`);
}

export async function getMovieByID(id: any) {
    return fetchFromTMDB(`/movie/${id}`);
}

export async function getMovieImages(id: any) {
    return fetchFromTMDB(`/movie/${id}/images`, ['include_image_language=en,null']);
}
