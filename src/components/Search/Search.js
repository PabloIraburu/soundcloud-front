import React, { useState, useEffect, useContext } from "react";
import TextField from '@material-ui/core/TextField';
import { ServerRequest } from "../../helpers/ServerRequest";
import { Modal } from "../../components/Modal/Modal";
import { CoverSm } from "../CoverSm/CoverSm";
import { UserContext } from "../../contexts/UserContext/contextProvider";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { toast } from 'react-toastify';
import "./search.css"

function Search({ forceReload, setForceReload }) {
    const { userId } = useContext(UserContext);
    const [songs, setSongs] = useState([]);
    const [songId, setSongId] = useState([]);
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [searchItem, setSearchItem] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const notify = (e) => toast(`${e}`);

    //GET SONGS & FAVOURITE SONGS
    useEffect(() => {
        ServerRequest(`data/song`, "GET")
            .then((response) => {
                ServerRequest(`data/favouritesongs/?id_user=${userId}`, "GET")
                    .then((res) => {
                        let favs = (res.map(fav => fav.id_song._id))
                        setSongs(response.map((song) => {
                            if (favs.includes(song._id)) {
                                song.isFav = true
                            }
                            return song;
                        }))
                    })
                    .catch(console.log)
            })
            .catch(console.log)
    }, [forceReload])


    //GET PLAYLISTS & FAVOURITE PLAYLISTS
    useEffect(() => {
        ServerRequest(`data/playlist`, "GET")
            .then((response) => {
                setUserPlaylists(response.filter((playlist) =>
                    playlist.id_owner === userId
                ))
            })
            .catch(console.log)
    }, [forceReload])

    const handleChange = (e) => {
        setSearchItem(e.target.value);
    };

    useEffect(() => {
        const results = songs.filter(art => art.title.toLowerCase().includes(searchItem));
        setSearchResults(results);
    }, [searchItem]);


    //ADD SONG TO FAVOURITES
    const AddSongToFavourites = (songId) => {
        const favSong = {
            id_song: songId,
            id_user: userId,
        }
        ServerRequest("data/favouritesongs", "POST", favSong)
            .then(() => {
                console.log(songs)
                setSongs(songs.filter((song) => {
                    if (song._id === songId) {
                        (song.isFav = true)
                    }
                    return song;
                }))
                notify('Song added to favourites correctly')
            })
            .catch(console.log)
    }

    //REMOVE SONG FROM FAVOURITES
    const RemoveSongFromFavourites = (songId) => {
        ServerRequest(`data/favouritesongs/?id_song=${songId}&&id_user=${userId}`, "GET")
            .then((res) => {
                console.log(res)
                ServerRequest(`data/favouritesongs/${res[0]._id}`, "DELETE")
                    .catch(() => {
                        setSongs(songs.filter((song) => {
                            if (song._id === songId) {
                                (song.isFav = false)
                            }
                            return song;
                        }))
                        // console.log(res[0].id_song.isFav)
                        // if (res[0].id_song._id === songId) {
                        //     (res[0].id_song.isFav = false)
                        // }
                        setForceReload(!forceReload)
                        notify('Song removed from favourites correctly')
                    })
            })
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
                notify('Song added to playlist correctly')
                setOpenModalAddToPlaylist(!openModalAddToPlaylist);
                setForceReload(!forceReload);
            })
            .catch((response) => notify(response.error))
    }

    return (
        <div className='searchBar'>
            <TextField id="outlined-basic" label="Search" variant="outlined" type='text'
                className='input'
                placeholder='Search'
                value={searchItem}
                onChange={handleChange} />
            <ul>
                {searchItem !== "" && searchResults.map((res, index) => (
                    <CoverSm
                        entity={res.id_song}
                        key={res._id}
                        title={res.title}
                        author={res.artist}
                        description={res.description}
                        categories={res.category}
                        img={res.image}
                        id={res._id}
                        isFav={res.isFav}
                        index={index}
                        entityType="song"
                        handleAddToFavourites={AddSongToFavourites}
                        handleRemoveFromFavourite={RemoveSongFromFavourites}
                        handleAddToPlaylist={handleOpenAddToPlaylist}
                    />
                ))}
            </ul>

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

        </div>
    );
}

export default Search;
