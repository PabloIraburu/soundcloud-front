import React from "react";
import styles from "./CoverMd.module.css";
import { Link } from "react-router-dom";

export const CoverMd = ({ title, categories, author, img, description }) => {
  const handleClick = () => {};

  return (
    <div className={styles["CoverMd-wrap"]}>
      <div
        style={{ backgroundImage: `url(${img})` }}
        className={styles["CoverMd-img"]}
      >
        <div className={styles["icon-wrapper"]}>
          <i className="fas fa-ellipsis-h icon-mini" />
          <i className="fas fa-play play-icon"></i>
          <i className="far fa-heart" />
        </div>
      </div>
      <div className={styles["CoverMd-text"]}>
        <Link className={styles["CoverMd-title"]} onClick={handleClick}>
          {title}
        </Link>
        <p className={styles["CoverMd-author"]}>{author}</p>
        <p className={styles["CoverMd-category"]}>{categories}</p>
        <p className={styles["CoverMd-description"]}>{description}</p>
      </div>
    </div>
  );
};
