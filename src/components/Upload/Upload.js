import React, { useState, useRef } from "react";
import { ServerRequest } from "../../helpers/ServerRequest";
import { Input } from "../Input/Input";
import { MyButton } from "../MyButton/MyButton";
import { Selector } from "../Selector/Selector";
import "./Upload.css";
import { getToken } from "../../utils/LocalStorage.utils";

export const Upload = () => {
  const [song, setSong] = useState({});
  const fileInputEl = useRef(null);
  // const history = useHistory();

  //Introduce los datos de los inputs en el objeto newUser
  const handleInput = (event) => {
    const { value, name } = event.target;
    setSong((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = (file) => {
    // Petición al servidor de tipo POST - fetch localhost:3300/register
    ServerRequest("data/song", "POST", song)
      .then((response) => {
        console.debug(file, file[0]);
        const data = new FormData();
        data.append("file", file[0]);
        data.append("filename", song.title);
        // data.append("song_id", response._id);

        /*ServerRequestSong("track", "POST", data)
          .then((response) => console.log(response))
          .catch((response) => console.log(response.error));*/
        const options = {
          method: "POST",
          body: data,
          headers: new Headers({
            Authorization: "Bearer " + JSON.parse(getToken()),
          }),
          mode: "cors",
        };

        fetch("http://localhost:3300/track", options)
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            }
            return Promise.reject(response.status);
          })
          .then((payload) => console.log(`Saved song with id: ${payload}`))
          .catch((error) => console.log(error));
      })
      .catch((response) => console.log(response.error));
  };

  const categories = [
    "Bachata",
    "Baladas",
    "Blues",
    "Bolero",
    "Bossa Nova",
    "Celta",
    "Clásica",
    "Country",
    "Criollo",
    "Cumbia",
    "Disco",
    "Dubstep",
    "Electrónica",
    "Electro Pop",
    "Flamenco",
    "Folk",
    "Funk",
    "Garage Rock",
    "Gospel",
    "Heavy Metal",
    "Hip Hop",
    "Indie",
    "Jazz​",
    "Merengue",
    "Polka",
    "Pop",
    "Punk",
    "Ranchera",
    "Rap",
    "Rap Rock",
    "Reggae",
    "Reggaeton",
    "Rock",
    "Rock and Roll",
    "Rumba",
    "Rhythm and Blues",
    "Salsa",
    "Samba",
    "Ska",
    "Son",
    "Soul",
    "Swing",
    "Tango",
    "Trash metal",
    "Trap",
    "Trova",
    "Vals",
    "Vallenato",
  ];

  return (
    <div>
      <h1 className="title">Upload file</h1>
      <Input
        type="text"
        name="title"
        onChange={handleInput}
        placeholder={"Song title"}
        required
      />
      <Input
        type="text"
        name="artist"
        onChange={handleInput}
        placeholder={"Artist name"}
        required
      />
      <Input
        type="text"
        name="image"
        onChange={handleInput}
        placeholder={"Url song image"}
        required
      />
      <Selector name="category" id="category" onChange={handleInput} required>
        {categories.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </Selector>

      <input
        type="file"
        id="fileupload"
        accept=".mp3,audio/*"
        ref={fileInputEl}
        className="input-upload"
      />
      <MyButton
        onClick={() => handleSubmit(fileInputEl.current.files)}
        variant="pink-or"
        size="50%"
        className="button-custom"
      >
        Upload file
      </MyButton>
    </div>
  );
};

// Categorías musicales
// fuente: https://estilonext.com/cultura/tipos-de-musica-generos-musicales
