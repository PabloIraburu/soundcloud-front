import React, { useState } from "react";
import { Input } from "../Input/Input";
import { MyButton } from "../MyButton/MyButton";
import { ServerRequest } from "../../helpers/ServerRequest";
import { DecodeToken } from "../../utils/DecodeToken";
import { getToken } from "../../utils/LocalStorage.utils";
import { useHistory } from "react-router-dom";
import * as route from '../../routes/routes';
import styles from "./EditPlaylist.module.css";

export const EditPlaylist = ({handleClose}) => {

  const userId = DecodeToken(getToken()).id;
  const history = useHistory();

  // const [newPlaylist, setNewPlaylist] = useState({
  //   "id_owner": userId
  // });
  
  // //Introduce los datos de los inputs en el objeto newPlaylist
  // const handleInput = (event) => {
  //   const { value, name } = event.target;
  //   setNewPlaylist((prevValue) => ({
  //       ...prevValue,
  //       [name]: value,
  //   }));
  //   console.log(newPlaylist);
  // }

  // const handleCreateNewPlaylist = (event) => {
  //   //Petición al servidor de tipo POST - fetch localhost:3300/register
  //   ServerRequest("data/playlist", "POST", newPlaylist)
  //     .then(console.log)
  //     .catch((response) => console.log(response.error))
  //   handleClose(event);
  //   history.push(route.PLAYLISTS)
  // }

  return (
    <div className={styles["EditPlaylist-wrap"]}> 
        <h1 className={styles["EditPlaylist-title"]}>Edit Playlist</h1>
          <h4>Playlist name*</h4>
            <Input
              type="text"
              name="title"
              placeholder={"My Playlist"}
              onChange={handleInput}
              required
            />
          <h4>Description</h4>
            <textarea 
              // autoFocus
              className={styles["EditPlaylist-textarea"]}
              type="text"
              name="description"
              placeholder={"Add your best description."}
              onChange={handleInput}
            />
          <h4>Image</h4>
            <Input
              type="text"
              name="image"
              placeholder={"Image url"}
              onChange={handleInput}
              required
            />
        <div className={styles["EditPlaylist-button"]}>
        {
          (newPlaylist.title === undefined || newPlaylist.title === "" || newPlaylist.title === " ")
          ? <p>Playlist name field is required*</p>
          : <MyButton variant="pink-or" size="50%" onClick={handleEditNewPlaylist} >
              Create
            </MyButton>
        }
        </div>
    </div>
  )
}
