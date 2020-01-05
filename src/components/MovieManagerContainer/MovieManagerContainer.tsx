import React, { useState, useEffect } from "react";
import { Movie } from "../../obj/types";
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
  const [isSelectedMovieOpen, setIsSelectedMovieOpen] = useState<boolean>(false);
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
  }, []);

  // This syncs the boolean value with the content.
  // Not using content for showing because causes the component to snap shut as oppposed to animate
  useEffect(() => {
    if (selectedMovie) setIsSelectedMovieOpen(true);
  }, [selectedMovie]);

  let content = loadingStatus ? (
    <Loading status={loadingStatus.toString()} />
  ) : (
    <Loading status={""} />
  );

  const onSortChange = (sort: SortOptions) => {
    setCurrentSort(sort);
    closeSelectedMovie();
    setIsSidebarOpen(false);
  };

  //this waits for the animation to finish before removing the content
  const closeSelectedMovie = () => {
    setIsSelectedMovieOpen(false);
    setTimeout(() => {
      setSelectedMovie(undefined);
    }, 100);
  };

  if (loadingStatus === LoadingStatus.done) {
    content = (
      <div className={styles.container}>
        <Sidebar
          isOpen={isSidebarOpen}
          currentSort={currentSort}
          handleSortChange={onSortChange}
          handleMenuClose={() => setIsSidebarOpen(false)}
        />
        <Header handleMenuClick={() => setIsSidebarOpen(true)} />

        {selectedMovie && (
          <SelectedMovieTile
            movie={selectedMovie}
            isOpen={isSelectedMovieOpen}
            handleClose={closeSelectedMovie}
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
