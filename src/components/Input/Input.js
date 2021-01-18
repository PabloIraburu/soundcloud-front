import React from 'react';
import "./Input.css";

export const Input = (props) => {
  return (
    <div className="Input-wrap">
      <input {...props} />
      <i></i>
    </div>
  )
}
