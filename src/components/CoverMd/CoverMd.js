import React from "react";
import styles from "./CoverMd.module.css";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import AlbumIcon from '@material-ui/icons/Album';
// import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

export const CoverMd = (
  {
    entity,
    path,
    img,
    title,
    categories,
    author,
    description,
    handleAddToFavourites,
    handlePlay,
    handleOpenOptions
  }) => {

  return (
    <div className={styles["CoverMd-wrap"]}>
      <div
        style={{ backgroundImage: `url(${img})` }}
        className={styles["CoverMd-img"]}
      >
        <div className={styles["icon-wrapper"]}>
          {/* 
          <i className="fas fa-ellipsis-h icon-mini" />
          <i className="fas fa-play play-icon"></i>
          <i className="far fa-heart" /> */}
          <MoreHorizRoundedIcon
            fontSize="small"
            // style={{ color: "white" }}
            onClick={() => handleOpenOptions(entity)}
          />
          <div className={styles["PlayButton"]}>
              <PlayCircleFilledIcon
                  fontSize="large"
                  // style={{ color: "red" }}
                  onClick={() => handlePlay(entity._id)}
              />
          </div>
          <FavoriteBorderOutlinedIcon
            fontSize="small"
            // style={{ color: "white" }}
            onClick={() => handleAddToFavourites(entity._id)}
          />
        </div>
      </div>
      <div className={styles["CoverMd-text"]}>
        {/* <Link className={styles["CoverMd-title"]} to={{ pathname: { path }, state: { entity } }}>
          {title}
        </Link> */}
        <h4>{title}</h4>
        <p className={styles["CoverMd-author"]}>{author}</p>
        <p className={styles["CoverMd-category"]}>{categories}</p>
        <p className={styles["CoverMd-description"]}>{description}</p>
      </div>
    </div>
  );
};
