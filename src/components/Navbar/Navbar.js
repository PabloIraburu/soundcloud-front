import React from "react";
import soundcloud from "../../img/soundcloud.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div>
      <a className='logotext' href='/home'>
        <img className='logo' src={soundcloud} alt='logo' />
        Soundmist
      </a>
      <div className='directions'>
        <a className='creators' href='/Creators'>
          For Creators
        </a>
      </div>
    </div>
  );
};

export default Navbar;
