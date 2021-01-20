import React, { useContext, useState } from "react"
import { Input } from "../Input/Input";
import { MyButton } from "../MyButton/MyButton";
import { ServerRequest } from "../../helpers/ServerRequest";
import styles from "./CreatePlaylist.module.css";
import { SongsContext } from "../../contexts/SongsContext/songsContext";
import { DecodeToken } from "../../utils/DecodeToken";
import { getToken } from "../../utils/LocalStorage.utils";

const CreatePlaylist = ({handleClose}) => {

  const { userPlaylists, setUserPlaylists } = useContext(SongsContext)  
  const userId = DecodeToken(getToken()).id;
  const [newPlaylist, setNewPlaylist] = useState({
    "id_owner": userId
  });
  
  //Introduce los datos de los inputs en el objeto newPlaylist
  const handleInput = (event) => {
    const { value, name } = event.target;
    setNewPlaylist((prevValue) => ({
        ...prevValue,
        [name]: value,
    }));
  }

  const handleCreateNewPlaylist = (event) => {
    //Petición al servidor de tipo POST - fetch localhost:3300/register
    ServerRequest("data/playlist", "POST", newPlaylist)
      .then(console.log)
      .catch((response) => console.log(response.error))
    handleClose(event);
  }

  return (
    <div className={styles["CreatePlaylist-wrap"]}> 
        <h1 className={styles["CreatePlaylist-title"]}>Create Playlist</h1>
          <h4>Name</h4>
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
            <MyButton variant="pink-or" size="50%" onClick={handleCreateNewPlaylist} >
              Create
            </MyButton>
        </div>
    </div>
  )
}
export default CreatePlaylist;