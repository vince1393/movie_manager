import React from "react";
import { Movie } from "../../../obj/queries";
import Poster from "./Poster/Poster";
import { generateKeyPairSync } from "crypto";
import MovieRow from "./MovieRow/MovieRow";

type Props = {
  genres: string[];
  movies: Movie[];
  onPosterClick: (movie: Movie) => void;
};

const MovieRows = (props: Props) => {
  const { genres, movies, onPosterClick } = props;
  return (
    <>
      {genres.sort().map(genre => (
        <MovieRow
          genre={genre}
          movies={movies.filter(movie =>
            movie.Genre.split(",").includes(genre)
          )}
          onPosterClick={onPosterClick}
        />
      ))}
    </>
  );
};

export default MovieRows;
