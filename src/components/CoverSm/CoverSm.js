import React from "react";
import styles from './CoverSm.module.css';
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";


export const CoverSm = ({ title, categories, author, img, description }) => {

  const handleClick = () => {}
  
  return (
    <div className={styles["CoverSm-card"]}>
      <div style={{ backgroundImage: `url(${img})` }} className={styles["CoverSm-img"]}>
      <div className={styles["CoverSm-icon-wrapper"]}>
        <i className="fas fa-play play-icon"></i>
      </div>
      </div>
      <div className={styles["CoverSm-text"]}>
        <Link className={styles["CoverSm-title"]} onClick={handleClick}>{title}</Link>
        <p className={styles["CoverSm-author"]}>{author}</p>
        <p className={styles["CoverSm-category"]}>{categories}</p>
        <p className={styles["CoverSm-description"]}>{description}</p>
      </div>
    </div >
  );
};
