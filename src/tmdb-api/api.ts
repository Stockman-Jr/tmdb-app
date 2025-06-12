import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;  
const BASE_URL = "https://api.themoviedb.org/3";
const api = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: "en-US",
        include_adult: false, 
    },
});

{/* Search query */}

export const searchMedia = async (query: string, page = 1) => {
    const res = await api.get("/search/multi", {
        params: {
            query: query,
            page: page,
        },
    });
    return res.data.results;
};

{/* Fetch popular movies, TV shows, and upcoming movies for front page sliders */}

export const getPopularMovies = async (page = 1) => {
    const res = await api.get("/discover/movie", {
        params: {
            sort_by: "popularity.desc",
            page: page,
        },
    });
    return res.data.results.slice(0, 12); // Return only the first 12 results
};

export const getPopularTV = async (page = 1) => {
    const res = await api.get("/discover/tv", {
        params: {
            sort_by: "popularity.desc",
            page: page,
        },
    });
    return res.data.results.slice(0, 12); // Return only the first 12 results
};

export const getUpcomingMovies = async (page = 1) => {
    const res = await api.get("/movie/upcoming", {
        params: {
            sort_by: "popularity.desc",
            page: page,
        },
    });
    return res.data.results.slice(0, 12); // Return only the first 12 results
};
