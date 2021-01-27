import { createContext, useContext, useEffect } from 'react';
import { useFavReducer } from "../../reducers/favouritesReducer";
import { favActions } from "../../reducers/favouritesReducer";
import { ServerRequest } from '../../helpers/ServerRequest';
import { UserContext } from '../UserContext/contextProvider';

export const FavContext = createContext();

export const FavContextProvider = ({ children }) => {

    const [favourite, dispatchFav] = useFavReducer();

    const { userId } = useContext(UserContext);

    // GET FAVOURITE SONGS
    useEffect(() => {
        ServerRequest(`data/favouritesongs/?id_user=${userId}`, "GET")
            .then((payload) => { dispatchFav({ type: favActions.LOAD_FAV_SONGS, favListSongs: payload }) })
            .catch(console.log)
    }, []);

    // GET FAVOURITE PLAYLISTS
    useEffect(() => {
        ServerRequest(`data/favouriteplaylists/?id_user=${userId}`, "GET")
            .then((payload) => { dispatchFav({ type: favActions.LOAD_FAV_PLAYLISTS, favListPlaylists: payload }) })
            .catch(console.log)
    }, []);


    return <FavContext.Provider value={{ favourite, dispatchFav }}>{children}</FavContext.Provider>;
}
