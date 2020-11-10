import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 8;
  }
  function handleSubmit(event) {
    event.preventDefault();
    //fetch url= localhost:3001/token
  }
  //Also Returns a sing up Form with 3 social log options and a Email and password option.
  return (
    <div className='Login'>
      <h1>Create your SoundMist account</h1>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId='email' bsSize='large'>
          <FormLabel>Email:</FormLabel>
          <FormControl
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <small>Enter a valid Email.</small>
        </FormGroup>
        ​
        <FormGroup controlId='password' bsSize='large'>
          <FormLabel>Password:</FormLabel>
          <FormControl
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
          />
          <br></br>
          <small>More than 8 characters.</small>
        </FormGroup>
        <Button
          block
          onclick={handleSubmit}
          bsSize='large'
          disabled={!validateForm()}
          type='submit'
        >
          Log in
        </Button>
      </form>
    </div>
  );
};
export default LogIn;
