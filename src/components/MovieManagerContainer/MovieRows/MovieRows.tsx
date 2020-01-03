import React from "react";
import { Movie, BelongsToCollection } from "../../../obj/queries";
import Poster from "../../common/Poster/Poster";
import MovieRow from "./MovieRow/MovieRow";
import { SortOptions } from "../../../obj/constants";
import CollectionRow from "./CollectionRow/CollectionRow";

type Props = {
  movies: Movie[];
  sortOption: SortOptions;
  onPosterClick: (movie: Movie) => void;
};

const MovieRows = (props: Props) => {
  const { sortOption, movies, onPosterClick } = props;
  console.log(" OPTION", sortOption);

  let movieRows: JSX.Element[] = [];

  const createRowsByGenre = (): JSX.Element[] => {
    const allGenres: string[] = movies
      .map(movie => movie.Genre)
      .join()
      .split(","); // flattens out array -> [ [.], [.] ,[.] ] to [...]
    const uniqueGenres: string[] = [...new Set(allGenres)];
    return uniqueGenres
      .sort()
      .map(genre => (
        <MovieRow
          genre={genre}
          movies={movies.filter(movie => movie.Genre.includes(genre))}
          onPosterClick={onPosterClick}
        />
      ));
  };

  const createRowsByAlpha = (): JSX.Element[] => {
    const allAlpha: string[] = movies
      .map(movie => movie.Title.split("")[0].toUpperCase())
      .join()
      .split(","); // flattens out array -> [ [.], [.] ,[.] ] to [...]
    const uniqueAlpha: string[] = [...new Set(allAlpha)];
    return uniqueAlpha
      .sort()
      .map(char => (
        <MovieRow
          genre={char}
          movies={movies.filter(movie => movie.Title.split("")[0].toUpperCase() === char)}
          onPosterClick={onPosterClick}
        />
      ));
  };

  const createRowsByAll = (): JSX.Element[] => [
    <MovieRow genre={"All"} movies={movies} onPosterClick={onPosterClick} isMultiRow={true} />
  ];

  const createRowsBySeries = () => {
    const allCollections: BelongsToCollection[] = movies
      .filter(movie => movie.BelongsToCollection)
      .map(movie => movie.BelongsToCollection) as BelongsToCollection[];
    return [
      <CollectionRow movies={movies} collections={allCollections} onPosterClick={onPosterClick} />
    ];
  };

  switch (sortOption) {
    case SortOptions.Genre:
      movieRows = createRowsByGenre();
      break;

    case SortOptions.Alphabetical:
      movieRows = createRowsByAlpha();
      break;

    case SortOptions.All:
      movieRows = createRowsByAll();
      break;

    case SortOptions.Series:
      movieRows = createRowsBySeries();
      break;
  }

  return <>{movieRows}</>;
};

export default MovieRows;
