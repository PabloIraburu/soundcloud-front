
export const initialStateFav = {
    isfav: false,
    favEntity: {}
}

export const favActions = {
    ADD_SONG: 'LOAD_SONG',
    REMOVE_SONG: 'REMOVE_SONG',
    ADD_PLAYLIST: 'LOAD_PLAYLIST',
    REMOVE_PLAYLIST: 'REMOVE_PLAYLIST',
}

export const favouritesReducer = (state = initialStateFav, action) => {

    const newState = { ...state }

    switch (action.type) {
      case favActions.ADD_SONG:
        newState.favEntity = action.favSong;
        newState.isfav = !state.isfav;
        return newState;

      case favActions.REMOVE_SONG:
        newState.favEntity = {};
        newState.isfav = !state.isfav;
        return newState;

      case favActions.ADD_PLAYLIST:
        newState.favEntity = action.favPlaylist;
        newState.isfav = !state.isfav;
        return newState;

      case favActions.REMOVE_PLAYLIST:
        newState.favEntity = {};
        newState.isfav = !state.isfav;
        return newState;
      
      default:
        return state;
    }
}




