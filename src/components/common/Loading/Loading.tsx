import React from "react";
import styles from "./Loading.module.css";

type Props = {
  status: string;
};

const Loading = (props: Props) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadBox}>
        <div className={styles.loader}></div>
        <div className={styles.innerLoader}></div>
        <div className={styles.innerInnerLoader}></div>
      </div>
      <div>{props.status}</div>
    </div>
  );
};

export default Loading;
