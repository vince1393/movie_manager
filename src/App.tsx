import React, { useEffect, useState } from "react";
import "./App.css";

import axios from "axios";

import MovieManagerContainer from "./components/MovieManagerContainer/MovieManagerContainer";
const { dialog } = window.require("electron").remote;
const path = window.require("path");

const omdbApi: string = "http://www.omdbapi.com/";

const getMovie = async (title: string, year: string = "") => {
  const formattedTitle = title.split(" ").join("+");

  return await axios
    .get(
      `${omdbApi}?apikey=${process.env.REACT_APP_API_KEY}&t=${formattedTitle}&y=${year}&plot=full`
    )
    .then(response => response.data);
};

const App: React.FC = () => {
  const [rootFolder, setRootFolder] = useState<string | undefined>(undefined);

  const showDialog = () => {
    const response = dialog.showOpenDialogSync({
      title: "Select the folder you want to scan",
      properties: ["openDirectory"]
    });
    setRootFolder(response ? response[0] : response);
  };

  return rootFolder ? (
    <MovieManagerContainer path={rootFolder}></MovieManagerContainer>
  ) : (
    <button onClick={showDialog}>Click here to select a folder to scan</button>
  );
};

export default App;
