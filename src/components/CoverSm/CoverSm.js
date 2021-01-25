import React from "react";
import styles from './CoverSm.module.css';
import { Link, useHistory } from "react-router-dom";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import LibraryMusicOutlinedIcon from '@material-ui/icons/LibraryMusicOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';



export const CoverSm = ({ entity, title, categories, author, img, description, id, handleAddToFavourites, handleRemoveFromFavourites, handlePlay }) => {

  const handleClick = () => { }

  return (
    <div className={styles["CoverSm-card"]}>
      <div style={{ backgroundImage: `url(${img})` }} className={styles["CoverSm-img"]}>
        <div className={styles["CoverSm-icon-wrapper"]}>
          <PlayCircleFilledIcon
            fontSize="large"
            // style={{ color: "white" }}
            onClick={() => handlePlay(entity._id)}
          />
        </div>
      </div>
      <div className={styles["CoverSm-text"]}>
        <Link className={styles["CoverSm-title"]} onClick={handleClick}>{title}</Link>
        <p className={styles["CoverSm-author"]}>{author}</p>
        <p className={styles["CoverSm-category"]}>{categories}</p>
        <p className={styles["CoverSm-description"]}>{description}</p>
      </div>
      <div className={styles["CoverSm-button-options"]}>
          <LibraryMusicOutlinedIcon
            fontSize="inherit"
            onClick={() => handlePlay(id)}
          />
          <PlaylistAddIcon
            fontSize="inherit"
            onClick={() => handlePlay(id)}
          />
          <FavoriteBorderOutlinedIcon
            fontSize="inherit"
            onClick={() => handleAddToFavourites(id)}
          />
      </div>
    </div >
  );
};
