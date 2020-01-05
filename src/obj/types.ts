import { BelongsToCollection } from "./queries";

export type Movie = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string[];
  Director: string[];
  Writer: string[];
  Actors: Actor[];
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster?: string;
  Backdrop?: string[];
  imdbID: string;
  BoxOffice: string;
  Production: string[];
  Website: string;
  Path?: string;
  BelongsToCollection?: BelongsToCollection;
  trailerKey: string;
  mpaaRating?: string;
};

export type Actor = {
  name: string;
  character: string;
};
