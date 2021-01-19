import React from "react";
import styles from "./CoverMd.module.css";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
// import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

export const CoverMd = ({ entity, categories, author, description, handleAddToFavourites, handlePlay, handleOpenOptions }) => {

  return (
    <div className={styles["CoverMd-wrap"]}>
      <div
        style={{ backgroundImage: `url(${entity.image})` }}
        className={styles["CoverMd-img"]}
      >
        <div className={styles["icon-wrapper"]}>
          
          <i className="fas fa-ellipsis-h icon-mini" />
          <i className="fas fa-play play-icon"></i>
          <i className="far fa-heart" />
          <MoreHorizRoundedIcon
              fontSize="small"
              style={{ color: "white" }}
              onClick={() => handleOpenOptions(entity._id)}
          />
          <PlayCircleOutlineRoundedIcon
              fontSize="small"
              style={{ color: "white" }}
              onClick={() => handlePlay(entity._id)}
          />
          <FavoriteBorderOutlinedIcon
              fontSize="small"
              style={{ color: "white" }}
              onClick={() => handleAddToFavourites(entity._id)}
          />
        </div>
      </div>
      <div className={styles["CoverMd-text"]}>
        <Link className={styles["CoverMd-title"]}>
          {entity.title}
        </Link>
        <p className={styles["CoverMd-author"]}>{author}</p>
        <p className={styles["CoverMd-category"]}>{categories}</p>
        <p className={styles["CoverMd-description"]}>{description}</p>
      </div>
    </div>
  );
};
