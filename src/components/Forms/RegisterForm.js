import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { ServerRequest } from "../Helpers/ServerRequest";
import { setJWT } from "../../Utils/LocalStorage.utils";
import "./RegisterForm.css";

const RegisterForm = () => {

    const [newUser, setNewUser] = useState({});
    const { register } = useForm();

    //redirect page with history
    const history = useHistory;

    const handleInput = (event) => {
        const { value, name } = event.target;
        setNewUser((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    }

    const handleSubmit = (event) => {

        //fetch localhost:3000/register
        ServerRequest("register", "POST", newUser)
            .then((response) => {
                setJWT(response.token);
                setTimeout(() => {
                    history.push("/");
                }, 2000);
            })
            .catch((response) => console.log(response.error))
        //resetea los campos
    };
    return (
        <>
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <input type="text" name="name" onChange={handleInput} ref={register({ required: true, maxLength: 8 })} placeholder="Name" />
            <input type="email" name="email" onChange={handleInput} ref={register({ required: true })} placeholder="Email" />
            <input type="password" name="password" onChange={handleInput} ref={register({ pattern: /^[A-Za-z0-9]+$/i })} placeholder="Password" />
            <button onClick={handleSubmit}>Registrarse</button>
            {/* </form>     */}
        </>
    );
}

export default RegisterForm;

