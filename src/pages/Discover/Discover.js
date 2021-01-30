import React, { useState, useEffect, useContext } from "react";
import { Modal } from "../../components/Modal/Modal";
import { MyButton } from "../../components/MyButton/MyButton";
import { Upload } from "../../components/Upload/Upload";
import Search from "../../components/Search/Search";
import { CoverMd } from "../../components/CoverMd/CoverMd";
import { CoverSm } from "../../components/CoverSm/CoverSm";
import { ServerRequest } from "../../helpers/ServerRequest";
import { UserContext } from '../../contexts/UserContext/contextProvider';
import { EditPlaylist } from "../../components/EditPlaylist/EditPlaylist";
import { PlayerContext } from "../../contexts/PlayerContext/playerContext";
import { playerActions } from "../../reducers/playerReducer";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import 'react-h5-audio-player/lib/styles.css';
import './Discover.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { MusicContext } from "../../contexts/MusicContext/MusicContext";

export default function Discover() {

    const notify = (e) => toast(`${e}`);
    const { userId } = useContext(UserContext);
    // const { songss } = useContext(MusicContext)
    const { dispatchPlayer } = useContext(PlayerContext);
    const [songs, setSongs] = useState([]);
    const [songId, setSongId] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [editPlaylist, setEditPlaylist] = useState();
    const [favSongs, setFavSongs] = useState([]);
    const [favPlaylists, setFavPlaylists] = useState([]);
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [forceReload, setForceReload] = useState(false);

    //GET SONGS
    useEffect(() => {
        ServerRequest(`data/song`, "GET")
            .then((response) => {
                setSongs(response)
            })
            .catch(console.log)
    }, [forceReload])

    //GET PLAYLISTS
    useEffect(() => {
        ServerRequest(`data/playlist`, "GET")
            .then((response) => {
                setPlaylists(response);
                setUserPlaylists(response.filter((playlist) =>
                    playlist.id_owner === userId
                ));
            })
            .catch(console.log)
    }, [forceReload])

    // GET FAVOURITE SONGS
    useEffect(() => {
        ServerRequest(`data/favouritesongs/?id_user=${userId}`, "GET")
            .then((response) => {
                setFavSongs(response)

            })
            .catch(console.log)
    }, [forceReload]);

    // GET FAVOURITE PLAYLISTS
    useEffect(() => {
        ServerRequest(`data/favouriteplaylists/?id_user=${userId}`, "GET")
            .then((response) => setFavPlaylists(response))
            .catch(console.log)
    }, [forceReload]);


    useEffect(() => {
        console.log("cambio lista fav");
    }, [favSongs])

    //ADD SONG TO FAVOURITES
    const AddSongToFavourites = (songId) => {
        const favSong = {
            id_song: songId,
            id_user: userId,
        }
        ServerRequest("data/favouritesongs", "POST", favSong)
            .then(() => {
                setSongs(songs.map((song) => {
                    if (song._id === songId) {
                        return [...songs, { ...song, isFav: true }]
                    }
                    return song;
                }))
                console.log("Array songs modificado", songs);
            })
            .catch(console.log)
    }

    //REMOVE SONG FROM FAVOURITES
    const RemoveSongFromFavourites = (songId) => {
        ServerRequest(`data/favouritesongs/?id_song=${songId}&&id_user=${userId}`, "GET")
            .then((res) => {
                const resId = res;
                ServerRequest(`data/favouritesongs/${resId[0]._id}`, "DELETE")
                    .then(console.log)
                    .catch(() => {
                        console.log(favSongs);
                        console.log(songId);
                        console.log(favSongs.filter((favSong) => favSong.id_song._id !== songId));
                        setFavSongs(favSongs.filter((favSong) => favSong.id_song._id !== songId))
                        setForceReload(!forceReload)
                    })
            })
            .catch(console.log)
    }

    //ADD PLAYLIST TO FAVOURITES
    const AddPlaylistToFavourites = (playlistId) => {
        const favPlaylist = {
            id_playlist: playlistId,
            id_user: userId,
            isFav: true
        }
        ServerRequest("data/favouriteplaylists", "POST", favPlaylist)
            .then((response) => {
                setFavPlaylists([...favPlaylists, response])
                setForceReload(!forceReload)
            })
            .catch(console.log)
    }

    //REMOVE PLAYLIST FROM FAVOURITES
    const RemovePlaylistFromFavourites = (playlistId) => {
        ServerRequest(`data/favouriteplaylists/?id_playlist=${playlistId}&&id_user=${userId}`, "GET")
            .then((res) => {
                const resId = res;
                ServerRequest(`data/favouriteplaylists/${resId[0]._id}`, "DELETE")
                    .then(() => {
                        favPlaylists.filter((favPlaylist) => favPlaylist.id_playlist !== playlistId)
                        setForceReload(!forceReload)
                    })
                    .catch(console.log)
            })
            .catch(console.log)
    }

    //PLAY PLAYLIST
    const handlePlayPlaylist = (playlistId) => {
        ServerRequest(`data/songsinplaylist/?id_playlist=${playlistId}`, "GET")
            .then(payload => { dispatchPlayer({ type: playerActions.START_PLAY, songs: payload.map(playlist => playlist.id_song) }) })
            .catch(console.log)
    };

    //ADD PLAYLIST TO QUEUE
    const handleAddToQueue = (playlistId) => {
        ServerRequest(`data/songsinplaylist/?id_playlist=${playlistId}`, "GET")
            .then(payload => {
                console.log(payload)
                payload.map(payload => dispatchPlayer({ type: playerActions.ADD_TO_QUEUE, song: payload.id_song }))
            })
            .catch(console.log)
    };

    //GESTIÓN ADD SONG TO PLAYLISTT
    //GESTIÓN MODAL ADD SONG TO PLAYLIST
    const [openModalAddToPlaylist, setOpenModalAddToPlaylist] = useState(false);
    const handleOpenAddToPlaylist = (id) => {
        setSongId(id);
        setOpenModalAddToPlaylist(!openModalAddToPlaylist);
        setForceReload(!forceReload);
    };
    const handleCloseAddToPlaylist = (e) => {
        const { className: el } = e.target;
        if (el !== "backdrop" && el !== "fas fa-times") return;
        setOpenModalAddToPlaylist(!openModalAddToPlaylist);
    };

    //ADD SONG TO PLAYLIST
    const handleAddToPlaylist = (playlistId) => {
        const newSongInPlaylist = {
            id_playlist: playlistId,
            id_song: songId
        }
        ServerRequest(`data/songsinplaylist`, "POST", newSongInPlaylist)
            .then(() => {
                setOpenModalAddToPlaylist(!openModalAddToPlaylist);
                setForceReload(!forceReload);
            })
            .catch(console.log)
    }

    //Gestión modal upload
    const [openModalUpload, setOpenModalUpload] = useState(false);
    const handleOpenUpload = () => {
        setOpenModalUpload(!openModalUpload)
        setForceReload(!forceReload)
    };
    const handleCloseUpload = (e) => {
        const { className: el } = e.target;
        if (el !== "backdrop" && el !== "fas fa-times") return;
        setOpenModalUpload(!openModalUpload);
    };


    //Gestión modal EditPlaylist
    const [openModalEditPlaylist, setOpenModalEditPlaylist] = useState(false);
    const handleOpenEditPlaylist = (e) => {
        setEditPlaylist(e);
        setForceReload(!forceReload)
        setOpenModalEditPlaylist(!openModalEditPlaylist)
    };
    const handleCloseEditPlaylist = (e) => {
        const { className: el } = e.target;
        if (el !== "backdrop" && el !== "fas fa-times") return;
        setOpenModalEditPlaylist(!openModalEditPlaylist);
    };

    return (
        <div className='landing'>
            <script src="https://kit.fontawesome.com/2903311b15.js" crossOrigin="anonymous"></script>
            <div className='middleBar'>

                <div className="headMid">
                    <div className="search">
                        <Search
                        // handleAddToFavourites={AddSongToFavourites}
                        // handleRemoveFromFavourite={RemoveSongFromFavourites}
                        // handleAddToPlaylistSearch={handleOpenAddToPlaylist}
                        />
                    </div>
                    {/*<div className="notif">*/}
                    {/*    <span><i className="fas fa-ambulance"></i></span>*/}
                    {/*    <span><i className="far fa-dot-circle"></i></span>*/}
                    {/*</div>*/}
                </div>
                <div className="mainFrame">
                    <div className="header">
                        <h1>Weekly Top Track</h1>
                    </div>
                    <div className="slider">
                        <div className="display">
                            <div className="text">
                                <h2>SLOWING DANCING IN THE DARK</h2>
                            </div>
                            <div className="images">
                                <img src="https://www.ismorbo.com/wp-content/uploads/2018/10/40550719_1376357265830478_8906633344016595746_n.jpg" alt="" />
                                <img src="https://lab.fm/wp-content/uploads/2020/03/030420-Joji-Run-Tonight-Show-Jimmy-Fallon-YouTube.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottomFrame">
                    <div className="recommended">
                        <MyButton onClick={handleOpenUpload} variant="pink-or" size="150px">
                            Upload Song
                        </MyButton>
                        <div className="listComp">
                            {/* <List /> */}
                        </div>
                        {/* <div className="title"></div>
                        <div className="gallery"> 
                        </div>*/}
                    </div>
                    {/* <div className="player"></div>
                    <div className="playlist"></div> */}
                </div>


                <h1>Recommended for you</h1>

                <h3>World's Top Music</h3>
                {
                    <div className="Discover-topSongs">
                        {songs &&
                            songs.map((song, index) => (
                                <CoverSm
                                    key={song._id}
                                    entity={song}
                                    id={song._id}
                                    title={song.title}
                                    author={song.artist}
                                    categories={song.category}
                                    img={song.image}
                                    isFav={song.isFav}
                                    handleAddToFavourites={AddSongToFavourites}
                                    handleRemoveFromFavourite={RemoveSongFromFavourites}
                                    handleAddToPlaylist={handleOpenAddToPlaylist}
                                    index={index}
                                />
                            ))}
                    </div>
                }

                <h3>Most Listened Playlists</h3>
                {
                    (playlists.lenght === 0)
                        ? <p>You haven't any favourite playlist.</p>
                        : <div className="Discover-playlists">
                            {playlists.map((playlist) => (
                                <CoverMd
                                    key={playlist._id}
                                    entityType="playlist"
                                    entity={playlist}
                                    id={playlist._id}
                                    title={playlist.title}
                                    description={playlist.description}
                                    categories={playlist.category}
                                    img={playlist.image}
                                    isFav={playlist.isFav}
                                    handleOpenOptions={() => handleOpenEditPlaylist(playlist)}
                                    handleAddToFavourites={AddPlaylistToFavourites}
                                    handleRemoveFromFavourites={RemovePlaylistFromFavourites}
                                    handlePlay={handlePlayPlaylist}
                                    handleAddToQueue={handleAddToQueue}
                                />
                            ))}
                        </div>
                }

            </div>
            {openModalUpload && (
                <Modal handleClose={handleCloseUpload}>
                    <Upload setForceReload={setForceReload} forceReload={forceReload} handleClose={handleOpenUpload} notify={notify} />
                </Modal>
            )}
            {openModalAddToPlaylist && (
                <Modal handleClose={handleCloseAddToPlaylist}>
                    <h3>Add song to playlist</h3>
                    {userPlaylists.length === 0
                        ? <p>You haven't created any playlists yet</p>
                        : userPlaylists.map((playlist) => (
                            <div className="Discover-AddToPlaylistList">
                                <p onClick={() => handleAddToPlaylist(playlist._id)}>{playlist.title}</p>
                                <AddCircleIcon
                                    fontSize="inherit"
                                    style={{ color: "#333" }}
                                    onClick={() => handleAddToPlaylist(playlist._id)}
                                />
                            </div>
                        ))}
                </Modal>
            )}
            {openModalEditPlaylist &&
                <Modal handleClose={handleCloseEditPlaylist}>
                    <EditPlaylist handleClose={handleOpenEditPlaylist} playlist={editPlaylist} setForceReload={setForceReload} forceReload={forceReload} />
                </Modal>}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )

}