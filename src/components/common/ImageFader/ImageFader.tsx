import React, { useState } from "react";
import styles from "./ImageFader.module.css";

type Props = {
  images: string[];
};

const ImageFader = (props: Props) => {
  const reset = 0;
  const [currentImageIndex, setCurrentImageIndex] = useState(reset);
  const { images } = props;

  setTimeout(() => {
    setCurrentImageIndex(current => (current <= images.length ? ++current : reset));
  }, 4000);

  return (
    <div className={styles.container}>
      {images.map((image, index) => {
        return (
          <img
            src={image}
            className={[
              styles.imageFaderImage,
              currentImageIndex === index ? styles.show : styles.hide
            ].join(" ")}
          />
        );
      })}
    </div>
  );
};

export default ImageFader;
