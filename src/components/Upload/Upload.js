
import React, { useState, useRef, useContext } from "react";
import { Input } from "../Input/Input";
import { MyButton } from "../MyButton/MyButton";
import { Selector } from "../Selector/Selector";
import { getToken } from "../../utils/LocalStorage.utils";
import { UserContext } from "../../contexts/UserContext/contextProvider";
import { categories } from "../../data/categories";
import "./Upload.css";
import { API_URL } from "../../helpers/ServerRequest";
import logo from "../../img/logo.png";

export const Upload = ({ setForceReload, forceReload, handleClose, notify }) => {
    const [song, setSong] = useState({
        // "image": "https://previews.123rf.com/images/jemastock/jemastock1701/jemastock170102174/70024333-silhouette-headphones-music-listen-mobile-vector-illustration.jpg"
        "image": logo
    });
    const fileInputEl = useRef(null);
    const { userId } = useContext(UserContext);

    //Introduce los datos de los inputs en el objeto song
    const handleInput = (event) => {
        const { value, name } = event.target;
        setSong((prevValue) => ({
            ...prevValue,
            [name]: value,
            "id_author": userId
        }));
    };


    const handleSubmit = (file, e) => {
        const data = new FormData();
        data.append("file", file[0]);
        data.append("filename", file[0].name);
        data.append("title", song.title);
        data.append("album", song.album);
        data.append("artist", song.artist);
        data.append("image", song.image);
        data.append("category", song.category);
        data.append("id_author", userId)

        const options = {
            method: "POST",
            body: data,
            headers: new Headers({
                Authorization: "Bearer " + JSON.parse(getToken()),
            }),
            mode: "cors",
        };
        // Petición al servidor de tipo POST - fetch localhost:3300/register
        fetch(`${API_URL}/track`, options)
            .then((response) => {
                if (response.status === 201) {
                    console.log(response)
                    return response;
                }
                // return Promise.reject(response.status);
            })
            .then((response) => {
                console.log(response.json())
                console.log(`Saved song with id: ${response.id}`)
                console.log(song)
                setForceReload(!forceReload)
                handleClose(e)
                notify('Song Uploaded Correctly')
            })
            .catch((error) => console.log(error));

    };

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
                name="album"
                onChange={handleInput}
                placeholder={"Album name"}
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

