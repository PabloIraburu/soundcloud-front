import React, { createContext } from 'react';
import { usePlayerReducer } from "../../reducers/playerReducer";

export const PlayerContext = createContext();

export const PlayerContextProvider = ({ children }) => {

    const [player, dispatchPlayer] = usePlayerReducer();

    return <PlayerContext.Provider value={{ player, dispatchPlayer }}>{children}</PlayerContext.Provider>;
}
