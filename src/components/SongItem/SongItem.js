import React from "react";

import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import styles from './SongItem.module.css';


export const SongItem = ({ song, handleAddToAlbum, handleDeleteSong, handleOpenModalEditSong }) => {

    const handlePlay = () => {}
    
    return (
        <div className={styles["SongItem-card"]}>
            <div style={{ backgroundImage: `url(${song.image})` }} className={styles["SongItem-img"]}>
                <div className={styles["SongItem-icon-wrapper"]}>
                    <PlayCircleFilledIcon
                      fontSize="small"
                      // style={{ color: "white" }}
                      onClick={() => handlePlay(song)}
                    />
                </div>
            </div>
            <div className={styles["SongItem-text"]}>
                <p className={styles["SongItem-title"]}>{song.title}</p>
                <p>{song.artist}</p>
                <p>{song.category}</p>
                <div className={styles["SongItem-icons"]}>
                    <AddCircleIcon
                        fontSize="small"
                        style={{ color: "white" }}
                        onClick={() => handleAddToAlbum(song)}
                    />

                    <EditIcon
                        fontSize="small"
                        //   style={{ color: "white", opacity: "50%" }}
                        style={{ color: "white" }}
                        onClick={() => handleOpenModalEditSong(song)}
                    />
                    <DeleteOutlineOutlinedIcon
                        fontSize="small"
                        style={{ color: "white" }}
                        onClick={() => handleDeleteSong(song)}
                    />
                </div>
            </div>
        </div >
    );
};
