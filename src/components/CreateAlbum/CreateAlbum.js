import React, { useState } from "react";
import { Input } from "../Input/Input";
import { MyButton } from "../MyButton/MyButton";
import { ServerRequest } from "../../helpers/ServerRequest";
import { DecodeToken } from "../../utils/DecodeToken";
import { getToken } from "../../utils/LocalStorage.utils";
import { useHistory } from "react-router-dom";
import * as route from '../../routes/routes';
import styles from "./CreateAlbum.module.css";

const CreateAlbum = ({ handleClose }) => {

  const userId = DecodeToken(getToken()).id;
  const history = useHistory();

  const [newAlbum, setNewAlbum] = useState({
    "id_owner": userId
  });

  //Introduce los datos de los inputs en el objeto newPlaylist
  const handleInput = (event) => {
    const { value, name } = event.target;
    setNewAlbum((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
    console.log(newAlbum);
  }

  const handleCreateNewAlbum = (event) => {
    //Petición al servidor de tipo POST - fetch localhost:3300/register
    ServerRequest("data/album", "POST", newAlbum)
      .then(console.log)
      .catch((response) => console.log(response.error))
    handleClose(event);
    history.push(route.ALBUMS)
  }

  return (
    <div className={styles["CreateAlbum-wrap"]}>
      <h1 className={styles["CreateAlbum-title"]}>Create Album</h1>
      <h4>Album name*</h4>
      <Input
        type="text"
        name="title"
        placeholder={"Album name"}
        onChange={handleInput}
        required
      />
      <h4>Author*</h4>
      <Input
        type="text"
        name="author"
        placeholder={"Album author"}
        onChange={handleInput}
        required
      />
      <h4>Description</h4>
      <textarea
        // autoFocus
        className={styles["CreateAlbum-textarea"]}
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
      <div className={styles["CreateAlbum-button"]}>
        {
          (newAlbum.title === undefined || newAlbum.title === "" || newAlbum.title === " " ||
            newAlbum.author === undefined || newAlbum.author === "" || newAlbum.author === " ")
            ? <p>Name and author field are required*</p>
            : <MyButton variant="pink-or" size="50%" onClick={handleCreateNewAlbum} >
              Create
            </MyButton>
        }
      </div>

    </div>
  )
}
export default CreateAlbum;