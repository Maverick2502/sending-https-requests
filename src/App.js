import React, { useState, Fragment } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("https://swapi.dev/api/films/");
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
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
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  let content = <p>Found no movies</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (error) {
    content = <p>Something went wrong!</p>;
  }

  return (
    <Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && <p>{error}</p>} */}
        {content}
      </section>
    </Fragment>
  );
}

export default App;
