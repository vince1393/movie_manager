import axios from "axios";
import { Movie } from "../obj/queries";
import ptt from "parse-torrent-title";
const path = window.require("path");
const omdbApi: string = "http://www.omdbapi.com/";

export const getMovie = async (
  title: string,
  year: string = ""
): Promise<Movie> => {
  const formattedTitle = title.split(" ").join("+");

  return await axios
    .get(
      `${omdbApi}?apikey=${process.env.REACT_APP_API_KEY}&t=${formattedTitle}&y=${year}&plot=full`
    )
    .then(response => {
      return !response.data.Error
        ? response.data
        : console.error(
            `Error: ${response.data.Error} - Movie: ${title} Year: ${year}`
          );
    });
};

export const getMovies = async (moviePaths: string[]) => {
  let movieList: Movie[] = await Promise.all(
    moviePaths.map(async moviePath => {
      const movie = path.parse(moviePath).base;
      const parsedMovieData: ParseTorrentTitle.ParserResult = ptt.parse(movie);
      const movieTitle = parsedMovieData.title;
      const movieYear = parsedMovieData.year
        ? parsedMovieData.year.toString()
        : "";

      const newMovie: Movie = await getMovie(movieTitle, movieYear);
      if (newMovie) {
        newMovie.Path = moviePath;
      }
      return newMovie;
    })
  );
  return movieList.filter(movie => movie !== undefined);
};
