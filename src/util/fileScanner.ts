import path from "path";
import { movieExtensions } from "../obj/constants";
const fs = window.require("fs");

export const getMovieFiles = (rootPath: string) => {
  const moviePathList: string[] = [];

  const fileNames = fs.readdirSync(rootPath);

  fileNames.forEach((fileName: string) => {
    const filePath = path.join(rootPath, fileName);
    const stat = fs.lstatSync(filePath);
    const fileType = path.extname(fileName);
    if (stat.isDirectory()) {
      const moviePaths = getMovieFiles(filePath);
      moviePathList.push(...moviePaths);
    } else if (movieExtensions.includes(fileType.toLowerCase())) {
      moviePathList.push(filePath);
    }
  });
  return moviePathList;
};
