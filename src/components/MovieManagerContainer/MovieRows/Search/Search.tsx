import React, { useState } from "react";
import { Movie, Actor } from "../../../../obj/types";
import MovieRow from "../MovieRow/MovieRow";
import styles from "./Search.module.css";

type Props = {
  movies: Movie[];
  onPosterClick: (movie: Movie) => void;
};

const Search = (props: Props) => {
  const [searchText, setSearchText] = useState<string>("");
  const [time, setTime] = useState();
  const { movies, onPosterClick } = props;

  // default shows all movies
  let searchResults = (
    <MovieRow genre={"All"} movies={movies} onPosterClick={onPosterClick} isMultiRow={true} />
  );

  const findMatchInArray = (searchArray: string[]) =>
    searchArray.find(item => isMatch(searchText, item));

  const findMatchInArrayActors = (searchArray: Actor[], property: "character" | "name") =>
    searchArray.find(actor => isMatch(searchText, actor[property]));

  const isMatch = (phrase: string, target: string): boolean =>
    target.toUpperCase().includes(phrase.toUpperCase());

  const filterMoviesByTitle = () => movies.filter(movie => isMatch(searchText, movie.Title));

  const filterMoviesByDirector = () => movies.filter(movie => findMatchInArray(movie.Director));

  const filterMoviesByWriter = () => movies.filter(movie => findMatchInArray(movie.Writer));

  const filterMoviesByProduction = () => movies.filter(movie => findMatchInArray(movie.Production));

  const filterMoviesByActor = () =>
    movies.filter(movie => findMatchInArrayActors(movie.Actors, "name"));

  const filterMoviesByCharacter = () =>
    movies.filter(movie => findMatchInArrayActors(movie.Actors, "character"));

  // Title, Director, Writer, Actor - Name, Actor - Character, Production
  if (searchText) {
    searchResults = (
      <>
        {filterMoviesByTitle().length > 0 && (
          <MovieRow genre={"Title"} movies={filterMoviesByTitle()} onPosterClick={onPosterClick} />
        )}
        {filterMoviesByDirector().length > 0 && (
          <MovieRow
            genre={"Director"}
            movies={filterMoviesByDirector()}
            onPosterClick={onPosterClick}
          />
        )}
        {filterMoviesByWriter().length > 0 && (
          <MovieRow
            genre={"Writer"}
            movies={filterMoviesByWriter()}
            onPosterClick={onPosterClick}
          />
        )}
        {filterMoviesByProduction().length > 0 && (
          <MovieRow
            genre={"Production"}
            movies={filterMoviesByProduction()}
            onPosterClick={onPosterClick}
          />
        )}
        {filterMoviesByActor().length > 0 && (
          <MovieRow genre={"Actor"} movies={filterMoviesByActor()} onPosterClick={onPosterClick} />
        )}
        {filterMoviesByCharacter().length > 0 && (
          <MovieRow
            genre={"Characters"}
            movies={filterMoviesByCharacter()}
            onPosterClick={onPosterClick}
          />
        )}
      </>
    );
  }

  // This delays the search while the user is typing. Improves performance with big libraries
  const handleSearch = (searchValue: string) => {
    if (time) clearTimeout(time);
    setTime(
      setTimeout(() => {
        setSearchText(searchValue);
      }, 300)
    );
  };

  return (
    <div>
      <div>
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
          className={styles.searchBar}
          placeholder="Search"
        />
      </div>
      {searchResults}
    </div>
  );
};

export default Search;
