import axios from "axios";
import { Movie } from "../obj/queries";
const omdbApi: string = "http://www.omdbapi.com/";

export const getMovie = async (
  title: string,
  year: string = ""
): Promise<Movie> => {
  const formattedTitle = title.split(" ").join("+");

  return await axios
    .get(
      `${omdbApi}?apikey=${process.env.REACT_APP_API_KEY}&t=${formattedTitle}&y=${year}&plot=full`
    )
    .then(response => response.data);
};
