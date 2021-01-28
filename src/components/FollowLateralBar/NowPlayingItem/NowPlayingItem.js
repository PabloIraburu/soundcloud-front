import React  from "react";

import styles from './NowPlayingItem.module.css';

export const NowPlayingItem = ({ entity, title, categories, author, img, description, id, index, handleAddToFavourites, handleRemoveFromFavourites, handleAddToPlaylist }) => {


    return (
        <div className={styles["UserCardFollowMenu-wrap"]}>
            <div style={{ backgroundImage: `url(${img})` }} className={styles["UserCardFollowMenu-img"]}></div>
            <div className={styles["UserCardFollowMenu-info"]}>
                <div className={styles["UserCardFollowMenu-userName"]}>
                    <p>{title}</p>
                </div>
            </div>

        </div >
    );
};