import "./App.module.css";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import movieService from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setIsLoading(true);
    setError(false);

    try {
      const data = await movieService(query);
      if (data.length === 0) {
        toast.error("No movies found for your request.");
        setMovies([]);
      } else {
        setMovies(data);
      }
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (movie: Movie) => {
    setModalIsOpen(true);
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {!isLoading && !error && (
        <MovieGrid movies={movies} onSelect={openModal} />
      )}
      {modalIsOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </>
  );
}

export default App;
