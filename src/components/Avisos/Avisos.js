import React from "react";
import "./Avisos.css";

export const Avisos = ({ flag, type }) => {
    return (
        <>
            {type === 'error' && <p className='mensaje error'>⛔ {flag && flag}</p>}
            {type === 'success' && <p className='mensaje success'>🥳 {flag && flag}</p>}
            {type === 'warning' && <p className='mensaje warning'>⚠️ {flag && flag}</p>}
        </>
    );
};
