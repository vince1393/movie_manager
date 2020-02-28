import React from "react";
import styles from "./Welcome.module.css";
const { dialog } = window.require("electron").remote;

type Props = {
  onDialogSelect: (reponse: any) => void;
};

const Welcome = (props: Props) => {
  const showDialog = () => {
    const response = dialog.showOpenDialogSync({
      title: "Select the folder you want to scan",
      properties: ["openDirectory"]
    });
    props.onDialogSelect(response ? response[0] : response);
  };
  return (
    <div className={styles.container}>
      <h1>Welcome to The Movie Cave!</h1>
      <h2>To get started, select a folder to scan.</h2>
      <button className={styles.startButton} onClick={showDialog}>
        Select a folder
      </button>
    </div>
  );
};

export default Welcome;
