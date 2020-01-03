import React, { useState } from "react";
import styles from "./Poster.module.css";
import YouTube, { Options } from "react-youtube";
import { Movie } from "../../../obj/queries";

type Props = {
  posterUrl: string | undefined;
  title: string;
  onClick: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
};

const Poster = (props: Props) => {
  const { posterUrl, onClick, onKeyDown, title } = props;
  const [hover, setHover] = useState(false);

  const opts: Options = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0
    }
  };
  let poster;

  if (posterUrl) {
    poster = (
      <div className={styles.poster}>
        <img
          className={styles.poster}
          tabIndex={0}
          onClick={onClick}
          src={posterUrl}
          onKeyDown={e => onKeyDown(e)}
          alt={title}
        />
      </div>
    );
  } else {
    poster = (
      <div
        className={[styles.empty, styles.poster].join(" ")}
        tabIndex={0}
        onClick={onClick}
        onKeyDown={e => onKeyDown(e)}
      >
        <p>{title}</p> <p></p>
      </div>
    );
  }

  return poster;

  /*   return (
    <div
      className={styles.container}
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
    >
      <img
        className={hover ? styles.posterHidden : styles.poster}
        tabIndex={0}
        onClick={onClick}
        src={posterUrl}
        onKeyDown={e => onKeyDown(e)}
        alt={movie.Title}
      />
      <YouTube
        className={hover ? styles.video : styles.videoHidden} // defaults -> null
        videoId={movie.trailerKey} // defaults -> null
        id={movie.trailerKey} // defaults -> null
        containerClassName={styles.video} // defaults -> ''
        opts={opts} // defaults -> {}
        onEnd={() => setHover(false)} // defaults -> noop
      />
    </div>
  ); */
};

export default Poster;
