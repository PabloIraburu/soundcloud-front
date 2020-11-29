import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { ServerRequest } from "../Helpers/ServerRequest";
import { setJWT } from "../../utils/LocalStorage.utils";
import "./LoginForm.css";

const LoginForm = () => {

    const [user, setUser] = useState({});
    const { login } = useForm();

    //redirect page with history
    const history = useHistory;

    const handleInput = (event) => {
        const { value, name } = event.target;
        setUser((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    }

    const handleSubmit = (event) => {

        //fetch localhost:3000/register
        ServerRequest("login", "GET", user)
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
            <input type="email" name="email" onChange={handleInput} ref={login({ required: true })} placeholder="Email" />
            <input type="password" name="password" onChange={handleInput} ref={login({ pattern: /^[A-Za-z0-9]+$/i })} placeholder="Password" />
            <button onClick={handleSubmit}>Sign In</button>
            {/* </form>     */}
        </>
    );
}

export default LoginForm;