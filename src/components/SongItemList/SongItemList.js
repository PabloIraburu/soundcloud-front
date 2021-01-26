import React from "react";

// import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
// import AddCircleIcon from "@material-ui/icons/AddCircle";
// import EditIcon from "@material-ui/icons/Edit";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import styles from './SongItemList.module.css';


export const SongItemList = ({ song, handleAddRemove, handleAddFavSong }) => {

    const handlePlay = () => { }

    return (
        <div className={styles["SongItemList-card"]}>
            <div style={{ backgroundImage: `url(${song.image})` }} className={styles["SongItemList-img"]}>
                <div className={styles["SongItemList-icon-wrapper"]}>
                    <PlayCircleFilledIcon
                        fontSize="small"
                        // style={{ color: "white" }}
                        onClick={() => handlePlay(song)}
                    />
                </div>
            </div>
            <div className={styles["SongItemList-text"]}>
                <p className={styles["SongItemList-title"]}>{song.title}</p>
                <p>{song.artist}</p>
                <p>{song.album}</p>
                <p>{song.category}</p>
                <div className={styles["SongItemList-icons"]}>

                    <LibraryMusicIcon
                        fontSize="small"
                        style={{ color: "white" }}
                        onClick={() => handleAddRemove(song)}
                    />

                    <FavoriteBorderOutlinedIcon
                        fontSize="small"
                        //   style={{ color: "white", opacity: "50%" }}
                        style={{ color: "white" }}
                        onClick={() => handleAddFavSong(song)}
                    />
                </div>
            </div>
        </div >
    );
};
