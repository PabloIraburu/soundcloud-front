import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { ServerRequest } from "../../helpers/ServerRequest";
import { setJWT } from "../../utils/LocalStorage.utils";
import { Input } from '../../components/Input/Input';
import { DISCOVER } from '../../routes/routes';
import "./Register.css";
import { MyButton } from '../../components/MyButton/MyButton';

export const Register = ({ handleCloseRegister, openLogin }) => {

    const [newUser, setNewUser] = useState({
        "image": "https://previews.123rf.com/images/jemastock/jemastock1701/jemastock170102174/70024333-silhouette-headphones-music-listen-mobile-vector-illustration.jpg"
    });
    const history = useHistory();

    //Introduce los datos de los inputs en el objeto newUser
    const handleInput = (event) => {
        const { value, name } = event.target;
        setNewUser((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    }

    //Envía datos del formulario al db
    const handleSubmit = () => {
        //Petición al servidor de tipo POST - fetch localhost:3300/register
        ServerRequest("register", "POST", newUser)
            .then((response) => {
                setJWT(response.token);
                //Manda al usuario a la home tras el registro completado
                history.push(DISCOVER);
            })
            .catch((response) => console.log(response.error))
    };

    //Gestiona funcionalidad modal
    const handleOpenLogin = (e) => {
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
                <MyButton onClick={handleSubmit} variant="pink-or" size="50%">Register</MyButton>
            </div>
        </div>
    );
}


