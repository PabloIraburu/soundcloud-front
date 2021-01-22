import React from "react";
import styles from "./CoverBg.module.css";
import { Link } from "react-router-dom";

export const CoverBg = ({ title, categories, author, img, description, entityType }) => {
  const handleClick = () => {};

  return (
    <div className={styles["CoverBg-wrap"]}>
      <div
        style={{ backgroundImage: `url(${img})` }}
        className={styles["CoverBg-img"]}
      >
      </div>
      <div className={styles["CoverBg-text"]}>
        <h6>{entityType}</h6>
        <h1 className={styles["CoverBg-title"]}>{title}</h1>
        <p className={styles["CoverBg-author"]}>{author}</p>
        <p className={styles["CoverBg-category"]}>{categories}</p>
        <p className={styles["CoverBg-description"]}>{description}</p>
      </div>
    </div>
  );
};
