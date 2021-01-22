import { DecodeToken } from "../utils/DecodeToken";
import { getToken } from "../utils/LocalStorage.utils";
import { ServerRequest } from "./ServerRequest";

const userId = DecodeToken(getToken()).id;

//ADD SONG TO FAVOURITES
export const AddSongToFavourites = (song) => {
    const favSong = {
        id_song: song._id,
        id_user: userId
    }
    ServerRequest("/favouritesongs", "POST", favSong)
        .then(console.log)
        .catch(console.log)
}

//ADD ALBUM TO FAVOURITES
export const AddAlbumToFavourites = (album) => {
    const favAlbum = {
        id_album: album._id,
        id_user: userId
    }
    ServerRequest("/favouritealbums", "POST", favAlbum)
        .then(console.log)
        .catch(console.log)
}

//ADD PLAYLIST TO FAVOURITES
export const AddPlaylistToFavourites = (playlist) => {
    const favPlaylist = {
        id_playlist: playlist._id,
        id_user: userId
    }
    ServerRequest("/favouriteplaylists", "POST", favPlaylist)
        .then(console.log)
        .catch(console.log)
}