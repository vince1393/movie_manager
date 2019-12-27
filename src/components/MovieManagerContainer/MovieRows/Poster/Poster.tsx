import React from "react";
import styles from "./Poster.module.css";

type Props = {
  title: string;
  year: string;
  posterUrl: string;
  onClick: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
};

const Poster = (props: Props) => {
  const { posterUrl, title, year, onClick, onKeyDown } = props;

  let poster;

  if (posterUrl !== "N/A" && posterUrl) {
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
        <p>{title}</p> <p>{year}</p>
      </div>
    );
  }

  return poster;
};

export default Poster;
