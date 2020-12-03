import React from 'react';
import "./Input.css";

export const Input = ({ type, name, onChange, placeholder, ref }) => {
  return (
    <div className="Input-wrap">
      <input type={type} name={name} onChange={onChange} placeholder={placeholder} ref={ref} />
      <i></i>
    </div>
  )
}
