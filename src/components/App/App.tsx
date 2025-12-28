import "./App.module.css";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import movieService from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";

function App() {
  const [movie, setMovie] = useState<Movie[]>([]);

  const handleSearch = async (query: string) => {
    setMovie([]);
    const data = await movieService(query);
    if (movie.length === 0) {
      toast.error("No movies found for your request.");
      return;
    }
    setMovie(data);
  };
  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
