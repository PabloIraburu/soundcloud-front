import React, { useState, useEffect } from 'react';
import { MYSONGS, DISCOVER } from '../../routes/routes';
import { getToken } from "../../utils/LocalStorage.utils";
import { DecodeToken } from "../../utils/DecodeToken";
import { ServerRequest } from "../../helpers/ServerRequest";
import { MyButton } from "../../components/MyButton/MyButton";
import styles from "./MySongs.module.css";

export const MySongs = () => {


    const [songs, setSongs] = useState([])

    {/*useEffect(() => {
        const token = getToken();
        const decodedToken = DecodeToken(token);
        const userId = decodedToken.id;
    
        ServerRequest(`data/mysongs`, "GET")
          .then((response) => {
              if (!response.message) {
                    setSongs(response);
              }
          })
          .catch((response) => console.log(response.error))
      }, []);*/}



    return (
        <div className={styles["mysongs"]}>
            <h1>Edit and delete songs</h1>
            <div className={styles["mysongs-buttons-section"]}>
                <div className={styles["mysongs-buttons"]}>
                    <MyButton variant="pink-or" size="150px">
                        Update song
                    </MyButton>
                </div>

                <div className={styles["mysongs-buttons"]}>
                    <MyButton variant="pink-or" size="150px">
                        Delete Song
                    </MyButton>
                </div>
            </div>
        </div>
    )
}
