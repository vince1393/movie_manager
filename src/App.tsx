import React, { useEffect, useState } from "react";
import "./App.css";

import { Movie, Rating } from "./obj/queries";
import ptt from "parse-torrent-title";
import axios from "axios";

const omdbApi: string = "http://www.omdbapi.com/";
const mock: string[] = [
  "War Of The Worlds (2005) DVDRip Xvid   EMU",
  "The Dark Knight",
  "Scott Pilgrim vs The World [2010]",
  "Mr & Mrs Smith",
  "Southpaw (2015) 1080p x264 DD5.1 EN NL Subs",
  "Ant-Man 2015 1080p BluRay x264 DTS-JYK",
  "The.Simpsons.S31E06.WEB.x264-XLF[ettv]",
  "The Simpsons season 1, episode: Bart the Genius",
  "Charlie's Angels 2000"
];

const cleanData = (data: string) => {};

const getMovie = async (title: string, year: string = "") => {
  const formattedTitle = title.split(" ").join("+");

  return await axios
    .get(
      `${omdbApi}?apikey=${process.env.REACT_APP_API_KEY}&t=${formattedTitle}&y=${year}&plot=full`
    )
    .then(response => response.data);
};

const App: React.FC = () => {
  const [movie, setMovie] = useState<Movie[]>([]);
  useEffect(() => {
    mock.forEach(movie => {
      const parsedMovieData: ParseTorrentTitle.ParserResult = ptt.parse(movie);
      console.log(
        `${omdbApi}?apikey=${
          process.env.REACT_APP_API_KEY
        }&t=${encodeURIComponent(
          parsedMovieData.title
        )}&y=${parsedMovieData.year || ""}&plot=full`
      );
      axios
        .get(
          `${omdbApi}?apikey=${
            process.env.REACT_APP_API_KEY
          }&t=${encodeURIComponent(
            parsedMovieData.title
          )}&y=${parsedMovieData.year || ""}&plot=full`
        )
        .then(response => response.data)
        .then(data => setMovie(oldMovies => [...oldMovies, data]));
    });
  }, []);

  return (
    <div className="App">
      {movie.map(movie => (
        <>
          <div>{movie?.Title}</div>
          <div>{movie?.Year}</div>
          <div>{movie?.imdbRating}</div>
          <div> {movie?.Type}</div>
          <div> {movie?.Website}</div>
          <div> {movie?.Plot}</div>
          <div> {movie?.Response}</div>
          <div> {movie?.BoxOffice}</div>
          <div> {movie?.Ratings.toLocaleString()}</div>
          <img src={movie?.Poster} alt="" />
        </>
      ))}
    </div>
  );
};

export default App;
