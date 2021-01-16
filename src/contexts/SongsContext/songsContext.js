import React, {createContext, useEffect, useState} from "react";
import {ServerRequest} from "../../helpers/ServerRequest";

export const SongsContext = createContext();


export const SongsContextProvider = ({children}) => {

    const [songs, setSongs] = useState({})

    useEffect(() => {
        ServerRequest('data/song', "GET")
            .then((response) => {
                setSongs(response);
            })
            .catch(console.log);

    }, []);
    
    return <SongsContext.Provider value={{songs, setSongs}}>{children}</SongsContext.Provider>
}