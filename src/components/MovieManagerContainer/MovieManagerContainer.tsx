import React, { useState, useEffect } from "react";
import { Movie } from "../../obj/queries";
import { getMovieFiles } from "../../util/fileScanner";
import axios from "axios";
import ptt from "parse-torrent-title";
const path = window.require("path");

const omdbApi: string = "http://www.omdbapi.com/";

type Props = {
  path: string;
};

const MovieManagerContainer = (props: Props) => {
  const [movie, setMovie] = useState<Movie[]>([]);
  const moviePaths = getMovieFiles(props.path);
  useEffect(() => {
    moviePaths.forEach(moviePath => {
      const movie = path.parse(moviePath).base;
      const parsedMovieData: ParseTorrentTitle.ParserResult = ptt.parse(movie);

      axios
        .get(
          `${omdbApi}?apikey=${
            process.env.REACT_APP_API_KEY
          }&t=${encodeURIComponent(
            parsedMovieData.title
          )}&y=${parsedMovieData.year || ""}&plot=full`
        )
        .then(response => response.data)
        .then(data => setMovie(oldMovies => [...oldMovies, data]));
    });
  }, []);

  return (
    <div className="App">
      {movie.map(movie => (
        <>
          <h1>{movie?.Title}</h1>
          <div>{movie?.Year}</div>
          <div>{movie?.imdbRating}</div>
          <div> {movie?.Type}</div>
          <div> {movie?.Website}</div>
          <div> {movie?.Plot}</div>
          <div> {movie?.BoxOffice}</div>
          <img src={movie?.Poster} alt="" />
        </>
      ))}
    </div>
  );
};

export default MovieManagerContainer;
