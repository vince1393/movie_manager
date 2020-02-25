import React from "react";
import styles from "./Rating.module.css";

type Props = {
  rating: string;
};

const Rating = (props: Props) => {
  const { rating } = props;

  const getRatingColor = (): string => {
    const numRating = parseFloat(rating);
    if (numRating > 7) return styles.good;
    else if (numRating > 5) return styles.average;
    else return styles.poor;
  };

  return <div className={[styles.detail, getRatingColor(), styles.rating].join(" ")}>{rating}</div>;
};

export default Rating;
