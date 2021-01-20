import React, { useState } from "react";
import { Input } from "../Input/Input";
import { MyButton } from "../MyButton/MyButton";
import { ServerRequest } from "../../helpers/ServerRequest";
import { DecodeToken } from "../../utils/DecodeToken";
import { getToken } from "../../utils/LocalStorage.utils";
import { useHistory } from "react-router-dom";
import * as route from '../../routes/routes';
import styles from "./EditPlaylist.module.css";

export const EditPlaylist = ({handleClose, playlist}) => {

    console.log(playlist);
  const userId = DecodeToken(getToken()).id;
  const history = useHistory();

  const [editedPlaylist, setEditedPlaylist] = useState({});
  
  //Introduce los datos de los inputs en el objeto newPlaylist
  const handleInput = (event) => {
    console.log("input event", event);
    const { value, name } = event.target;
    setEditedPlaylist((prevValue) => ({
        ...prevValue,
        [name]: value,
    }));
    console.log(editedPlaylist);
  }

  const handleEditPlaylist = (event) => {
    console.log("handleEditplaylist event", event);
    // Petición al servidor de tipo POST - fetch localhost:3300/data/playlist/:id
    ServerRequest(`data/playlist/${playlist._id}`, "PUT", editedPlaylist)
      .then(console.log)
      .catch((response) => console.log(response.error))
    handleClose(event);
    // history.push(route.PLAYLISTS)
  }

  return (
    <div className={styles["EditPlaylist-wrap"]}> 
        <h1 className={styles["EditPlaylist-title"]}>Edit Playlist</h1>
          <h4>Playlist name*</h4>
            <Input
              type="text"
              name={"title"}
              placeholder={playlist.title}
              onChange={handleInput}
              required
            />
          <h4>Description</h4>
            <textarea 
              // autoFocus
              className={styles["EditPlaylist-textarea"]}
              type="text"
              name={"description"}
              placeholder={playlist.description}
              onChange={handleInput}
            />
          <h4>Image</h4>
            <Input
              type="text"
              name={"image"}
              placeholder={playlist.image}
              onChange={handleInput}
              required
            />
        <div className={styles["EditPlaylist-button"]}>
        {
          (editedPlaylist.title === undefined || editedPlaylist.title === "" || editedPlaylist.title === " ")
          &&
          <MyButton variant="pink-or" size="50%" onClick={handleEditPlaylist} >
              Submit changes
          </MyButton>
        }
        </div>
    </div>
  )
}
