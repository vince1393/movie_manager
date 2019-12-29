import React, { useState, useEffect } from "react";
import { Movie } from "../../obj/queries";
import { getMoviePaths } from "../../util/fileScanner";
import SelectedMovieTile from "./SelectedMovieTile/SelectedMovieTile";
import styles from "./MovieManagerContainer.module.css";
import { getMovies } from "../../api/movieApi";
import Loading from "../common/Loading/Loading";
import { LoadingStatus } from "../../obj/constants";
import Poster from "./MovieRows/Poster/Poster";
import MovieRows from "./MovieRows/MovieRows";

type Props = {
  path: string;
};

const MovieManagerContainer = (props: Props) => {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>();
  const [loadingStatus, setloadingStatus] = useState<LoadingStatus>(
    LoadingStatus.scanningFiles
  );
  const [genres, setGenres] = useState<string[]>([]);

  const getMovieInfo = async (moviePaths: string[]) => {
    setloadingStatus(LoadingStatus.apiCall); //change loading screen
    const _movieList = await getMovies(moviePaths); //API call to get movies
    setMovieList((oldMovies: Movie[]) => [...oldMovies, ..._movieList]); //update state

    // get unique genres
    setloadingStatus(LoadingStatus.gettingGenres);
    const allGenres: string[] = _movieList
      .map(movie => movie.Genre.split(","))
      .join()
      .split(",");
    const uniqueGenres: string[] = [...new Set(allGenres)];
    setGenres(uniqueGenres); //update state genres
    setloadingStatus(LoadingStatus.done); // loading done
  };

  useEffect(() => {
    const moviePaths = getMoviePaths(props.path);
    getMovieInfo(moviePaths);
  }, []); //

  let content = loadingStatus ? (
    <Loading status={loadingStatus.toString()} />
  ) : (
    <Loading status={""} />
  );

  if (loadingStatus === LoadingStatus.done) {
    content = (
      <div>
        {selectedMovie && (
          <SelectedMovieTile
            movie={selectedMovie}
            handleClose={() => setSelectedMovie(undefined)}
          />
        )}
        <div>
          <MovieRows
            movies={movieList}
            onPosterClick={setSelectedMovie}
            genres={genres}
          />
        </div>
      </div>
    );
  }
  return content;
};

export default MovieManagerContainer;
