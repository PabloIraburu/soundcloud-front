import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { ServerRequest } from "../../helpers/ServerRequest";
import { setJWT } from "../../utils/LocalStorage.utils";
import { Input } from '../../components/Input/Input';
import { PROFILE } from '../../routes/routes';
import "./Login.css";

export const Login = () => {

    const [loginUser, setLoginUser] = useState({});

    //redirect page with history
    const history = useHistory();

    //Introduce los datos de los inputs en el objeto newUser
    const handleInput = (event) => {
        const { value, name } = event.target;
        setLoginUser((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    }

    const handleSubmit = () => {
        //Petición al servidor de tipo POST - fetch localhost:3000/register
        ServerRequest("login", "POST", loginUser)
            .then((response) => {
                setJWT(response.token);
                //Manda al usuario a la home tras el registro completado
                setTimeout(() => {
                    history.push(PROFILE);
                }, 2000);
            })
            .catch((response) => console.log(response.error))
    };

    return (
        <div className="Login">
            <h1>¡Hola de nuevo!</h1>
            <p>Te echábamos de menos, nos alegra verte de vuelta.</p>
            <Input type={"email"} name={"email"} onChange={handleInput} placeholder={"E-mail"}/>
            <Input type={"password"} name={"password"} onChange={handleInput} placeholder={"Password"}/>
            <button onClick={handleSubmit}>Acceder</button>
        </div>
    );
}


