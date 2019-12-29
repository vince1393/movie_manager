import React from "react";
import { Movie } from "../../../../obj/queries";
import Poster from "../Poster/Poster";

type Props = {
  genre: string;
  movies: Movie[];
  onPosterClick: (movie: Movie) => void;
};

const MovieRow = (props: Props) => {
  const { genre, movies, onPosterClick } = props;
  return (
    <div>
      <h2>{genre}</h2>
      {movies.map(movie => {
        return (
          <Poster
            posterUrl={movie.Poster}
            title={movie.Title}
            year={movie.Year}
            onClick={() => onPosterClick(movie)}
            onKeyDown={e => e.key === "Enter" && onPosterClick(movie)}
          />
        );
      })}
    </div>
  );
};

export default MovieRow;
