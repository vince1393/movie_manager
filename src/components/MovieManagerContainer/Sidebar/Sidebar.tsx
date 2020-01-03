import React from "react";
import styles from "./Sidebar.module.css";
import { SortOptions } from "../../../obj/constants";

type Props = {
  isOpen: boolean;
  currentSort: SortOptions;
  handleSortChange: (sort: SortOptions) => void;
  handleMenuClose: () => void;
};

const Sidebar = (props: Props) => {
  const { isOpen, currentSort, handleSortChange, handleMenuClose } = props;

  console.log(isOpen);
  const options = Object.values(SortOptions);

  return (
    <>
      <div className={[styles.sidebar, isOpen ? styles.visible : styles.hidden].join(" ")}>
        <button
          className={[styles.closeButton, isOpen ? styles.visible : styles.hidden].join(" ")}
          onClick={handleMenuClose}
        >
          Close
        </button>
        {options.map(option => {
          return (
            <button
              onClick={() => {
                handleSortChange(SortOptions[option]);
                handleMenuClose();
              }}
              className={[
                styles.sortOptions,
                currentSort === SortOptions[option] ? styles.selected : "",
                isOpen ? styles.visible : styles.hidden
              ].join(" ")}
            >
              {SortOptions[option]}
            </button>
          );
        })}
      </div>
      {isOpen && <div className={styles.backdrop} onClick={handleMenuClose}></div>}
    </>
  );
};

export default Sidebar;
