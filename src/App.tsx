import React, { useState } from "react";
import styles from "./App.module.css";

import MovieManagerContainer from "./components/MovieManagerContainer/MovieManagerContainer";
import Welcome from "./components/common/Welcome/Welcome";

const App: React.FC = () => {
  const [rootFolder, setRootFolder] = useState<string | undefined>();

  return (
    <div className={styles.container}>
      {rootFolder ? (
        <MovieManagerContainer path={rootFolder} />
      ) : (
        <Welcome onDialogSelect={setRootFolder} />
      )}
    </div>
  );
};

export default App;
