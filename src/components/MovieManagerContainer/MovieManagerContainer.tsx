import React, { useState, useEffect } from "react";
import { Movie } from "../../obj/queries";
import { getMoviePaths } from "../../util/fileScanner";
import SelectedMovieTile from "./SelectedMovieTile/SelectedMovieTile";
import styles from "./MovieManagerContainer.module.css";
import { getMovies } from "../../api/movieApi";
import Loading from "../common/Loading/Loading";
import { LoadingStatus } from "../../obj/constants";
import Poster from "./MovieRows/Poster/Poster";

type Props = {
  path: string;
};

const MovieManagerContainer = (props: Props) => {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>();
  const [loadingStatus, setloadingStatus] = useState<LoadingStatus>(
    LoadingStatus.scanningFiles
  );

  const getMovieInfo = async (moviePaths: string[]) => {
    const _movieList = await getMovies(moviePaths);
    setMovieList((oldMovies: Movie[]) => [...oldMovies, ..._movieList]);
    setloadingStatus(LoadingStatus.done);
  };

  useEffect(() => {
    const moviePaths = getMoviePaths(props.path);
    setloadingStatus(LoadingStatus.apiCall);
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
          {movieList.map(movie => {
            console.log(movieList.length);
            return (
              <Poster
                posterUrl={movie.Poster}
                title={movie.Title}
                year={movie.Year}
                onClick={() => setSelectedMovie(movie)}
                onKeyDown={e => e.key === "Enter" && setSelectedMovie(movie)}
              />
            );
          })}
        </div>
      </div>
    );
  }
  return content;
};

export default MovieManagerContainer;
