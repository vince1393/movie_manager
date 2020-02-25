import React from "react";
import styles from "./MovieTitle.module.css";
import Rating from "../../../common/Rating/Rating";
import MovieLength from "../../../common/MovieLength/MovieLength";

type Props = {
  title: string;
  rating: string;
  mpaaRating: string | undefined;
  year: string;
  length: string;
  genres: string[];
  boxOffice: string;
  handlePlay: () => void;
};

const MovieTitle = (props: Props) => {
  const { title, rating, mpaaRating, length, genres, year, boxOffice, handlePlay } = props;

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{title}</h1>
        <button onClick={handlePlay} className={styles.playButton}>
          ▶
        </button>
      </div>
      <div className={styles.detailContainer}>
        <div className={[styles.detail].join(" ")}>{year}</div>
        <Rating rating={rating} />
        <div className={[styles.detail, styles.mpaaRating].join(" ")}>
          {mpaaRating || "Unrated"}
        </div>
        <MovieLength length={length} />
        {/* <div className={[styles.detail].join(" ")}>{country}</div> */}
        <div className={[styles.detail].join(" ")}>{boxOffice}</div>
        <div className={[styles.detail].join(" ")}>
          <pre>{genres.join("  ●  ")}</pre>
        </div>
      </div>
      <div className={styles.detailContainer}></div>
    </div>
  );
};

export default MovieTitle;
