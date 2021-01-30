import React, { useState } from "react";
import { Input } from "../Input/Input";
import { MyButton } from "../MyButton/MyButton";
import { ServerRequest } from "../../helpers/ServerRequest";
import { DecodeToken } from "../../utils/DecodeToken";
import { getToken } from "../../utils/LocalStorage.utils";
import { useHistory } from "react-router-dom";
import * as route from '../../routes/routes';
import logo from "../../img/logo.png";
import styles from "./CreatePlaylist.module.css";

const CreatePlaylist = ({ handleClose, notify, forceReload, setForceReload }) => {

  const userId = DecodeToken(getToken()).id;
  const history = useHistory();

  const [newPlaylist, setNewPlaylist] = useState({
    "id_owner": userId,
    // "image": "https://previews.123rf.com/images/jemastock/jemastock1701/jemastock170102174/70024333-silhouette-headphones-music-listen-mobile-vector-illustration.jpg"
    "image": logo
  });

  //Introduce los datos de los inputs en el objeto newPlaylist
  const handleInput = (event) => {
    const { value, name } = event.target;
    setNewPlaylist((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
    console.log(newPlaylist);
  }

  const handleCreateNewPlaylist = (event) => {
    //Petición al servidor de tipo POST - fetch localhost:3300/register
    ServerRequest("data/playlist", "POST", newPlaylist)
      .then(() => {
        notify('Playlist created correctly')
        setForceReload(!forceReload)
      })
      .catch((response) => notify(response.error))
    handleClose(event);
    history.push(route.PLAYLISTS)
  }

  return (
    <div className={styles["CreatePlaylist-wrap"]}>
      <h1 className={styles["CreatePlaylist-title"]}>Create Playlist</h1>
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
        className={styles["CreatePlaylist-textarea"]}
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
      <div className={styles["CreatePlaylist-button"]}>
        {
          (newPlaylist.title === undefined || newPlaylist.title === "" || newPlaylist.title === " ")
            ? <p>Playlist name field is required*</p>
            : <MyButton variant="pink-or" size="50%" onClick={handleCreateNewPlaylist} >
              Create
            </MyButton>
        }
      </div>
    </div>
  )
}
export default CreatePlaylist;