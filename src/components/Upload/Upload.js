import React, { useState} from 'react';
// import { useHistory } from "react-router-dom";
import { ServerRequest } from "../../helpers/ServerRequest";
import { Input } from '../Input/Input';
import { MyButton } from '../MyButton/MyButton';

export const Upload = () => {
    const [song, setSong] = useState({});
    // const history = useHistory();

    //Introduce los datos de los inputs en el objeto newUser
    const handleInput = (event) => {
        const { value, name } = event.target;
        setSong((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    }

    const handleSubmit = () => {
        //Petición al servidor de tipo POST - fetch localhost:3300/register
        ServerRequest("track/song", "POST", song)
            .then((response) => console.log(response))
            .catch((response) => console.log(response.error))
    };

    return (
        <div>
            <h1>Upload file</h1>
            <Input type="text" name="title" onChange={handleInput} placeholder={"Song title"} required />
            <Input type="text" name="image" onChange={handleInput} placeholder={"Url song image"} required />
            <Input type="file" name="audio" onChange={handleInput} />
            <MyButton onClick={handleSubmit} variant="pink-or" size="50%">Upload file</MyButton>
        </div>
    )
};
