import React from "react";
import "./cover.css";

export default function CoverInfo() {
  return (
    <div>
      <a href='#' className='cover'>
        <img
          src='https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg'
          alt='cover'
        />
        <p className='songName'>Nombre de la cancion</p>
        <p className='artistName'>Nombre artista</p>
        <div className='numbers'>
          <p className='plays'>Reproducciones</p>
          <p className='likes'>Likes</p>
        </div>
      </a>
    </div>
  );
}
