import React from "react";
import styles from "./MovieLength.module.css";

type Props = {
  length: string;
};

const MovieLength = (props: Props) => {
  const { length } = props;

  const calculateLength = (): string => {
    const movieLength = parseInt(length);
    if (isNaN(movieLength)) return "Unknown Length";
    else {
      const hours = Math.floor(movieLength / 60);
      const mins = movieLength % 60;
      return `${hours}h ${mins}m`;
    }
  };

  return <div className={[styles.detail].join(" ")}>{calculateLength()}</div>;
};

export default MovieLength;
