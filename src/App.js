import React, { useState, Fragment } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  async function fetchMoviesHandler() {
    const res = await fetch("https://swapi.dev/api/films/");
    const data = await res.json();
    const transformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseData: movieData.release_data,
      };
    });
    setMovies(transformedMovies);
  }

  return (
    <Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </Fragment>
  );
}

export default App;
