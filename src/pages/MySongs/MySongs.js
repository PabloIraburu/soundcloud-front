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
import { toast } from "react-toastify";


export const MySongs = () => {

    const { userId } = useContext(UserContext);
    const [userSongs, setUserSongs] = useState([]);
    const [editedSong, setEditedSong] = useState({});
    const [forceReload, setForceReload] = useState(false);
    const notify = (e) => toast(`${e}`);

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
    const handleOpenUpload = (e) => {
        setOpenModalUpload(!openModalUpload)
        setForceReload(!forceReload)
    };
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
            .then(notify('Song added to playlist correctly'))
            .catch((response) => notify(response.error));
    }

    //Edición información canciones
    const handleEditSong = () => {
        ServerRequest(`data/song/${editedSong._id}`, "PUT", editedSong)
            .then((response) => {
                setEditedSong(response);
                notify('Song edited correctly')
                setForceReload(!forceReload)
            })
            .catch((response) => notify(response.error));
        setOpenModalEditSong(!openModalEditSong);
    }

    //Eliminación canción
    const handleDeleteSong = (song) => {
        ServerRequest(`data/song/${song._id}`, "DELETE")
            .then(console.log)
            .catch(() => {
                notify('Song deleted correctly')
                setForceReload(!forceReload)
            });
    }

    return (

        <div className={styles["mysongs-wrap"]}>
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
            <hr className={styles["mysong-hr"]} />

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
                            placeholder={editedSong.title}
                            required
                        />
                        <Input
                            type="text"
                            name="Album"
                            onChange={handleInput}
                            placeholder={editedSong.album}
                        />
                        <Input
                            type="text"
                            name="artist"
                            onChange={handleInput}
                            placeholder={editedSong.artist}
                            required
                        />
                        <Input
                            type="text"
                            name="image"
                            onChange={handleInput}
                            placeholder={editedSong.image}
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
                    <Upload setForceReload={setForceReload} forceReload={forceReload} handleClose={handleOpenUpload} notify={notify} />
                </Modal>
            )}
            {/* <ToastContainer
                position="top-center"
                autoClose={2250}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            /> */}
        </div>
    )
}
