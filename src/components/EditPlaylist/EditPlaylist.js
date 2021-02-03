import React, { useState, useContext } from "react";
import { Input } from "../Input/Input";
import { MyButton } from "../MyButton/MyButton";
import { ServerRequest } from "../../helpers/ServerRequest";
import { toast } from 'react-toastify';
import { UserContext } from "../../contexts/UserContext/contextProvider";
import styles from "./EditPlaylist.module.css";

export const EditPlaylist = ({ handleClose, playlist, setForceReload, forceReload }) => {

  const { userId } = useContext(UserContext);
  const [editedPlaylist, setEditedPlaylist] = useState({});
  const notify = (e) => toast(`${e}`);

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
    ServerRequest(`data/playlist/${playlist._id}`, "PUT", editedPlaylist)
      .then(() => {
        notify('Playlist edited correctly')
        setForceReload(!forceReload)
      })
      .catch((response) => notify(response.error))
    handleClose(event);
  }

  const handleDeletePlaylist = (event) => {
    console.log("handleDeleteplaylist event", event);
    ServerRequest(`data/playlist/${playlist._id}`, "DELETE", editedPlaylist)
      .then(console.log)
      .catch(() => {
        notify('Playlist deleted correctly')
        setForceReload(!forceReload)
      })
    handleClose(event);
  }

  return (
    <>
      {userId !== playlist.id_owner
        ? <p>You can't edit this playlist</p>
        : <div className={styles["EditPlaylist-wrap"]}>
          <h1 className={styles["EditPlaylist-title"]}>Edit Playlist</h1>
          <h4>Playlist name*</h4>
          <Input
            type="text"
            name="title"
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
              <>
                <MyButton variant="darkBlue" size="40%" onClick={handleDeletePlaylist} >
                  Delete
                </MyButton>
                <MyButton variant="pink-or" size="40%" onClick={handleEditPlaylist} >
                  Submit changes
                </MyButton>
              </>
            }
          </div>
        </div>}
    </>
  )
}
