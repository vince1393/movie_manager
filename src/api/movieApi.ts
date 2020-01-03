import axios from "axios";
import { Movie, SearchTMDBMovie, TMDBMovie } from "../obj/queries";
import ptt from "parse-torrent-title";
const path = window.require("path");
const omdbApi: string = "http://www.omdbapi.com/";
const tmdbApi: string = "https://api.themoviedb.org/3";
const tmdbImageUrl: string = "https://image.tmdb.org/t/p/original/";

export const getMovie_DEPRECATED = async (title: string, year: string = ""): Promise<Movie> => {
  const formattedTitle = title.split(" ").join("+");

  return await axios
    .get(
      `${omdbApi}?apikey=${process.env.REACT_APP_API_KEY}&t=${formattedTitle}&y=${year}&plot=full`
    )
    .then(response => {
      return !response.data.Error
        ? response.data
        : console.error(`Error: ${response.data.Error} - Movie: ${title} Year: ${year}`);
    });
};

export const searchMovie = async (title: string, year: string = ""): Promise<Movie | undefined> => {
  const formattedTitle = encodeURI(title);

  const SearchMovie: SearchTMDBMovie = await axios
    .get(
      `${tmdbApi}/search/movie?api_key=${process.env.REACT_APP_API_KEY_TMDB}&query=${formattedTitle}&year=${year}`
    )
    .then(response => {
      console.log(response.data);
      return response.data.total_results > 0
        ? response.data.results[0]
        : console.error(`Error: ${response.data.toString()} - Movie: ${title} Year: ${year}`);
    });
  if (SearchMovie) {
    const tmdbMovie: TMDBMovie = await getMovie(SearchMovie.id);

    return convertTMDBMovieToMovie(tmdbMovie);
  }
  return;
};

const convertTMDBMovieToMovie = (tmdbMovie: TMDBMovie): Movie => {
  return {
    Title: tmdbMovie.title,
    Year: new Date(tmdbMovie.release_date).getFullYear().toString(),
    Rated: tmdbMovie.vote_average?.toString(),
    Released: new Date(tmdbMovie.release_date).toLocaleDateString(),
    Runtime: tmdbMovie.runtime?.toString(),
    Genre: tmdbMovie.genres.map(genre => genre.name),
    Director: tmdbMovie.credits.crew
      .filter(crew => crew.job === "Director")
      .map(crew => crew.name)
      .join(", "),
    Writer: tmdbMovie.credits.crew
      .filter(crew => crew.job === "Writer")
      .map(crew => crew.name)
      .join(", "),
    Actors: tmdbMovie.credits.cast
      .map(actor => `${actor.name}(${actor.character})`)
      .slice(0, 15)
      .join(", "),
    Plot: tmdbMovie.overview,
    Language: tmdbMovie.original_language,
    Country: tmdbMovie.production_countries.map(country => country.name).join(),
    Awards: "", //NOT SUPPORTED BY NEW API YET
    Poster: tmdbImageUrl + tmdbMovie.poster_path,
    Backdrop: tmdbMovie.images?.backdrops
      ? tmdbMovie.images.backdrops.map(backdrop => tmdbImageUrl + backdrop.file_path)
      : undefined,
    BelongsToCollection: tmdbMovie.belongs_to_collection && {
      id: tmdbMovie.belongs_to_collection.id,
      name: tmdbMovie.belongs_to_collection.name,
      poster_path: tmdbMovie.belongs_to_collection.poster_path
        ? tmdbImageUrl + tmdbMovie.belongs_to_collection.poster_path
        : undefined,
      backdrop_path: tmdbMovie.belongs_to_collection.backdrop_path
        ? tmdbImageUrl + tmdbMovie.belongs_to_collection.backdrop_path
        : undefined
    },
    imdbID: tmdbMovie.imdb_id,
    BoxOffice: tmdbMovie.revenue?.toString(),
    Production: tmdbMovie.production_companies.map(company => company.name).join(),
    Website: tmdbMovie.homepage,
    trailerKey: tmdbMovie.videos.results[0]?.key
  };
};

export const getMovie = async (id: number): Promise<TMDBMovie> => {
  return await axios
    .get(
      `${tmdbApi}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY_TMDB}&append_to_response=videos,images,credits`
    )
    .then(response => {
      return response.data
        ? response.data
        : console.error(`Error: ${response.data.Error} - Could not find ID ${id}`);
    });
};

/* export const getMovies = async (moviePaths: string[]) => {
  let movieList: Movie[] = [];

  for (const moviePath of moviePaths) {
    const movie = path.parse(moviePath).base;
    const parsedMovieData: ParseTorrentTitle.ParserResult = ptt.parse(movie);
    const movieTitle = parsedMovieData.title;
    const movieYear = parsedMovieData.year
      ? parsedMovieData.year.toString()
      : "";

    const newMovie = await searchMovie(movieTitle, movieYear);
    if (newMovie) {
      newMovie.Path = moviePath;
      movieList.push(newMovie);
    }
  }
  return movieList;
}; */

export const getMovies = async (moviePaths: string[]) => {
  let movieList = await Promise.all(
    moviePaths.map(async moviePath => {
      const movie = path.parse(moviePath).base;
      const parsedMovieData: ParseTorrentTitle.ParserResult = ptt.parse(movie);
      const movieTitle = parsedMovieData.title;
      const movieYear = parsedMovieData.year ? parsedMovieData.year.toString() : "";

      const newMovie = await searchMovie(movieTitle, movieYear);
      if (newMovie) {
        newMovie.Path = moviePath;
      }
      return newMovie;
    })
  );
  return movieList.filter(movie => movie !== undefined) as Movie[];
};
