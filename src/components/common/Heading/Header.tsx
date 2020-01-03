import React from "react";
import styles from "./Header.module.css";

type Props = {
  handleMenuClick: () => void;
};
const Header = (props: Props) => {
  const { handleMenuClick } = props;
  return (
    <div className={styles.header}>
      <button onClick={handleMenuClick} className={styles.menuButton}>
        ☰
      </button>
    </div>
  );
};

export default Header;
