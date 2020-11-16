import React, { useState } from "react";

import Carousel from "../../components/Carousel";
import Search from "../../components/Search";
import logo from "../../img/Logo.jpg";
import CoverInfo from "../../components/Cover/CoverInfo";
import Navbar from "./Navbar";
import { ModalLogin } from "../../components/modalLogin/ModalLogin";
import "./homeStyles.css";

const Home = () => {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const closeModalLoginHandler = () => setShowModalLogin(false);
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
        <button margin-left="50%" onClick={() => setShowModalLogin(true)}className='newUser' >
          Create Account
        </button>
        <button className="btn-login" onClick={() => setShowModalLogin(true)}>just passing by</button>
        <ModalLogin showModalLogin={showModalLogin} closeModalLoginHandler={closeModalLoginHandler}/>
        <a className='login-modal' href='/SignIn'>
          Sign in
        </a>
      </div>
      <button className="btn-login" onClick={() => setShowModalLogin(true)}>just passing by</button>
      <Carousel />
      <Search />
      <CoverInfo />
    </div>
  );
};

export default Home;
