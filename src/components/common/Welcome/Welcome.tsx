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
      <h2>
        Welcome to *Insert program name here*! To get started, select a folder
        to scan.
      </h2>
      <button className={styles.startButton} onClick={showDialog}>
        Select a folder to scan
      </button>
    </div>
  );
};

export default Welcome;
