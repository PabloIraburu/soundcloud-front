import React, { useState } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css'
import Dropdown from './Dropdown';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

function Navbar(){
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const onMouseEnter = () => {
        if(window.innerWidth < 960){
            setDropdown(false);
        }else{
            setDropdown(true);
        }
    };
    const onMouseLeave = () => {
        if(window.innerWidth < 960){
            setDropdown(false);
        }else{
            setDropdown(false);
        }
    };

    
return(
    <>
        <nav className='navbar'>
            <Link to='/' 
            className='navbar-logo'>
                SM
            </Link>
            <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                    <Link to='/#' className='nav-links' onClick={closeMobileMenu}>
                        Inicio
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/#' className='nav-links' onClick={closeMobileMenu}>
                        Stream
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/#' className='nav-links' onClick={closeMobileMenu}>
                        Bibilioteca
                    </Link>
                </li>
               
                <li className='searcher'>
                    <form className="searcher" noValidate autoComplete="off">  
                    <Input placeholder="Placeholder" inputProps={{ 'aria-label': 'description', 'color':'red' }} />
                    </form>
                </li>
                <li className='nav-item'>
                    <Link to='/#' className='nav-links' onClick={closeMobileMenu}>
                       Inicia sesión
                    </Link>
                </li>
                <li className='nav-item'>
                    <Button/>
                </li>
                <li className='nav-item'>
                    <Link to='/#' className='nav-links' onClick={closeMobileMenu}>
                        Subir
                    </Link>
                </li>
                <li className='nav-item'
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                >
                    <Link to='/#' 
                    className='nav-links' 
                    onClick={closeMobileMenu}
                    >
                        <b>. . .</b>
                        
                    </Link>
                    {dropdown && <Dropdown/>}
                </li>
            </ul>
     
        </nav>
    </>
        );
    }
export default Navbar;