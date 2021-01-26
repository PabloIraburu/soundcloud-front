import React, { useContext } from "react";
import styles from './CoverSm.module.css';
import { Link } from "react-router-dom";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
// import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import LibraryMusicOutlinedIcon from '@material-ui/icons/LibraryMusicOutlined';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { PlayerContext } from "../../contexts/PlayerContext/playerContext";
import { playerActions } from "../../reducers/playerReducer";



export const CoverSm = ({ entity, title, categories, author, img, description, id, index, handleAddToFavourites, handleRemoveFromFavourites, handleAddToPlaylist }) => {

  const { /*state,*/ dispatch } = useContext(PlayerContext);

  return (
    <div className={styles["CoverSm-card"]}>
      <div style={{ backgroundImage: `url(${img})` }} className={styles["CoverSm-img"]}>
        <div className={styles["CoverSm-icon-wrapper"]}>
          <PlayCircleFilledIcon
            fontSize="large"
            onClick={() => dispatch({ type: playerActions.PLAY_THIS_SONG, index })}
          />
        </div>
      </div>
      <div className={styles["CoverSm-text"]}>
        <Link
          className={styles["CoverSm-title"]}
          onClick={() => dispatch({ type: playerActions.PLAY_THIS_SONG, index })}
        >
          {title}
        </Link>
        <p className={styles["CoverSm-author"]}>{author}</p>
        <p className={styles["CoverSm-category"]}>{categories}</p>
        <p className={styles["CoverSm-description"]}>{description}</p>
      </div>
      <div className={styles["CoverSm-button-options"]}>
        <LibraryMusicOutlinedIcon
          fontSize="inherit"
          onClick={() => handleAddToPlaylist(id)}
        />
        <PlaylistAddIcon
          fontSize="inherit"
          onClick={() => dispatch({ type: playerActions.ADD_TO_QUEUE, song: entity })}
        />
        <FavoriteBorderOutlinedIcon
          fontSize="inherit"
          onClick={() => handleAddToFavourites(id)}
        />
      </div>
    </div >
  );
};
