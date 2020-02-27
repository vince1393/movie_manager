import React from "react";
import styles from "./Loading.module.css";

type Props = {
  status: string;
  size?: number;
};

const Loading = (props: Props) => {
  const { size = 100, status } = props;

  const numberOfDivs = 50;
  const borderThickness = size / numberOfDivs;

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadBox} style={{ width: size + "px", height: size + 20 + "px" }}>
        {[...Array(numberOfDivs)].map((_, index) => {
          return (
            <div
              style={{
                width: `${size - index * borderThickness}px`,
                height: `${size - index * borderThickness}px`,
                left: (borderThickness / 2) * index + "px",
                top: (borderThickness / 2) * index + "px",
                animationDelay: 0 - index / numberOfDivs + "s"
              }}
            ></div>
          );
        })}
      </div>
      <div className={styles.status}>{status}</div>
    </div>
  );
};

export default Loading;
