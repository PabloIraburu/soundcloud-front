import React from 'react';
import "./Selector.css";

export const Selector = ({ name, id, onChange, children }) => {
  return (
    <div className="Selector-wrap">
      <select name={name} id={id} onChange={onChange} className="selector">
        {children}
      </select>
    </div>
  )
}
