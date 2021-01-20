import React, { createContext } from 'react';
import { example } from "../reducers/example";

export const PlayerContext = createContext();

export const PlayerContextProvider = ({ children }) => {

    const { state, dispatch } = usePlayerReducer();

    return <PlayerContext.Provider value={{ state, dispatch }}>{children}</PlayerContext.Provider>;
}
