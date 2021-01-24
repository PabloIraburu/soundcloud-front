import React, { createContext } from 'react';
import { usePlayerReducer } from "../../reducers/playerReducer";

export const PlayerContext = createContext();

export const PlayerContextProvider = ({ children }) => {
    const [state, dispatch] = usePlayerReducer();

    return <PlayerContext.Provider value={{ state, dispatch }}>{children}</PlayerContext.Provider>;
}
