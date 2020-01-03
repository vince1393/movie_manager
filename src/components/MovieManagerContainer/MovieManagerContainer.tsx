import React, { useState, useEffect } from "react";
import { Movie } from "../../obj/queries";
import { getMoviePaths } from "../../util/fileScanner";
import SelectedMovieTile from "./SelectedMovieTile/SelectedMovieTile";
import styles from "./MovieManagerContainer.module.css";
import { getMovies } from "../../api/movieApi";
import Loading from "../common/Loading/Loading";
import { LoadingStatus, SortOptions } from "../../obj/constants";
import Poster from "../common/Poster/Poster";
import MovieRows from "./MovieRows/MovieRows";
import Header from "../common/Heading/Header";
import Sidebar from "./Sidebar/Sidebar";

type Props = {
  path: string;
};

const MovieManagerContainer = (props: Props) => {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>();
  const [loadingStatus, setloadingStatus] = useState<LoadingStatus>(LoadingStatus.scanningFiles);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [currentSort, setCurrentSort] = useState<SortOptions>(SortOptions.Genre);

  const getMovieInfo = async (moviePaths: string[]) => {
    setloadingStatus(LoadingStatus.apiCall); //change loading screen
    const _movieList = await getMovies(moviePaths); //API call to get movies
    setMovieList((oldMovies: Movie[]) => [...oldMovies, ..._movieList]); //update state

    // get unique genres
    setloadingStatus(LoadingStatus.gettingGenres);
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
        <Sidebar
          isOpen={isSidebarOpen}
          currentSort={currentSort}
          handleSortChange={(sort: SortOptions) => {
            setCurrentSort(sort);
          }}
          handleMenuClose={() => setIsSidebarOpen(false)}
        />
        <Header handleMenuClick={() => setIsSidebarOpen(true)} />

        {selectedMovie && (
          <SelectedMovieTile
            movie={selectedMovie}
            handleClose={() => setSelectedMovie(undefined)}
          />
        )}
        <div>
          <MovieRows movies={movieList} onPosterClick={setSelectedMovie} sortOption={currentSort} />
        </div>
      </div>
    );
  }
  return content;
};

export default MovieManagerContainer;
