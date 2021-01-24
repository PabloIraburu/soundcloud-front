import React, { createContext, useEffect, useState } from "react";
import { ServerRequest } from "../../helpers/ServerRequest";
// import { UserContext } from '../UserContext/contextProvider';


export const SongsContext = createContext();


export const SongsContextProvider = ({ children }) => {

    // const { user } = useContext(UserContext);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        ServerRequest('data/song', "GET")
            .then((response) => {
                setSongs(response);
            })
            .catch(console.log);
    }, []);

    return <SongsContext.Provider value={{
        songs,
        setSongs,
    }}>{children}</SongsContext.Provider>
}