import React from "react";
import styles from "./MyButton.module.css";

export const MyButton = ({ onClick, variant, size, children }) => {
  return (
    <button
      onClick={onClick}
      className={styles[variant]}
      style={{ width: size }}
    >
      {children}
    </button>
  );
};
