import React, { useState, useEffect } from "react";
import { Movie } from "../../obj/queries";
import { getMovieFiles } from "../../util/fileScanner";
import ptt from "parse-torrent-title";
import { getMovie } from "../../api/movieApi";
import SelectedMovieTile from "./SelectedMovieTile/SelectedMovieTile";
import styles from "./MovieManagerContainer.module.css";
const path = window.require("path");

type Props = {
  path: string;
};
// /
const MovieManagerContainer = (props: Props) => {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>();

  useEffect(() => {
    const moviePaths = getMovieFiles(props.path);
    moviePaths.forEach(async moviePath => {
      const movie = path.parse(moviePath).base;
      const parsedMovieData: ParseTorrentTitle.ParserResult = ptt.parse(movie);
      const movieTitle = parsedMovieData.title;
      const movieYear = parsedMovieData.year
        ? parsedMovieData.year.toString()
        : "";

      const newMovie: Movie = await getMovie(movieTitle, movieYear);
      newMovie.Path = moviePath;
      setMovieList(oldMovies => [...oldMovies, newMovie]);
    });
  }, []);
  return (
    <div className="App">
      {selectedMovie && <SelectedMovieTile movie={selectedMovie} />}
      {movieList.map((movie, index) => (
        <>
          <img
            className={styles.poster}
            src={movie?.Poster}
            alt=""
            tabIndex={0}
            onClick={() => setSelectedMovie(movie)}
            onKeyDown={e => e.key === "Enter" && setSelectedMovie(movie)}
          />
        </>
      ))}
    </div>
  );
};

export default MovieManagerContainer;
