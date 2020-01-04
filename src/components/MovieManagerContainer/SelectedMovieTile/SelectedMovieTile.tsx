import React from "react";
import { Movie } from "../../../obj/queries";
//import { SelectedMovie } from "../../../obj/constants";
import styles from "./SelectedMovieTile.module.css";
import { ReactComponent as Chevron } from "../../../assets/icons/chevron_up.svg";
const shell = window.require("electron").shell;

type Props = {
  movie: Movie;
  isOpen: boolean;
  handleClose: () => void;
};
const SelectedMovieTile = (props: Props) => {
  const { movie, handleClose, isOpen } = props;
  return (
    <div className={[styles.container, isOpen ? styles.visible : styles.hidden].join(" ")}>
      <div className={styles.infoContainer}>
        <div className={styles.description}>
          <h1>{movie.Title}</h1>
          <h5>{movie.Year}</h5>
          <div> {movie.mpaaRating || "un-rated"}</div>
          <div>Rated: {movie.Rated}</div>
          <div>Released: {movie.Released}</div>
          <div>Runtime: {movie.Runtime}</div>
          <div>Genre: {movie.Genre.join(", ")}</div>
          <div>Country: {movie.Country}</div>
          <div>Production: {movie.Production}</div>
          <div>Box Office: {movie.BoxOffice}</div>
          <div>Director: {movie.Director}</div>
          <div>Writer: {movie.Writer}</div>
          <div>Actors: {movie.Actors}</div>
          <div>Plot: {movie.Plot}</div>
          <button
            onClick={() => {
              try {
                movie.Path && shell.openItem(movie.Path);
              } catch (e) {
                console.error(e);
              }
            }}
          >
            Play
          </button>
        </div>
        <div className={styles.selectedPoster}>
          <img src={movie.Poster} alt={movie.Title + " poster"} />
        </div>
      </div>

      <Chevron className={styles.chevron} onClick={handleClose} />
    </div>
  );
};

export default SelectedMovieTile;
