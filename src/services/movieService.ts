import axios from "axios";
import type { Movie } from "../types/movie";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface SearchMovieProps {
  results: Movie[];
}

const movieService = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<SearchMovieProps>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
      },
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    }
  );
  return response.data.results;
};

export default movieService;
