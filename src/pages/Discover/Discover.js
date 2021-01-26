import React, { useState, useEffect, useContext } from "react";
import { Modal } from "../../components/Modal/Modal";
import { MyButton } from "../../components/MyButton/MyButton";
import { Upload } from "../../components/Upload/Upload";
import Search from "../../components/Search/Search";
import { CoverMd } from "../../components/CoverMd/CoverMd";
import { CoverSm } from "../../components/CoverSm/CoverSm";
import { ServerRequest } from "../../helpers/ServerRequest";
import { UserContext } from '../../contexts/UserContext/contextProvider';
// import { EditPlaylist } from "../../components/EditPlaylist/EditPlaylist";
import { playerActions } from "../../reducers/playerReducer";
import 'react-h5-audio-player/lib/styles.css';
import './Discover.css'
import { PlayerContext } from "../../contexts/PlayerContext/playerContext";
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function Discover() {

    const { userId } = useContext(UserContext);
    const { state, dispatch } = useContext(PlayerContext);
    // const [songs, setSongs] = useState([]);
    const [songId, setSongId] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [forceReload, setForceReload] = useState(false);

    //GET SONGS
    useEffect(() => {
        ServerRequest(`data/song`, "GET")
            // .then((response) => { setSongs(response) })
            .then((payload) => { dispatch({ type: playerActions.LOAD_SONG, songs: payload }) })
            .catch(console.log)
    }, [forceReload])

    //GET PLAYLISTS
    useEffect(() => {
        ServerRequest(`data/playlist`, "GET")
            .then((response) => {
                setPlaylists(response);
                setUserPlaylists(response.filter((playlist) => {
                    if (playlist.id_owner === userId) {
                        return true
                    }
                }));
            })
            .catch(console.log)
    }, [])

    //ADD SONG TO FAVOURITES
    const AddSongToFavourites = (songId) => {
        const favSong = {
            id_song: songId,
            id_user: userId,
            isFav: true
        }
        ServerRequest("data/favouritesongs", "POST", favSong)
            .then(console.log)
            .catch(console.log);
    }

    //REMOVE SONG FROM FAVOURITES
    const RemoveSongFromFavourites = (songId) => {
        ServerRequest(`data/favouritesongs/?id_song=${songId}&&id_user=${userId}`, "DELETE")
            .then(console.log)
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
            .then(console.log)
            .catch(console.log)
    }

    //REMOVE PLAYLIST FROM FAVOURITES
    const RemovePlaylistFromFavourites = (playlistId) => {
        ServerRequest(`data/favouriteplaylists/?id_playlist=${playlistId}&&id_user=${userId}`, "DELETE")
            .then(console.log)
            .catch(console.log)
    }

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
    const handleOpenUpload = (e) => {
        setOpenModalUpload(!openModalUpload)
        setForceReload(!forceReload)
    };
    const handleCloseUpload = (e) => {
        const { className: el } = e.target;
        if (el !== "backdrop" && el !== "fas fa-times") return;
        setOpenModalUpload(!openModalUpload);
    };


    return (
        <div className='landing'>
            <script src="https://kit.fontawesome.com/2903311b15.js" crossOrigin="anonymous"></script>
            <div className='middleBar'>

                <div className="headMid">
                    <div className="search">
                        <Search />
                    </div>
                    <div className="notif">
                        <span><i className="fas fa-ambulance"></i></span>
                        <span><i className="far fa-dot-circle"></i></span>
                    </div>
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
                    state.reproduceSongList &&
                    state.reproduceSongList.map((song, index) => (
                        <div className="Discover-topSongs">
                            <CoverSm
                                key={song._id}
                                id={song._id}
                                title={song.title}
                                author={song.artist}
                                categories={song.category}
                                img={song.image}
                                handleAddToFavourites={AddSongToFavourites}
                                handleRemoveFromFavourite={RemoveSongFromFavourites}
                                handleAddToPlaylist={handleOpenAddToPlaylist}
                                index={index}
                            />
                        </div>
                    ))
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
                                    handleAddToFavourites={AddPlaylistToFavourites}
                                    handleRemoveFromFavourites={RemovePlaylistFromFavourites}
                                // handleOpenOptions={() => handleOpenEditPlaylist(playlist)}
                                />
                            ))}
                        </div>
                }

            </div>
            {openModalUpload && (
                <Modal handleClose={handleCloseUpload}>
                    <Upload setForceReload={setForceReload} forceReload={forceReload} handleClose={handleOpenUpload} />
                </Modal>
            )}
            {openModalAddToPlaylist && (
                <Modal handleClose={handleCloseAddToPlaylist}>
                    <h3>Add song to playlist</h3>
                    {userPlaylists.length === 0
                        ? <p>Any playlist created yet</p>
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
        </div>
    )

}