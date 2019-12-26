import React, { useEffect, useState } from "react";
import styles from "./App.module.css";

import MovieManagerContainer from "./components/MovieManagerContainer/MovieManagerContainer";
import Welcome from "./components/common/Welcome/Welcome";
const path = window.require("path");

const App: React.FC = () => {
  const [rootFolder, setRootFolder] = useState<string | undefined>();

  return (
    <div className={styles.container}>
      {rootFolder ? (
        <MovieManagerContainer path={rootFolder}></MovieManagerContainer>
      ) : (
        <Welcome onDialogSelect={setRootFolder} />
      )}
    </div>
  );
};

export default App;
