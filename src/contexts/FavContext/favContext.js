import { createContext } from 'react';
import { useFavReducer } from "../../reducers/favouritesReducer";
// import { favActions } from "../../reducers/favouritesReducer";
// import { ServerRequest } from '../../helpers/ServerRequest';
// import { UserContext } from '../UserContext/contextProvider';

export const FavContext = createContext();

export const FavContextProvider = ({ children }) => {

    // const { userId } = useContext(UserContext);
    const [favourite, dispatchFav] = useFavReducer();


    // //GET FAVOURITE SONGS
    // useEffect(() => {
    //     ServerRequest(`data/favouritesongs/?id_user=${userId}`, "GET")
    //         .then((payload) => { dispatchFav({ type: favActions.LOAD_FAV_SONG, favListSongs: payload }) })
    //         .catch(console.log)
    // }, [])


    // //GET FAVOURITE PLAYLIST
    // useEffect(() => {
    //     ServerRequest(`data/favouriteplaylists/?id_user=${userId}`, "GET")
    //         .then((payload) => { dispatchFav({ type: favActions.LOAD_FAV_PLAYLIST, favListPlaylist: payload }) })
    //         .catch(console.log)
    // }, [])

    // console.log("favourite items", favourite);

    return <FavContext.Provider value={{ favourite, dispatchFav }}>{children}</FavContext.Provider>;
}
