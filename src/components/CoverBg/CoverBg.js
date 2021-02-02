import React, { useContext } from "react";
import { MyButton } from '../MyButton/MyButton';
import styles from "./CoverBg.module.css";
import { ServerRequest } from "../../helpers/ServerRequest";
import { playerActions } from "../../reducers/playerReducer";
import { PlayerContext } from "../../contexts/PlayerContext/playerContext";

export const CoverBg = ({ title, categories, author, img, description, entityType, created, id }) => {

  const { dispatchPlayer } = useContext(PlayerContext);

  //PLAY PLAYLIST
  const handlePlayPlaylist = (playlistId) => {
    ServerRequest(`data/songsinplaylist/?id_playlist=${playlistId}`, "GET")
      .then(payload => { dispatchPlayer({ type: playerActions.START_PLAY, songs: payload.map(playlist => playlist.id_song) }) })
      .catch(console.log)
  };
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
        <p className={styles["CoverBg-description"]}>{description}</p>
        <p className={styles["CoverBg-category"]}>
          {new Date(created).toLocaleString("es-ES", options)}   |   12 songs
        </p>
        <div className={styles["CoverBg-reproduceButton"]}>
          <MyButton
            onClick={() => handlePlayPlaylist(id)}
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
