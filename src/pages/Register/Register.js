import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { ServerRequest } from "../../helpers/ServerRequest";
import { setJWT } from "../../utils/LocalStorage.utils";
import { Input } from '../../components/Input/Input';
import { Avisos } from '../../components/Avisos/Avisos';
import { DISCOVER } from '../../routes/routes';
import { existNumber, existUppercase, validateMaxLength, validateMinLength } from "../../utils/FormValidation";
import { inputValidation } from "../../controllers/inputValidation";
import "./Register.css";
import { MyButton } from '../../components/MyButton/MyButton';


export const Register = ({ handleCloseRegister, openLogin }) => {

    const history = useHistory();
    const [newUser, setNewUser] = useState({
        "image": "https://previews.123rf.com/images/jemastock/jemastock1701/jemastock170102174/70024333-silhouette-headphones-music-listen-mobile-vector-illustration.jpg"
    });
    const [registerFail, setRegisterFail] = useState({ message: null, color: null });
    const [errors, setErrors] = useState({ message: null, color: null });
    const inputValidators = {
        password: [validateMinLength, existNumber, existUppercase],
        username: [validateMinLength, validateMaxLength],
        nombre: [validateMinLength]
    }

    //Introduce los datos de los inputs en el objeto newUser
    const handleInput = (event) => {
        const { value, name } = event.target;
        setNewUser((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
        if (!value) return setErrors(prevErrors => ({ ...prevErrors, [name]: '' }))
        const error = inputValidation(value, inputValidators[name], { minLength: 8, maxLength: 12 });
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error
        }));
    }

    //Envía datos del formulario al db
    const handleSubmit = () => {
        //Petición al servidor de tipo POST - fetch localhost:3300/register
        ServerRequest("register", "POST", newUser)
            .then((response) => {
                setJWT(response.token);
                setRegisterFail({ message: "Wellcome to SoundMist", color: 'success' });
                //Manda al usuario a la home tras el registro completado
                setTimeout(() => {
                    history.push(DISCOVER);
                }, 2000);
            })
            .catch((response) => setRegisterFail(response.error));
    };

    //Gestiona funcionalidad modal
    const handleOpenLogin = (e) => {
        openLogin()
        handleCloseRegister(e);
    }

    return (
        <div className="Register">
            <h1>Be part of our SoundFamily</h1>
            <p>Get a million songs with you, best artits and playlists. All for you in all your devices.</p>
            <Input type={"text"} name={"name"} onChange={handleInput} placeholder={"Name"} />
            <Avisos flag={errors.nombre} type={errors.nombre && 'warning'} />

            <Input type={"email"} name={"email"} onChange={handleInput} placeholder={"E-mail"} />
            <Input type={"password"} name={"password"} onChange={handleInput} placeholder={"Password"} />
            <Avisos flag={errors.password} type={errors.password && 'warning'} />

            <Avisos flag={registerFail.message} type={registerFail.color} />

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


