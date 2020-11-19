import React from "react";
import "./cover.css";


const songFeeder= [
  {'Song Name': 'Physical Education', 'Artist Name': 'Animals as Leaders', 'Cover url':'https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg'},
  {'Song Name': 'Para Mexer', 'Artist Name': 'Animals as Leaders', 'Cover url':'https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg'},
  {'Song Name': 'Street Fighter Mas', 'Artist Name': 'Kamasi Washington', 'Cover url':'https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg'},
  {'Song Name': 'Gone', 'Artist Name': 'Anderson Paak', 'Cover url':'https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg'},
  {'Song Name': 'Moments', 'Artist Name': 'Kenneth Whalum', 'Cover url':'https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg'},
  {'Song Name': 'Esentielles', 'Artist Name': 'Ibrahim Maalouf', 'Cover url':'https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg'},
  {'Song Name': 'Nakamarra', 'Artist Name': 'Hiatus Kaiyote', 'Cover url':'https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg'},
  {'Song Name': 'Drunk', 'Artist Name': 'Sungazer', 'Cover url':'https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg'},
  {'Song Name': 'Boom Bap', 'Artist Name': 'Woo Park', 'Cover url':'https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg'},
  {'Song Name': 'Modern Value', 'Artist Name': 'Victoria', 'Cover url':'https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg'},
  {'Song Name': 'Tour', 'Artist Name': 'Evan Marien', 'Cover url':'https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg'},
]

const artistName='Nombre del artista'
const plays='Reproducciones'
const likes='Likes'
export default function CoverInfo() {
  const rand = Math.floor(Math.random()*10)

  const songName= songFeeder[rand]
  return (
    <div>
      <a href='#' className='cover'>
        <img
          src='https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg'
          alt='cover'
        />
        <p className='songName'>{songName}</p>
        <p className='artistName'>{artistName}</p>
        <div className='numbers'>
          <p className='plays'>{plays}</p>
          <p className='likes'>{likes}</p>
        </div>
      </a>
    </div>
  );
}
