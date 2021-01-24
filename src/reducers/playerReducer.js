import { useReducer } from "react";

const initialState = {
    reproduceSongList: [],
    currentPlay: undefined
}

export const playerActions = {
    //cargar canciones, playlist o album
    LOAD_SONG: 'LOAD_SONG',

    //añadir canción a la cola de reproducción
    ADD_TO_QUEUE: 'ADD_TO_QUEUE',

    //iniciar reproducción playlist, album, favoritos
    START_PLAY: 'START_PLAY',

    //reproducción ordenada
    PLAY_LOOP: 'PLAY_LOOP',

    //reproducción random
    PLAY_RANDOM: 'PLAY_RANDOM',

    //reproducir una canción (de otra playlist o de sugerencias)
    PLAY_SONG: 'PLAY_SONG',

    //reproducir una canción (de otra playlist o de sugerencias)
    PLAY_THIS_SONG: 'PLAY_THIS_SONG',

    //ir a siguiente canción
    NEXT_SONG: 'NEXT_SONG',

    //ir a anterior canción
    PREV_SONG: 'PREV_SONG',
}

const playerReducer = (state, action) => {

    const newState = { ...state }

    switch (action.type) {
        case playerActions.LOAD_SONG:
            newState.reproduceSongList = action.songs;
            return newState;

        case playerActions.ADD_TO_QUEUE:
            newState.reproduceSongList = [...state.reproduceSongList, action.song];
            return newState;

        case playerActions.START_PLAY:
            newState.currentPlay = 0;
            return newState;

        case playerActions.PLAY_LOOP:
            return newState;

        case playerActions.PLAY_RANDOM:
            newState.currentPlay = Math.floor(Math.random() * state.reproduceSongList.length);
            return newState;

        case playerActions.PLAY_THIS_SONG:
            newState.currentPlay = action.index;
            return newState;

        case playerActions.PLAY_SONG:
            newState.reproduceSongList = action.song;
            return newState;

        case playerActions.NEXT_SONG:
            if (state.reproduceSongList < state.reproduceSongList.length) {
                newState.currentPlay = state.currentPlay + 1;
            }
            return newState;

        case playerActions.PREV_SONG:
            if (state.reproduceSongList > 0) {
                newState.currentPlay = state.currentPlay - 1;
            }
            return newState;

        default:
            return state;
    }
}


export const usePlayerReducer = () => useReducer(playerReducer, initialState);