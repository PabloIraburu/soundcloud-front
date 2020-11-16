import React from "react";
import logo from "../../../img/Logo.jpg";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div>
      <a className='logotext' href='/home'>
        <img className='logo' src={logo} alt='logo' />
        Soundmist
      </a>
      <div className='directions'>
        <a className='creators' href='/Creators'>
          For Creators
        </a>
        <a className='newUser' href='/NewUser'>
          Create Account
        </a>
        <a className='login' href='/SignIn'>
          Sign in
        </a>
      </div>
    </div>
  );
};

export default Navbar;
