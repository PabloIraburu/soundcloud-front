import { createContext, useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext/contextProvider";
import { ServerRequest } from "../../helpers/ServerRequest";

export const MusicContext = createContext();

export const MusicContextProvider = ({ children }) => {

    const { userId } = useContext(UserContext);
    const [songs, setSongs] = useState([]);
    const [favSongs, setFavSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [favPlaylist, setFavPlaylist] = useState([]);

    //GET SONGS
    // useEffect(() => {
    //     ServerRequest(`data/song`, "GET")
    //         .then((response) => {
    //             setSongs(response)
    //             ServerRequest(`data/favouritesongs/?id_user=${userId}`, "GET")
    //                 .then((res) => {
    //                     setFavSongs(res)
    //                     songs.map((song) => {
    //                         if (song._id === favSongs.map((favSong) => favSong.id_song)) {
    //                             setSongs([{ ...song, isFav: true }])
    //                         }
    //                     })
    //                     console.log("Context edited songs", songs);
    //                 })
    //                 .catch(console.log)
    //         })
    //         .catch(console.log)
    // }, [])


    useEffect(() => {
        ServerRequest(`data/song`, "GET")
            .then((response) => {
                console.log('songs', response)
                setSongs(response)
                ServerRequest(`data/favouritesongs/?id_user=${userId}`, "GET")
                    .then((res) => {
                        setFavSongs(res.map(fav => fav.id_song._id))
                        console.log(res.map(fav => fav.id_song._id))
                        console.log(songs)
                        songs.map((song) => {
                            if (favSongs.includes(song._id)){
                                console.log('Works')
                            }
                        })
                        console.log("Context edited songs", songs);
                    })
                    .catch(console.log)
            })
            .catch(console.log)
    }, [])

    //GET PLAYLISTS
    useEffect(() => {
        ServerRequest(``, "GET")
    }, [])

    return <MusicContext.Provider value={{
        // songs,
        // setSongs,
        // favSongs,
        // setFavSongs,
    }}>{children}</MusicContext.Provider>

}