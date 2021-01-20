import React, {createContext, useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import {getToken, deleteToken} from "../../utils/LocalStorage.utils";
import {DecodeToken} from "../../utils/DecodeToken";
import * as route from "../../routes/routes";
import {ServerRequest} from "../../helpers/ServerRequest";


export const UserContext = createContext();


export const UserContextProvider = ({children}) => {

    const history = useHistory();
    const [user, setUser] = useState({
      _id: "",
      name: "",
      email: "",
      image: "https://previews.123rf.com/images/jemastock/jemastock1701/jemastock170102174/70024333-silhouette-headphones-music-listen-mobile-vector-illustration.jpg"
    });
    // const userId = user._id;
    const [allUsers, setAllUsers] = useState([]);

    // Usuario logueado
    useEffect(() => {
        const token = getToken();
        const decodedToken = DecodeToken(token);
        const userId = decodedToken.id;

        ServerRequest(`data/user/${userId}`, "GET")
            .then((response) => {
                setUser(response);
            })
            .catch(console.log);
    }, []);

    // Usuarios excepto el logueado
    useEffect(() => {
        const token = getToken();
        const decodedToken = DecodeToken(token);
        const userId = decodedToken.id;

        ServerRequest(`data/user`, "GET")
        .then((response) => {
          setAllUsers(response.filter((user) => {
            if (user._id !== userId) {
              return true
            }
          }));
        })
        .catch(console.log);
        
      }, []);

    //cerrar sesión y redirección a Landing
    const signOut = () => {
      deleteToken();
      history.replace(route.HOME)
    }

    return <UserContext.Provider value={{user, setUser, allUsers, setAllUsers, signOut}}>{children}</UserContext.Provider>
}