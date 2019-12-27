import path from "path";
import { movieExtensions } from "../obj/constants";
const fs = window.require("fs");

export const getMoviePaths = (rootPath: string): string[] => {
  const moviePathList: string[] = [];

  const fileNames = fs.readdirSync(rootPath);

  fileNames.forEach((fileName: string) => {
    const filePath = path.join(rootPath, fileName);
    try {
      const stat = fs.lstatSync(filePath);
      const fileType = path.extname(fileName);
      if (stat.isDirectory()) {
        const moviePaths = getMoviePaths(filePath);
        moviePathList.push(...moviePaths);
      } else if (movieExtensions.includes(fileType.toLowerCase())) {
        // ToDo - filter out sample files and extra scenes
        moviePathList.push(filePath);
      }
    } catch (e) {
      console.error("folder could not be indexed", filePath);
    }
  });
  return moviePathList;
};
