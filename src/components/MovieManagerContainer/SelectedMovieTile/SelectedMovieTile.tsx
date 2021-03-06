import React from "react";
import { Movie } from "../../../obj/queries";
//import { SelectedMovie } from "../../../obj/constants";
import styles from "./SelectedMovieTile.module.css";
const shell = window.require("electron").shell;

type Props = {
  movie: Movie;
  handleClose: () => void;
};
const SelectedMovieTile = (props: Props) => {
  const { movie, handleClose } = props;
  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <h1>{movie.Title}</h1>
        <h5>{movie.Year}</h5>
        <div>Rated: {movie.Rated}</div>
        <div>Released: {movie.Released}</div>
        <div>Runtime: {movie.Runtime}</div>
        <div>Genre: {movie.Genre}</div>
        <div>Country: {movie.Country}</div>
        <div>Meta Score: {movie.Metascore}</div>
        <div>IMDb Rating: {movie.imdbRating}</div>
        <div>Production: {movie.Production}</div>
        <div>Box Office: {movie.BoxOffice}</div>
        <div>Awards: {movie.Awards}</div>
        <div>Director: {movie.Director}</div>
        <div>Writer: {movie.Writer}</div>
        <div>Actors: {movie.Actors}</div>
        <div>Plot: {movie.Plot}</div>
        <button
          onClick={() => {
            shell.openItem(movie.Path);
          }}
        >
          Play
        </button>
      </div>
      <div className={styles.poster}>
        <img src={movie.Poster} alt="" />
      </div>
      <button className={styles.closeButton} onClick={handleClose}>
        X
      </button>
    </div>
  );
};

export default SelectedMovieTile;
