import React from "react";

import Carousel from "../../components/Carousel";
import Search from "../../components/Search";
import logo from "../../img/Logo.jpg";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className='App'>
      <Navbar />
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
      <Carousel />
      <Search />
    </div>
  );
};

export default Home;
