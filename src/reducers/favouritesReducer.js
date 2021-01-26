import { useReducer } from "react";

export const initialState = {
  favSongs: [],
  favPlaylists: []
}

export const favActions = {
  LOAD_FAV_SONGS: 'LOAD_FAV_SONGS',
  FAV_SONG: 'FAV_SONG',
  UNFAV_SONG: 'UNFAV_SONG',
  LOAD_FAV_PLAYLISTS: 'LOAD_FAV_PLAYLISTS',
  FAV_PLAYLIST: 'FAV_PLAYLIST',
  UNFAV_PLAYLIST: 'UNFAV_PLAYLIST',
}

export const favouritesReducer = (state = initialState, action) => {

  const newState = { ...state }

  switch (action.type) {
    case favActions.LOAD_FAV_SONGS:
      newState.favSongs = action.favListSongs;
      return newState;

    case favActions.FAV_SONG:
      newState.favSongs = [...state.favSongs, action.fSong];
      return newState;

    case favActions.UNFAV_SONG:
      newState.favSongs.filter((favSong) => favSong.id_song !== action.songId)
      return newState
    // newState.favSongs = newState.favSongs.filter((id) => {
    //   if (id !== action.songId) {
    //     return true
    //   }
    // });
    // return newState;

    case favActions.LOAD_FAV_PLAYLISTS:
      newState.favPlaylist = action.favListPlaylists;
      return newState;

    case favActions.FAV_PLAYLIST:
      newState.favPlaylists = [...state.favPlaylists, action.fPlaylist];
      return newState;

    case favActions.UNFAV_PLAYLIST:
      newState.favPlaylists.filter((favPlaylist) => favPlaylist.id_playlist !== action.playlistId)
      return newState
    // newState.favPlaylists = newState.favPlaylists.filter((id) => {
    //   if (id !== action.playlistId) {
    //     return true
    //   }
    // });
    // return newState;

    default:
      return state;
  }
}

export const useFavReducer = () => useReducer(favouritesReducer, initialState);




