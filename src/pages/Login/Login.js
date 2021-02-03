import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { ServerRequest } from "../../helpers/ServerRequest";
import { setJWT } from "../../utils/LocalStorage.utils";
import { Input } from '../../components/Input/Input';
import { MyButton } from '../../components/MyButton/MyButton';
import { DISCOVER } from '../../routes/routes';
import { inputValidation } from "../../controllers/inputValidation";
import { validateMinLength, existSpecial } from "../../utils/FormValidation";

import { Avisos } from '../../components/Avisos/Avisos';

import "./Login.css";


export const Login = ({ handleCloseLogin, openRegister }) => {

    const history = useHistory();
    const [user, setUser] = useState({});
    const [loginFail, setLoginFail] = useState({ message: null, color: null });
    const [errors, setErrors] = useState({ message: null, color: null });
    const inputValidators = {
        password: [validateMinLength],
        email: [existSpecial]
    }

    //Introduce los datos de los inputs en el objeto newUser
    const handleInput = (event) => {
        const { value, name } = event.target;
        setUser((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));

        if (!value) return setErrors(prevErrors => ({ ...prevErrors, [name]: '' }))
        const error = inputValidation(value, inputValidators[name], { minLength: 2 });
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error
        }));
    }

    const handleSubmit = () => {
        //Petición al servidor de tipo POST - fetch localhost:3300/login
        ServerRequest("login", "POST", user)
            .then((response) => {
                setJWT(response.token);
                //mensaje success
                setLoginFail({ message: "Welcome again", color: 'success' });
                //Manda al usuario a la home tras el registro completado
                setTimeout(() => {
                    history.push(DISCOVER);
                }, 2000);
            })
            .catch((response) => setLoginFail({ message: response.message, color: 'error' }))
    };

    //Gestión modal registro
    const handleOpenRegister = (e) => {
        openRegister()
        handleCloseLogin(e);
    }

    return (
        <div className="Login">
            <h1>¡Hey!</h1>
            <p>Nice to see you again!</p>
            <Input type={"email"} name={"email"} onChange={handleInput} placeholder={"E-mail"} />
            <Avisos flag={errors.email} type={errors.email && 'warning'} />

            <Input type={"password"} name={"password"} onChange={handleInput} placeholder={"Password"} />
            <Avisos flag={errors.password} type={errors.password && 'warning'} />

            <Avisos flag={loginFail.message} type={loginFail.color} />

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


