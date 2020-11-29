import React, { useState } from 'react';
// import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { ServerRequest } from "../../helpers/ServerRequest";
import { setJWT } from "../../utils/LocalStorage.utils";
import { Input } from '../../components/Input/Input';
import { Modal } from "../../components/Modal/Modal";
import { Login } from "../../pages/Login/Login";
import { DISCOVER } from '../../routes/routes';
import "./Register.css";

export const Register = ({ handleCloseRegister, openLogin }) => {

    const [newUser, setNewUser] = useState({});
    const history = useHistory();

    //Introduce los datos de los inputs en el objeto newUser
    const handleInput = (event) => {
        const { value, name } = event.target;
        setNewUser((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    }

    const handleSubmit = () => {
        //Petición al servidor de tipo POST - fetch localhost:3000/register
        ServerRequest("register", "POST", newUser)
            .then((response) => {
                setJWT(response.token);
                //Manda al usuario a la home tras el registro completado
                setTimeout(() => {
                    history.push(DISCOVER);
                }, 2000);
            })
            .catch((response) => console.log(response.error))
    };


    const handleOpenLogin = (e) => {
        // setOpenModalLogin(!openModalLogin);
        openLogin()
        handleCloseRegister(e);
    }


    return (
        <div className="Register">
            <h1>Súmate a la mejor plataforma de música</h1>
            <p>Accede a millones de canciones, de todos los estilos, en todos tus dispositivos. Solo te llevará 30 segundos.</p>
            <Input type={"text"} name={"name"} onChange={handleInput} placeholder={"Name"} />
            <Input type={"email"} name={"email"} onChange={handleInput} placeholder={"E-mail"} />
            <Input type={"password"} name={"password"} onChange={handleInput} placeholder={"Password"} />
            <div className="GoToLogin-wrap">
                <div className="GoToLogin-text">
                    <p>¿Ya tienes cuenta?</p>
                    <p onClick={handleOpenLogin} className="GoToLogin-link">Acceder</p>
                </div>
                <button onClick={handleSubmit}>Registrarse</button>
            </div>

        </div>
    );
}


