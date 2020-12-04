import React, { useState } from 'react';
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

    const handleFile = (event) => {
        let inputFile = event.target.files[0];
        // console.log(inputFile);
        const data = new FormData();
        data.append('file', inputFile);
    }

    const handleSubmit = () => {
        // Petición al servidor de tipo POST - fetch localhost:3300/register
        ServerRequest("data/song", "POST", song)
            .then((response) => {
                ServerRequestSong("track", "POST", { filename: song.title, file: file, song_id: response._id })
                    .then((response) => console.log(response))
                    .catch((response) => console.log(response.error));
            })
            .catch((response) => console.log(response.error));
    };
    
    const categories = ["Reggae", "Classic Music", "Opera", "Traditional Music", "Jazz", "Blues", "Rhythm", "Rock", "Pop", "Gospel", "Soul", "Metal", "Country", "Rap", "Electronic Music", "Hip-Hop", "Reggeaton", "Bachata", "Salsa", "Balada", "Punk", "Cumbia", "Disco", "Mambo", "Bolero", "Folk", "Swing", "New Age", "Bossa Nova"];
    
    return (
        <div>
            <h1>Upload file</h1>
            <Input type="text" name="title" onChange={handleInput} placeholder={"Song title"} required />
            <Input type="text" name="artist" onChange={handleInput} placeholder={"Artist name"} required />
            <Input type="text" name="image" onChange={handleInput} placeholder={"Url song image"} required />
            <Selector name="category" id="category" onChange={handleInput} required>
                {categories.map((category) => <option value={category} key={category}>{category}</option>)}
            </Selector>
            <Input type="file" name="audio" onChange={handleFile} className="custom-file-input" />
            <MyButton onClick={handleSubmit} variant="pink-or" size="50%" className="button-custom">Upload file</MyButton>
        </div>
    )
};

// Categorías musicales
// fuente: https://estilonext.com/cultura/tipos-de-musica-generos-musicales