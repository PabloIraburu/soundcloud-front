import React, { useState, useContext, useEffect } from "react";
import { Modal } from "../../components/Modal/Modal";
import { MyButton } from "../../components/MyButton/MyButton";
import { Upload } from "../../components/Upload/Upload";
import List from "../../components/List/List";
import Search from "../../components/Search/Search";
import { CoverMd } from "../../components/CoverMd/CoverMd";
import './Discover.css'
import { CoverSm } from "../../components/CoverSm/CoverSm";
import { ServerRequest } from "../../helpers/ServerRequest";
import { UserContext } from "../../contexts/UserContext/contextProvider";
import { PlayerContext } from "../../contexts/PlayerContext/playerContext";
import { playerActions } from "../../reducers/playerReducer";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import {API_URL} from "../../helpers/ServerRequest";

export default function Discover() {

    const { userId } = useContext(UserContext);

    // const { songs, handleAddSongToFavourites } = useContext(SongsContext);
    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [playlists, setPlaylists] = useState([]);

    //GET SONGS
    useEffect(() => {
        ServerRequest(`data/song`, "GET")
            .then((response) => { setSongs(response) })
            .catch(console.log)
    }, [])

    //GET ALBUMS
    useEffect(() => {
        ServerRequest(`data/album`, "GET")
            .then((response) => setAlbums(response))
            .catch(console.log)
    }, [])

    //GET PLAYLISTS
    useEffect(() => {
        ServerRequest(`data/playlist`, "GET")
            .then((response) => setPlaylists(response))
            .catch(console.log)
    }, [])

    //Gestión modal upload
    const [openModalUpload, setOpenModalUpload] = useState(false);
    const handleOpenUpload = () => setOpenModalUpload(!openModalUpload);
    const handleCloseUpload = (e) => {
        const { className: el } = e.target;
        if (el !== "backdrop" && el !== "fas fa-times") return;
        setOpenModalUpload(!openModalUpload);
    };

    const { state, dispatch } = useContext(PlayerContext);

    const handleClickNext = () => {
        dispatch({ type: playerActions.REPRODUCE_NEXT });
    };
    const handleClickPrev = () => {
        console.log('Next');
        dispatch({ type: playerActions.PREV_SONG });
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

                {songs.length !== 0 && songs.map((song) =>
                    <div>
                        <h4>{song.title}</h4>
                        <audio controls={true} muted={false}>
                            <source src={`http://localhost:3300/track/${song.trackId}`} type="audio/mpeg" />
                        </audio>
                        <AudioPlayer
                            onClickNext={handleClickNext}
                            onClickPrevious={handleClickPrev}
                            showSkipControls
                            showJumpControls={false}
                            autoPlayAfterSrcChange
                            onEnded={handleClickPrev}
                            src={`${API_URL}/track/${song.trackId}`}
                            layout={'stacked'}
                        />
                    </div>
                )}

                <h1>Recommended for you</h1>

                <h3>World's Top Music</h3>
                {
                    (songs.lenght !== 0) &&
                    <div className="Discover-topSongs">
                        {songs.map((song) => (
                            <CoverSm
                                key={song._id}
                                title={song.title}
                                author={song.artist}
                                categories={song.category}
                                img={song.image}
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
                                // handleOpenOptions={() => handleOpenEditPlaylist(playlist)}
                                />
                            ))}
                        </div>
                }

                <h3>Best Albums</h3>
                {
                    (albums.lenght === 0)
                        ? <p>You haven't any favourite album.</p>
                        : <div className="Discover-playlists">
                            {albums.map((album) => (
                                <CoverMd
                                    key={album._id}
                                    entityType="album"
                                    entity={album}
                                    id={album._id}
                                    title={album.title}
                                    author={album.author}
                                    description={album.description}
                                    img={album.image}
                                // handleOpenOptions={() => handleOpenEditPlaylist(album)}
                                />
                            ))}
                        </div>
                }

            </div>
            {openModalUpload && (
                <Modal handleClose={handleCloseUpload}>
                    <Upload />
                </Modal>
            )}
        </div>
    )

}