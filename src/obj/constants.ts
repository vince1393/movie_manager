export const movieExtensions = [
  ".avi",
  ".wmv",
  ".mp4",
  ".m4p",
  ".m4v",
  ".mpg",
  ".mpeg",
  ".mp2",
  ".mpeg",
  ".mpe",
  ".mov",
  ".qt",
  ".mkv",
  ".vob",
  ".MTS",
  ".rm",
  ".rmvb",
  ".amv",
  ".rm",
  ".rmvb"
];

export interface Rating {
  Source: string;
  Value: string;
}

export enum selectedMovieKeys {
  //"Title",
  //"Year",
  "Rated",
  "Released",
  "Runtime",
  "Genre",
  "Director",
  "Writer",
  "Actors",
  "Plot",
  "Language",
  "Country",
  "Awards",
  "Poster",
  "Ratings",
  //"Metascore",
  "imdbRating",
  //"imdbVotes",
  //"imdbID",
  //"Type",
  //"DVD",
  "BoxOffice",
  "Production",
  "Website"
}
