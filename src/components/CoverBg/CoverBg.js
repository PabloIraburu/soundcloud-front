import React from "react";
import { MyButton } from '../MyButton/MyButton';
import styles from "./CoverBg.module.css";

export const CoverBg = ({ title, categories, author, img, description, entityType, created, id }) => {

  const options = { month: "2-digit", day: "2-digit", year: "numeric" };

  return (
    <div className={styles["CoverBg-wrap"]}>
      <div
        style={{ backgroundImage: `url(${img})` }}
        className={styles["CoverBg-img"]}
      >
      </div>
      <div className={styles["CoverBg-text"]}>
        <h6>PLAYLIST</h6>
        <h1 className={styles["CoverBg-title"]}>{title}</h1>
        <p className={styles["CoverBg-author"]}>{author}</p>
        <p className={styles["CoverBg-category"]}>{categories}</p>
        <p className={styles["CoverBg-category"]}>{id}</p>
        <p className={styles["CoverBg-description"]}>{description}</p>
        <p className={styles["CoverBg-category"]}>
          {new Date(created).toLocaleString("es-ES", options)}   |   12 songs
        </p>
        <div className={styles["CoverBg-reproduceButton"]}>
          <MyButton
            // onClick={}
            variant="blue-sky"
            size="150px"
          >
            REPRODUCE
          </MyButton>
        </div>
      </div>
    </div>
  );
};
