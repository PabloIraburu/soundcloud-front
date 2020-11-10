import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
function RegisterForm() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return (
      userName.length > 0 &&
      email.length > 0 &&
      age.length &&
      password.length > 8
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    //fetch localhost:3000/register
  }
  //Also Returns a sing up Form with 3 social log options and a Email and password option.
  return (
    <div className='RegisterForm'>
      <h1>Create your SoundMist account</h1>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId='username' bsSize='large'>
          <FormLabel>Username:</FormLabel>
          <FormControl
            autoFocus
            type='username'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormGroup>
        ​
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
        <FormGroup controlId='age' bsSize='large'>
          <FormLabel>Age:</FormLabel>
          <FormControl
            type='age'
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </FormGroup>
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
          Create Account
        </Button>
      </form>
    </div>
  );
}
export default RegisterForm;
