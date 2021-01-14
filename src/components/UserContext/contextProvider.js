import React, {createContext, useEffect, useState} from "react";
import {getToken} from "../../utils/LocalStorage.utils";
import {DecodeToken} from "../../utils/DecodeToken";
import {ServerRequest} from "../../helpers/ServerRequest";

export const UserContext = createContext();


export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState({})
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
    return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
}