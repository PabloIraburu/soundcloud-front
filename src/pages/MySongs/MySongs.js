import React, { useState, useEffect, useContext } from 'react';
import { ServerRequest } from "../../helpers/ServerRequest";
import { MyButton } from "../../components/MyButton/MyButton";
import { UserContext } from '../../contexts/UserContext/contextProvider';
import { Modal } from '../../components/Modal/Modal';
import { SongItem } from '../../components/SongItem/SongItem';
import { Input } from '../../components/Input/Input';
import { Selector } from "../../components/Selector/Selector";
import { categories } from "../../data/categories";
import { Upload } from '../../components/Upload/Upload';
import EventIcon from '@material-ui/icons/Event';
import styles from "./MySongs.module.css";


export const MySongs = () => {
    const { userId } = useContext(UserContext);
    const [userSongs, setUserSongs] = useState([]);
    const [editedSong, setEditedSong] = useState({});
    const [forceReload, setForceReload] = useState(false);

    //Canciones subidas por el usuario
    useEffect(() => {
        ServerRequest(`data/song/?id_author=${userId}`, "GET")
            .then((response) => {
                setUserSongs(response);
            })
            .catch(console.log);
    }, [userId, forceReload]);

    //Introduce los datos de los inputs en el objeto song
    const handleInput = (event) => {
        const { value, name } = event.target;
        setEditedSong((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };


    //Gestión modal upload
    const [openModalUpload, setOpenModalUpload] = useState(false);
    const handleOpenUpload = () => setOpenModalUpload(!openModalUpload);
    const handleCloseUpload = (e) => {
        const { className: el } = e.target;
        if (el !== "backdrop" && el !== "fas fa-times") return;
        setOpenModalUpload(!openModalUpload);
    };

    // Gestiona el modal editar song
    const [openModalEditSong, setOpenModalEditSong] = useState(false);
    const handleOpenModalEditSong = (s) => {
        setEditedSong(s)
        setOpenModalEditSong(!openModalEditSong);
    };
    const handleCloseEditSong = (e) => {
        const { className: el } = e.target;
        if (el !== 'backdrop' && el !== 'fas fa-times') return;
        setOpenModalEditSong(!openModalEditSong);
    }

    //Añadir canción a playlist
    const handleAddToPlaylist = (songId, playlistId) => {
        ServerRequest(`data/playlist/${playlistId}`, 'PUT', songId)
            .then(console.log)
            .catch(console.log);
    }

    //Edición información canciones
    const handleEditSong = () => {
        ServerRequest(`data/song/${editedSong._id}`, "PUT", editedSong)
            .then((response) => {
                setEditedSong(response);
                setForceReload(!forceReload)
            })
            .catch((response) => console.log);

        setOpenModalEditSong(!openModalEditSong);
    }

    //Eliminación canción
    const handleDeleteSong = (song) => {
        ServerRequest(`data/song/${song._id}`, "DELETE")
            .then((res) => {
            })
            .catch(()=> {
                setForceReload(!forceReload)
            }
        );
    }

    return (

        <>
            <div className={styles["mysongs-header"]}>
                <h1>My Songs</h1>
                <MyButton onClick={handleOpenUpload} variant="pink-or" size="150px">Upload Song</MyButton>
                
            </div>
            <div className={styles["mysongs-list"]}>
                <div className={styles["mysongs-img"]}></div>
                <div className={styles["mysongs-text"]}>
                    <p className={styles["mysongs-title"]}>Song Title</p>
                    <p>Artist</p>
                    <p>Album</p>
                    <p>Category</p>
                    <p><EventIcon fontSize="small" style={{ color: "white" }} /></p>
                    <div className={styles["mysongs-icons"]}></div>
                </div>
            </div >
            <hr className={styles["mysong-hr"]}/>
            
            {
                userSongs.length === 0
                    ? <p>You haven't upload any songs yet...</p>
                    : userSongs.map(song => (
                        <SongItem
                            key={song._id}
                            handleAddToPlaylist={handleAddToPlaylist}
                            handleDeleteSong={() => handleDeleteSong(song)}
                            handleOpenModalEditSong={() => handleOpenModalEditSong(song)}
                            song={song}
                        />
                    ))
            }

            {openModalEditSong &&
                <Modal handleClose={handleCloseEditSong}>
                    <div>
                        <h1 className="title">Update song information</h1>
                        <Input
                            type="text"
                            name={"title"}
                            onChange={handleInput}
                            placeholder={"Song title"}
                            value={editedSong.title}
                            required
                        />
                        <Input
                            type="text"
                            name="Album"
                            onChange={handleInput}
                            placeholder={"Insert album name"}
                            value={editedSong.album}
                        />
                        <Input
                            type="text"
                            name="artist"
                            onChange={handleInput}
                            placeholder={"Artist name"}
                            value={editedSong.artist}
                            required
                        />
                        <Input
                            type="text"
                            name="image"
                            onChange={handleInput}
                            placeholder={"Url song image"}
                            value={editedSong.image}
                            required
                        />
                        <Selector name="category" id="category" onChange={handleInput} required>
                            {categories.map((category) => (
                                <option value={category} key={category}>
                                    {category}
                                </option>
                            ))}
                        </Selector>
                        <div className={styles["mysongs-buttons"]}>
                            {/* <MyButton
                                onClick={handleDeleteSong}
                                variant="darkBlue"
                                size="50%"
                                className="button-custom"
                            >
                                Delete file
                            </MyButton> */}
                            <MyButton
                                onClick={handleEditSong}
                                variant="pink-or"
                                size="50%"
                                className="button-custom"
                            >
                                Update file
                            </MyButton>
                        </div>
                    </div>

                    <br />
                    {/* {(newPass !== editedUser.password) ? <p className="flag-pass">*Passwords doesn't match</p> : <MyButton onClick={handleSubmitPassword} variant="pink-or" size="50%">Submit</MyButton>} */}
                </Modal>
            }
            {openModalUpload && (
                <Modal handleClose={handleCloseUpload}>
                    <Upload />
                </Modal>
            )}
        </>
    )
}
