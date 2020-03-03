import React, { useState } from "react";
import styles from "./Poster.module.css";
import ImageFader from "../ImageFader/ImageFader";
import Rating from "../Rating/Rating";
import MovieLength from "../MovieLength/MovieLength";

type Props = {
  Title: string;
  Year?: string;
  Rated?: string;
  Runtime?: string;
  Genre?: string[];
  Poster?: string;
  Backdrop?: string[];
  BoxOffice?: string;
  mpaaRating?: string | undefined;
  isHover: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onClick: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
};

const Poster = (props: Props) => {
  let {
    Title,
    Year,
    Rated,
    Runtime,
    Genre,
    Poster,
    Backdrop,
    BoxOffice,
    mpaaRating,
    onClick,
    onKeyDown,
    onEnter,
    onLeave,
    isHover
  } = props;
  let poster;

  onEnter = () => {
    props.onEnter && props.onEnter();
    console.log("ENTER");
  };
  onLeave = () => {
    props.onLeave && props.onLeave();
    console.log("LEAVE");
  };

  const overlay = (
    <div className={styles.infoOverlay}>
      <div>{Title}</div>
      <div>{Year}</div>
      <Rating rating={Rated || "0"} />
      <MovieLength length={Runtime || "0"} />
      <div> {Genre?.join(" ● ")}</div>
      <div>{BoxOffice}</div>
      <div className={[styles.detail, styles.mpaaRating].join(" ")}> {mpaaRating}</div>
    </div>
  );

  if (Poster && !isHover) {
    poster = (
      <div className={styles.poster}>
        <img className={styles.poster} tabIndex={0} src={Poster} alt={Title} />
      </div>
    );
  } else if (!Poster && !isHover) {
    poster = (
      <div
        className={[styles.empty, styles.poster].join(" ")}
        tabIndex={0}
        onClick={onClick}
        onKeyDown={e => onKeyDown(e)}
      >
        <p>{Title}</p> <p>{Year}</p>
      </div>
    );
  } else if (Backdrop?.length && isHover) poster = <ImageFader images={Backdrop} />;
  else if (!Backdrop?.length && isHover) {
    poster = (
      <div
        className={[styles.empty, styles.poster].join(" ")}
        tabIndex={0}
        onClick={onClick}
        onKeyDown={e => onKeyDown(e)}
      >
        <p>{Title}</p> <p>{Year}</p>
      </div>
    );
  }
  return (
    <div
      onMouseLeave={onLeave}
      onMouseOver={onEnter}
      className={isHover ? styles.backdrop : styles.poster}
      onClick={onClick}
    >
      {isHover && overlay}
      {poster}
    </div>
  );
};

export default Poster;
