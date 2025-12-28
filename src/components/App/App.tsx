import "./App.module.css";
import movieService from "../../services/movieService";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    async function fetchMovies() {
      const data = await movieService("Batman");
      console.log("TMDB response:", data);
    }
    fetchMovies();
  }, []);
  return <></>;
}

export default App;
