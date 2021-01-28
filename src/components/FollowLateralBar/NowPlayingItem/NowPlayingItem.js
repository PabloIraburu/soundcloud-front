import React from "react";
import MoreVertIcon from '@material-ui/icons/MoreVert';

import styles from './NowPlayingItem.module.css';

export const NowPlayingItem = ({ entity, title, categories, author, img, description, id, index, handleAddToFavourites, handleRemoveFromFavourites, handleAddToPlaylist }) => {


    return (
        <div className={styles["NowPlayingItemFollowMenu-wrap"]}>
            <div style={{ backgroundImage: `url(${img})` }} className={styles["NowPlayingItemFollowMenu-img"]}></div>
            <div className={styles["NowPlayingItemFollowMenu-info"]}>
                <div className={styles["NowPlayingItemFollowMenu-userName"]}>
                    <p className={styles["NowPlayingItemFollowMenu-title"]}>{title}</p>
                    <p className={styles["NowPlayingItemFollowMenu-author"]}>{author}</p>
                </div>
            </div>
            <MoreVertIcon fontSize="inherit" />
        </div >
    );
};