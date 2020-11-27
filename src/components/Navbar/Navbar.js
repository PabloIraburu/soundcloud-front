import React from "react";
import soundcloud from "../../img/soundcloud.png";
import "./Navbar.css";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
      <div className="Navbar-link">
        <nav className="nav">
          <ul className="link-ul">
            <li>
            
              </li>
            <li>
              <Link className="link" to="/discover">inicio</Link>
            </li>
            <li>
              <Link className="link" to="/Stream">Stream</Link>
            </li>
            <li>
              <Link className="link" to="/biblioteca">biblioteca</Link>
            </li>
            <li>
              <input  type="search" placeholder="Buscar"></input>
            </li>
            <li>
              <Link className="link" to="/subir">subir</Link>
            </li>
          </ul>
        </nav>
       </div> 
  );
};

export default Navbar ;



/* <a className='logotext' href='/home'>
<img className='logo' src={soundcloud} alt='logo' />
Soundmist
</a>
<div className='directions'>
<a className='creators' href='/Creators'>
  For Creators
</a>
</div> */

