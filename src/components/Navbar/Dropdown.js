import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuItems } from './MenuItems';
import './Dropdown.css';

function Dropdown(){
        const [click, setClick] = useState(false);

        const handleClick = () => setClick(!click);

    return( 
        <>
        <ul onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
        >
        {MenuItems.map((data, i) =>{
            return(
                <li key={i}>
                    <Link
                        className={data.cName}
                        to={data.path}
                        onClick={() => setClick(false)}
                        >
                        {data.title}
                    </Link>
                </li>
            );
        })}    
        </ul>
    </>
    );

}

export default Dropdown;