import React, { useState } from "react";
import { BelongsToCollection } from "../../../../obj/queries";
import Poster from "../../../common/Poster/Poster";
import styles from "./CollectionRow.module.css";
import { Movie } from "../../../../obj/types";

type Props = {
  movies: Movie[];
  collections: BelongsToCollection[];
  onPosterClick: (movie: Movie) => void;
};

const CollectionRow = (props: Props) => {
  const { onPosterClick, collections, movies } = props;

  const collectionIds: number[] = collections.map(collection => collection.id);
  const filteredCollectionIds: number[] = [...new Set(collectionIds)];
  const filteredCollections: BelongsToCollection[] = filteredCollectionIds.map(
    id => collections.filter(collection => collection.id === id)[0]
  );

  const [collectionMovies, setcollectionMovies] = useState<Movie[] | undefined>(undefined);

  return (
    <div>
      <h2 className={styles.rowHeader}>Collections</h2>
      <div className={styles.rowContainer}>
        {filteredCollections.map(collection => {
          return (
            <Poster
              title={collection.name}
              posterUrl={collection.poster_path}
              onClick={() =>
                setcollectionMovies(
                  movies.filter(movie => movie.BelongsToCollection?.id === collection.id)
                )
              }
              onKeyDown={e =>
                e.key === "Enter" &&
                setcollectionMovies(
                  movies.filter(movie => movie.BelongsToCollection?.id === collection.id)
                )
              }
            />
          );
        })}
      </div>
      {collectionMovies && (
        <div>
          {collectionMovies
            .sort((firstMovie, secondMovie) => (firstMovie.Year > secondMovie.Year ? 1 : -1))
            .map(movie => (
              <Poster
                title={movie.Title}
                posterUrl={movie.Poster}
                onClick={() => onPosterClick(movie)}
                onKeyDown={e => e.key === "Enter" && onPosterClick(movie)}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default CollectionRow;
