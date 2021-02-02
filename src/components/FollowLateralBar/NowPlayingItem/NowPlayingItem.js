import React, { useContext } from "react";
import { PlayerContext } from "../../../contexts/PlayerContext/playerContext";
import { playerActions } from "../../../reducers/playerReducer";

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import styles from './NowPlayingItem.module.css';

export const NowPlayingItem = ({ entity, title, categories, author, img, description, id, index, handleAddToFavourites, handleRemoveFromFavourites, handleAddToPlaylist }) => {

    const { dispatchPlayer } = useContext(PlayerContext);

    return (
        <div className={styles["NowPlayingItemFollowMenu-wrap"]}>
            <div style={{ backgroundImage: `url(${img})` }} className={styles["NowPlayingItemFollowMenu-img"]}></div>
            <div className={styles["NowPlayingItemFollowMenu-info"]}>
                <div className={styles["NowPlayingItemFollowMenu-userName"]}>
                    <p className={styles["NowPlayingItemFollowMenu-title"]}>{title}</p>
                    <p className={styles["NowPlayingItemFollowMenu-author"]}>{author}</p>
                </div>
            </div>

            <HighlightOffIcon
                fontSize="inherit"
                onClick={() => dispatchPlayer({ type: playerActions.REMOVE_FROM_QUEUE, songId: id })}
            />
        </div >
    );
};