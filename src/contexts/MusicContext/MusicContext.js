import { createContext, useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext/contextProvider";
import { ServerRequest } from "../../helpers/ServerRequest";

export const MusicContext = createContext();

export const MusicContextProvider = ({ children }) => {

    const { userId } = useContext(UserContext);
    const [songss, setSongs] = useState([]);
    const [favSongs, setFavSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [favPlaylist, setFavPlaylist] = useState([]);

    //GET SONGS
    useEffect(() => {
        ServerRequest(`data/song`, "GET")
            .then((response) => {
                setSongs(response)
                ServerRequest(`data/favouritesongs/?id_user=${userId}`, "GET")
                    .then((res) => {
                        setFavSongs(res)
                        songss.map((song) => {
                            if (res.id_song === song._id) {
                                song.isFav = true
                            }
                            console.log("songs", songs);
                        })
                    })
                    .catch(console.log)
            })
            .catch(console.log)
    }, [])

    console.log("songs", songss);


    //GET PLAYLISTS
    useEffect(() => {
        ServerRequest(``, "GET")
    }, [])

    //GET FAVOURITE SONGS
    useEffect(() => {
        ServerRequest(``, "GET")
    }, [])

    //GET FAVOURTIE PLAYLISTS
    useEffect(() => {
        ServerRequest(``, "GET")
    }, [])


    return <MusicContext.Provider value={{
        songss,
        setSongs
    }}>{children}</MusicContext.Provider>

}