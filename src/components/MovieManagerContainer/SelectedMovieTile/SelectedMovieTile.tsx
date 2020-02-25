import React, { useState } from "react";
import { Movie } from "../../../obj/types";
//import { SelectedMovie } from "../../../obj/constants";
import styles from "./SelectedMovieTile.module.css";
import { ReactComponent as Chevron } from "../../../assets/icons/chevron_up.svg";
import MovieTitle from "./MovieTitle/MovieTitle";
import YouTube, { Options } from "react-youtube";
import { symlink } from "fs";
const shell = window.require("electron").shell;

type Props = {
  movie: Movie;
  isOpen: boolean;
  handleClose: () => void;
};
const SelectedMovieTile = (props: Props) => {
  const [trailerIndex, setTrailerIndex] = useState(0);
  const { movie, handleClose, isOpen } = props;

  const options: Options = {
    height: (window.innerHeight / 1.4).toString(),
    width: (window.innerWidth / 1.5).toString(),
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3
    }
  };

  const createList = (title: string, list: string[]): JSX.Element => {
    return (
      <div className={styles.listContainer}>
        <h5 className={styles.listTitle}>{title}</h5>
        <ul className={styles.list}>
          {list.map(item => (
            <li className={styles.listItem}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };
  const startMovie = () => {
    handleClose();
    try {
      movie.Path && shell.openItem(movie.Path);
    } catch (e) {
      console.error(e);
    }
  };

  const trailerEnd = (_event: any) => {
    nextTrailer();
  };

  const nextTrailer = () => {
    console.log("NEXT", trailerIndex, movie.TrailerKeys.length);
    if (movie.TrailerKeys.length === 0) return;
    else if (trailerIndex < movie.TrailerKeys.length - 1) setTrailerIndex(index => ++index);
    else setTrailerIndex(0);
  };

  const previousTrailer = () => {
    console.log("BACK", trailerIndex, movie.TrailerKeys.length);
    if (movie.TrailerKeys.length === 0) return;
    else if (trailerIndex > 0) setTrailerIndex(index => --index);
    else setTrailerIndex(0);
  };
  return (
    <div className={[styles.outerContainer, isOpen ? styles.visible : styles.hidden].join(" ")}>
      <div className={styles.innerContainer}>
        <div className={styles.informationContainer}>
          <MovieTitle
            title={movie.Title}
            rating={movie.Rated}
            mpaaRating={movie.mpaaRating}
            year={movie.Year}
            length={movie.Runtime}
            genres={movie.Genre}
            boxOffice={movie.BoxOffice}
            handlePlay={startMovie}
          />
          <div className={styles.plot}>{movie.Plot}</div>
          <div className={styles.innerInformationContainer}>
            <div className={styles.columnLeft}>
              {movie.Actors.length !== 0 &&
                createList(
                  "Cast:",
                  [...movie.Actors]
                    .splice(0, 15)
                    .map(actor => `${actor.name}${actor.character ? ` as ${actor.character}` : ""}`)
                )}
            </div>
            <div className={styles.columnRight}>
              {movie.Production.length !== 0 && createList("Produced by:", movie.Production)}
              {movie.Director.length !== 0 && createList("Directed by:", movie.Director)}
              {movie.Writer.length !== 0 && createList("Written by:", movie.Writer)}
            </div>
          </div>
        </div>
        <div className={styles.selectedPoster}>
          <div className={styles.videoOverlay}>
            <div
              onClick={previousTrailer}
              className={[
                styles.overlayButton,
                styles.buttonLeft,
                trailerIndex > 0 ? "" : styles.hidden
              ].join(" ")}
            ></div>
            <div
              onClick={nextTrailer}
              className={[
                styles.overlayButton,
                styles.buttonRight,
                trailerIndex < movie.TrailerKeys.length - 1 ? "" : styles.hidden
              ].join(" ")}
            ></div>
          </div>
          <YouTube
            //className={styles.trailer} // defaults -> null
            videoId={movie.TrailerKeys[trailerIndex]} // defaults -> null
            id={movie.TrailerKeys[trailerIndex]} // defaults -> null
            //containerClassName={styles.video} // defaults -> ''
            opts={options} // defaults -> {}
            onEnd={trailerEnd} // defaults -> noop
          />
        </div>
      </div>
      <Chevron className={styles.chevron} onClick={handleClose} />
    </div>
  );
};

export default SelectedMovieTile;
