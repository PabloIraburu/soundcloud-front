import React, { useEffect, useState } from "react";

import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import styles from './SongItem.module.css';
import { Selector } from "../Selector/Selector";
import { ServerRequest } from "../../helpers/ServerRequest";
import { DecodeToken } from "../../utils/DecodeToken";
import { getToken } from "../../utils/LocalStorage.utils";


export const SongItem = ({ song, handleDeleteSong, handleOpenModalEditSong }) => {

    const userId = DecodeToken(getToken()).id;
    const [userAlbums, setUserAlbums] = useState([]);
    const [visible, setVisible] = useState(false);

    const handlePlay = () => { }

    useEffect(() => {
        ServerRequest(`data/album/${userId}`, "GET")
            .then((response) => {
                setUserAlbums(
                    ...userAlbums,
                    response)
            })
            .catch(console.log)
    }, [])

    const handleShowSelector = (song) => {
        setVisible(!visible);
        handleAddToAlbum(song._id)
    }

    const handleAddToAlbum = () => { }

    //Hacer populate tambén para que devuelta todos los álbumes del usuario actualizados?

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
                        // onClick={() => handleAddToAlbum(song)}
                        onClick={() => handleShowSelector(song)}
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
