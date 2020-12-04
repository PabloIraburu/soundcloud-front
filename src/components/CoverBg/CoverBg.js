import React from "react";
import styles from "./CoverBg.module.css";
import { Link } from "react-router-dom";

export const CoverBg = ({ title, categories, author, img, description }) => {
  const handleClick = () => {};

  return (
    <div className={styles["CoverBg-wrap"]}>
      <div
        style={{ backgroundImage: `url(${img})` }}
        className={styles["CoverBg-img"]}
      >
        <div className={styles["icon-wrapper"]}>
          <i className="fas fa-ellipsis-h icon-mini" />
          <i className="fas fa-play play-icon"></i>
          <i className="far fa-heart" />
        </div>
      </div>
      <div className={styles["CoverBg-text"]}>
        <Link className={styles["CoverBg-title"]} onClick={handleClick}>
          {title}
        </Link>
        <p className={styles["CoverBg-author"]}>{author}</p>
        <p className={styles["CoverBg-category"]}>{categories}</p>
        <p className={styles["CoverBg-description"]}>{description}</p>
      </div>
    </div>
  );
};
