import React from "react";
import styles from "./MovieTitle.module.css";

type Props = {
  title: string;
  rating: string;
  mpaaRating: string | undefined;
  year: string;
  length: string;
  genres: string[];
  country: string;
  boxOffice: string;
  handlePlay: () => void;
};

const MovieTitle = (props: Props) => {
  const { title, rating, mpaaRating, length, genres, year, country, boxOffice, handlePlay } = props;

  const getRatingColor = (): string => {
    const numRating = parseFloat(rating);
    if (numRating > 7) return styles.good;
    else if (numRating > 5) return styles.average;
    else return styles.poor;
  };

  const calculateLength = (): string => {
    const movieLength = parseInt(length);
    if (isNaN(movieLength)) return "Unknown Length";
    else {
      const hours = Math.floor(movieLength / 60);
      const mins = movieLength % 60;
      return `${hours}h ${mins}m`;
    }
  };

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
        <div className={[styles.detail, getRatingColor(), styles.rating].join(" ")}>{rating}</div>
        <div className={[styles.detail, styles.mpaaRating].join(" ")}>
          {mpaaRating || "Unrated"}
        </div>
        <div className={[styles.detail].join(" ")}>{calculateLength()}</div>
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
