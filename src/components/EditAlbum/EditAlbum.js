import React, { useState } from "react";
import { Input } from "../Input/Input";
import { MyButton } from "../MyButton/MyButton";
import { ServerRequest } from "../../helpers/ServerRequest";
import { DecodeToken } from "../../utils/DecodeToken";
import { getToken } from "../../utils/LocalStorage.utils";
import { useHistory } from "react-router-dom";
import * as route from '../../routes/routes';
import styles from "./EditAlbum.module.css";

export const EditAlbum = ({handleClose, album}) => {

  const userId = DecodeToken(getToken()).id;
  const history = useHistory();

  const [editedAlbum, setEditedAlbum] = useState({});
  
  //Introduce los datos de los inputs en el objeto newAlbum
  const handleInput = (event) => {
    console.log("input event", event);
    const { value, name } = event.target;
    setEditedAlbum((prevValue) => ({
        ...prevValue,
        [name]: value,
    }));
    console.log(editedAlbum);
  }

  const handleEditAlbum = (event) => {
    console.log("handleEditAlbum event", event);
    ServerRequest(`data/album/${album._id}`, "PUT", editedAlbum)
      .then(console.log)
      .catch((response) => console.log(response.error))
    handleClose(event);
    // history.push(route.ALBUMS)
  }
  const handleDeleteAlbum = (event) => {
    console.log("handleEditAlbum event", event);
    ServerRequest(`data/album/${album._id}`, "DELETE")
      .then(console.log)
      .catch((response) => console.log(response.error))
    handleClose(event);
    // history.push(route.ALBUMS)
  }

  return (
    <div className={styles["EditAlbum-wrap"]}> 
        <h1 className={styles["EditAlbum-title"]}>Edit Album</h1>
          <h4>Album name*</h4>
            <Input
              type="text"
              name={"title"}
              placeholder={album.title}
              onChange={handleInput}
              required
            />
          <h4>Description</h4>
            <textarea 
              // autoFocus
              className={styles["EditAlbum-textarea"]}
              type="text"
              name={"description"}
              placeholder={album.description}
              onChange={handleInput}
            />
          <h4>Image</h4>
            <Input
              type="text"
              name={"image"}
              placeholder={album.image}
              onChange={handleInput}
              required
            />
        <div className={styles["EditAlbum-button"]}>
        {
          (editedAlbum.title === undefined || editedAlbum.title === "" || editedAlbum.title === " ")
          &&
          <>
            <MyButton variant="darkBlue" size="40%" onClick={handleDeleteAlbum} >
              Delete
            </MyButton>
            <MyButton variant="pink-or" size="40%" onClick={handleEditAlbum} >
              Submit changes
            </MyButton>
          </>
          }
        </div>
    </div>
  )
}
