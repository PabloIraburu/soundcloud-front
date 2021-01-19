import React, { createContext, useEffect, useState } from "react";
import { ServerRequest } from "../../helpers/ServerRequest";

export const SongsContext = createContext();


export const SongsContextProvider = ({ children }) => {

    // const { userId: {user._id} }
    const [songs, setSongs] = useState([]);
    const [favouriteSong, setFavouriteSong] = useState();
    const [favouriteAlbum, setFavouriteAlbum] = useState();
    const [favouritePlaylist, setFavouritePlaylist] = useState()

    useEffect(() => {
        ServerRequest('data/song', "GET")
            .then((response) => {
                setSongs(response);
            })
            .catch(console.log);

    }, []);

    const handleAddSongToFavourites = (songId) => {
        // const songIdLiked = songId;
        // const favSong = {
        //     id_song: songIdLiked,
        //     id_user: 
        // }
        // ServerRequest('data/favouritesongs', "PUT", songId)
        //     .then((response) => {
        //         setFavouriteSong(response);
        //     })
        //     .catch(console.log);

        // console.log(favouriteSong);
    }
    const handleAddAlbumToFavourites = (albumId) => {
        // ServerRequest('data/favouritealbums', "PUT", albumId)
        //     .then((response) => {
        //         setFavouriteAlbum(response);
        //     })
        //     .catch(console.log);
    }
    const handleAddPlaylistToFavourites = (playlistId) => {
        // ServerRequest('data/favouriteplaylists', "PUT", playlistId)
        //     .then((response) => {
        //         setFavouritePlaylist(response);
        //     })
        //     .catch(console.log);
    }

    return <SongsContext.Provider value={{ songs, setSongs, handleAddSongToFavourites, handleAddAlbumToFavourites, handleAddPlaylistToFavourites, favouriteSong, favouriteAlbum, favouritePlaylist }}>{children}</SongsContext.Provider>
}