import React, { useState } from "react";
import { Movie } from "../../../../obj/types";
import Poster from "../../../common/Poster/Poster";
import styles from "./MovieRow.module.css";

type Props = {
  genre: string;
  movies: Movie[];
  onPosterClick: (movie: Movie) => void;
  isMultiRow?: boolean;
};

const MovieRow = (props: Props) => {
  const { genre, movies, onPosterClick, isMultiRow } = props;
  const [hoveredPoster, sethoveredPoster] = useState<number | undefined>(undefined);
  return (
    <div>
      <h2 className={styles.rowHeader}>{genre}</h2>
      <div className={isMultiRow ? styles.multiRowContainer : styles.rowContainer}>
        {movies.map((movie, index) => {
          return (
            <Poster
              key={index}
              Title={movie.Title}
              Year={movie.Year}
              Rated={movie.Rated}
              Runtime={movie.Runtime}
              Genre={movie.Genre}
              Poster={movie.Poster}
              Backdrop={movie.Backdrop}
              BoxOffice={movie.BoxOffice}
              mpaaRating={movie.mpaaRating}
              isHover={hoveredPoster === index}
              onEnter={() => sethoveredPoster(index)}
              onLeave={() => sethoveredPoster(undefined)}
              onClick={() => onPosterClick(movie)}
              onKeyDown={e => e.key === "Enter" && onPosterClick(movie)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MovieRow;
