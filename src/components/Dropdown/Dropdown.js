import React, { useState } from 'react'
import "./dropdown.css"

const Dropdown = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const title = props.title; // string
    const options = props.options; // array
 
    return (
        <div className="dropdown">
            <p className="dropdown-title" onClick={() => setIsOpen(!isOpen)}>{title}</p>
        {isOpen && (<div className="dropdown-content">
            {options.map(option => (
                <a href={option.href} className="dropdown-href">{option.text}</a>
            ))}
        </div>)}

        </div>
    )
}

export default Dropdown;