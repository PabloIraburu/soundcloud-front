import React, { useContext, useState, useEffect } from "react";
import styles from './CoverSm.module.css';
import { Link } from "react-router-dom";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import LibraryMusicOutlinedIcon from '@material-ui/icons/LibraryMusicOutlined';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { PlayerContext } from "../../contexts/PlayerContext/playerContext";
import { playerActions } from "../../reducers/playerReducer";
import { FavContext } from "../../contexts/FavContext/favContext";
import { favActions } from "../../reducers/favouritesReducer";
import { UserContext } from "../../contexts/UserContext/contextProvider";
import { ServerRequest } from "../../helpers/ServerRequest";


export const CoverSm = ({ entity, title, categories, author, img, description, id, index, handleAddToFavourites, handleRemoveFromFavourites, handleAddToPlaylist }) => {

  const { userId } = useContext(UserContext);
  const { player, dispatchPlayer } = useContext(PlayerContext);
  const { dispatchFav } = useContext(FavContext);
  const [isFav, setIsFav] = useState(false);

  // GET FAVOURITE SONGS
  useEffect(() => {
    ServerRequest(`data/favouritesongs/?id_user=${userId}`, "GET")
      .then(response => (
        response.find((fsong) => {
          if (fsong.id_song === id) {
            setIsFav(!isFav);
          }
        })))
      .catch(console.log)
  }, [id]);

  // useEffect(() => {
  //   favourite.favSongs.find((fsong) => {
  //     if (fsong.id_song === id) {
  //       setIsFav(!isFav)
  //     }
  //   })
  // }, [id])


  return (
    <div className={styles["CoverSm-card"]}>
      <div style={{ backgroundImage: `url(${img})` }} className={styles["CoverSm-img"]}>
        <div className={styles["CoverSm-icon-wrapper"]}>
          <PlayCircleFilledIcon
            fontSize="large"
            onClick={() => dispatchPlayer({ type: playerActions.PLAY_THIS_SONG, index })}
          />
        </div>
      </div>
      <div className={styles["CoverSm-text"]}>
        <Link
          className={styles["CoverSm-title"]}
          onClick={() => dispatchPlayer({ type: playerActions.PLAY_THIS_SONG, index })}
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
          onClick={() => dispatchPlayer({ type: playerActions.ADD_TO_QUEUE, song: entity })}
        />

        {
          !isFav && <FavoriteBorderOutlinedIcon
            fontSize="inherit"
            onClick={() => handleAddToFavourites(id)}
          />
        }
        {
          isFav && <FavoriteIcon
            fontSize="inherit"
            style={{ color: '#f9b807' }}
            onClick={() => dispatchFav({ type: favActions.UNFAV_SONG, songId: id })}
          />
        }
      </div>
    </div >
  );
};
