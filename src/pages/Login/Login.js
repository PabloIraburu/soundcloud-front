import React, {createContext, useContext, useState} from 'react';
import { useHistory } from "react-router-dom";
import { ServerRequest } from "../../helpers/ServerRequest";
import { setJWT } from "../../utils/LocalStorage.utils";
import { Input } from '../../components/Input/Input';
import { MyButton } from '../../components/MyButton/MyButton';
import { DISCOVER } from '../../routes/routes';
import "./Login.css";
import {UserContext} from "../../components/UserContext/contextProvider"


export const Login = ({ handleCloseLogin, openRegister }) => {
    const [user, setUser] = useState({})
    const history = useHistory();

    //Introduce los datos de los inputs en el objeto newUser
    const handleInput = (event) => {
        const { value, name } = event.target;
        setUser((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    }

    const handleSubmit = () => {
        //Petición al servidor de tipo POST - fetch localhost:3300/register
        ServerRequest("login", "POST", user)
            .then((response) => {
                setJWT(response.token);
                //Manda al usuario a la home tras el registro completado
                history.push(DISCOVER);
            })
            .catch((response) => console.log(response.error))
    };

    //Gestión modal registro
    const handleOpenRegister = (e) => {
        openRegister()
        handleCloseLogin(e);
    }
    return (
        <div className="Login">
            <h1>¡Hola de nuevo!</h1>
            <p>Te echábamos de menos, nos alegra verte de vuelta.</p>
            <Input type={"email"} name={"email"} onChange={handleInput} placeholder={"E-mail"} />
            <Input type={"password"} name={"password"} onChange={handleInput} placeholder={"Password"} />
            <div className="GoToRegister-wrap">
                <div className="GoToRegister-text">
                    <p>¿Aún no tienes cuenta?</p>
                    <p onClick={handleOpenRegister} className="GoToRegister-link">Register</p>
                </div>
                <MyButton onClick={handleSubmit} variant="pink-or" size="50%">Access</MyButton>
            </div>

        </div>
    );
}


