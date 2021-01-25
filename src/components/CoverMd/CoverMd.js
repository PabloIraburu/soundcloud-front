import React from "react";
import styles from "./CoverMd.module.css";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
// import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded';
// import AlbumIcon from '@material-ui/icons/Album';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

export const CoverMd = (
  {
    entity,
    id,
    img,
    title,
    categories,
    author,
    description,
    entityType,
    handleAddToFavourites,
    handleRemoveFromFavourites,
    handlePlay,
    handleOpenOptions,
    isFav
  }) => {

  return (
    <div className={styles["CoverMd-wrap"]}>
      <div
        style={{ backgroundImage: `url(${img})` }}
        className={styles["CoverMd-img"]}
      >
        <div className={styles["icon-wrapper"]}>
          <MoreHorizRoundedIcon
            fontSize="small"
            onClick={() => handleOpenOptions(entity)}
          />
          <div className={styles["PlayButton"]}>
            <PlayCircleFilledIcon
                fontSize="large"
                onClick={() => handlePlay(entity._id)}
            />
          </div>
          
          <FavoriteBorderOutlinedIcon
            fontSize="small"
            onClick={() => handleAddToFavourites(id)}
          />
          {/* {isFav && <FavoriteOutlinedIcon
            fontSize="small"
            onClick={() => handleRemoveFromFavourites(id)}
          />} */}

        </div>
      </div>
      <div className={styles["CoverMd-text"]}>
        <Link className={styles["CoverMd-title"]} to={{ pathname: `/${entityType}/${id}`, state: id }}>
        {/* <Link className={styles["CoverMd-title"]} to={{ pathname: `/${entityType}/${id}`, state: { entity } }}>*/}
          {title}
        </Link>
        <p className={styles["CoverMd-author"]}>{author}</p>
        <p className={styles["CoverMd-category"]}>{categories}</p>
        <p className={styles["CoverMd-description"]}>{description}</p>
      </div>
    </div>
  );
};
