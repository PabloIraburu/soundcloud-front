import React from "react";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditIcon from "@material-ui/icons/Edit";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import styles from './SongItem.module.css';

export const SongItem = ({ song, handleDeleteSong, handleOpenModalEditSong }) => {

    const handlePlay = () => { }

    const options = { month: "2-digit", day: "2-digit", year: "numeric" };

    return (
        <>
        <div className={styles["SongItem-card"]}>
            <div style={{ backgroundImage: `url(${song.image})` }} className={styles["SongItem-img"]}>
                <div className={styles["SongItem-icon-wrapper"]}>
                    <PlayCircleFilledIcon
                        fontSize="small"
                        onClick={() => handlePlay(song)}
                    />
                </div>
            </div>
            <div className={styles["SongItem-text"]}>
                <p className={styles["SongItem-title"]}>{song.title}</p>
                <p>{song.artist}</p>
                <p>{song.album}</p>
                <p>{song.category}</p>
                <p>{new Date(song.createdAt).toLocaleString("es-ES", options)}</p>

                <div className={styles["SongItem-icons"]}>
                    <EditIcon
                        fontSize="small"
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
        <hr className={styles["SongItem-hr"]}/>
        </>
    );
};
