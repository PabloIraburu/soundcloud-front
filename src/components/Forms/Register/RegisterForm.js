import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { ServerRequest } from "../../helpers/ServerRequest";
import { setJWT } from "../../utils/LocalStorage.utils";
import "./RegisterForm.css";

const RegisterForm = () => {

    const [newUser, setNewUser] = useState({});
    const { register } = useForm();

    //redirect page with history
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
                    history.push("/");
                }, 2000);
                console.log('El nuevo usuario se ha creado en la bbdd', newUser);

            })
            .catch((response) => console.log(response.error))
    };

    return (
        <>
            <input type="text" name="name" onChange={handleInput} ref={register({ required: true, maxLength: 8 })} placeholder="Name" />
            <input type="email" name="email" onChange={handleInput} ref={register({ required: true })} placeholder="Email" />
            <input type="password" name="password" onChange={handleInput} ref={register({ pattern: /^[A-Za-z0-9]+$/i })} placeholder="Password" />
            <button onClick={handleSubmit}>Registrarse</button>
        </>
    );
}

export default RegisterForm;

