import React, { useState } from "react";
import styles from "./Poster.module.css";
import YouTube, { Options } from "react-youtube";

type Props = {
  posterUrl: string | undefined;
  title: string;
  onClick: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
};

const Poster = (props: Props) => {
  const { posterUrl, onClick, onKeyDown, title } = props;
  const [hover, setHover] = useState(false);
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
};

export default Poster;
