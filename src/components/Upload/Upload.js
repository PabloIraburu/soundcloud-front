import React, { useState, useRef } from 'react';
// import { useHistory } from "react-router-dom";
import { ServerRequest } from "../../helpers/ServerRequest";
import { ServerRequestSong } from '../../helpers/ServerRequestSong';
import { Input } from '../Input/Input';
import { MyButton } from '../MyButton/MyButton';
import { Selector } from '../Selector/Selector';
import "./Upload.css";

export const Upload = () => {
    const [song, setSong] = useState({});
    const [file, setFile] = useState({});
    // const history = useHistory();

    //Introduce los datos de los inputs en el objeto newUser
    const handleInput = (event) => {
        const { value, name } = event.target;
        setSong((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    }

    const fileInput = useRef(null)
    const handleFile = () => {
        setFile(fileInput.current.files)
        console.log(fileInput);
        // uploadFile.current.file
    }

    const handleSubmit = (files) => {
        // Petición al servidor de tipo POST - fetch localhost:3300/register
        ServerRequest("data/song", "POST", song)
            .then((response) => {
                debugger;
                ServerRequestSong("track", "POST", { filename: song.title, file: files[0], song_id: response._id })
                    .then((response) => console.log(response))
                    .catch((response) => console.log(response.error));
            })
            .catch((response) => console.log(response.error));
    };

    return (
        <div>
            <h1>Upload file</h1>
            <Input type="text" name="title" onChange={handleInput} placeholder={"Song title"} required />
            <Input type="text" name="artist" onChange={handleInput} placeholder={"Artist name"} required />
            <Input type="text" name="image" onChange={handleInput} placeholder={"Url song image"} required />
            <Selector name="category" id="category" onChange={handleInput} required>
                <option value="reggae">Reggae</option>
                <option value="classic-music">Classic Music</option>
                <option value="opera">Opera</option>
                <option value="tradicional-music">Tradicional Music</option>
                <option value="jazz">Jazz</option>
                <option value="blues">Blues</option>
                <option value="rhythm">Rhythm</option>
                <option value="rock">Rock</option>
                <option value="pop">Pop</option>
                <option value="gospel">Gospel</option>
                <option value="soul">Soul</option>
                <option value="metal">Metal</option>
                <option value="country">Country</option>
                <option value="rap">Rap</option>
                <option value="electronic-music">Electronic Music</option>
                <option value="hip-hop">Hip-Hop</option>
                <option value="reggaeton">Reggaeton</option>
                <option value="bachata">Bachata</option>
                <option value="balada">Balada</option>
                <option value="salsa">Salsa</option>
                <option value="punk">Punk</option>
                <option value="cumbia">Cumbia</option>
                <option value="disco">Disco</option>
                <option value="mambo">Mambo</option>
                <option value="bolero">Bolero</option>
                <option value="folk">Folk</option>
                <option value="swing">Swing</option>
                <option value="trip-hop">Trip-Hop</option>
                <option value="new-age">New Age</option>
                <option value="bossa-nova">Bossa Nova</option>
            </Selector>
            <Input type="file" name="audio" onChange={handleFile} className="custom-file-input" ref={fileInput} />
            <MyButton onClick={handleSubmit} variant="pink-or" size="50%" className="button-custom">Upload file</MyButton>
        </div>
    )
};

// Categorías musicales
// fuente: https://estilonext.com/cultura/tipos-de-musica-generos-musicales