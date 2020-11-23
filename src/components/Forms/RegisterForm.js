import React  from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { ServerRequest } from "../Helpers/ServerRequest";
import { setJWT } from "../../Utils/LocalStorage.utils";
import  "./RegisterForm.css";

const RegisterForm = () => {

    
    const { register, handleSubmit } = useForm();

    //redirect page with history
    const history = useHistory;

    const onSubmit = newUser => { 
              
        //fetch localhost:3000/register
        ServerRequest("register","POST", newUser)
            .then((response) => {
                setJWT(response.token);
                setTimeout(() => {
                history.push("/");
                }, 2000);
            })
            .catch((response) => console.log(response.error))
            //resetea el
    
    } ;
    return (

        <form onSubmit={handleSubmit(onSubmit)}>
        <input name="name" ref={register({ required: true, maxLength: 8 })} />
        <input name="email" ref= {register({ required: true })}/>
        <input name="password" ref={register({ pattern: /^[A-Za-z0-9]+$/i })} />
        <input type="submit" />
      </form>    
      
    );
}

export default RegisterForm;

