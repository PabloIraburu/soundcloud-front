import React from "react";
import "./cover.css";


const songFeeder= [
  {'songName': 'Physical Education', 'artistName': 'Animals as Leaders', 'coverUrl':'https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg'},
  {'songName': 'Para Mexer', 'artistName': 'Animals as Leaders', 'coverUrl':'https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg'},
  {'songName': 'Street Fighter Mas', 'artistName': 'Kamasi Washington', 'coverUrl':'https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg'},
  {'songName': 'Gone', 'artistName': 'Anderson Paak', 'coverUrl':'https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg'},
  {'songName': 'Moments', 'artistName': 'Kenneth Whalum', 'coverUrl':'https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg'},
  {'songName': 'Esentielles', 'artistName': 'Ibrahim Maalouf', 'coverUrl':'https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg'},
  {'songName': 'Nakamarra', 'artistName': 'Hiatus Kaiyote', 'coverUrl':'https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg'},
  {'songName': 'Drunk', 'artistName': 'Sungazer', 'coverUrl':'https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg'},
  {'songName': 'Boom Bap', 'artistName': 'Woo Park', 'coverUrl':'https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg'},
  {'songName': 'Modern Value', 'artistName': 'Victoria', 'coverUrl':'https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg'},
  {'songName': 'Tour', 'artistName': 'Evan Marien', 'coverUrl':'https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg'},
]

const artistName='Nombre del artista'
const plays='Reproducciones'
const likes='Likes'
export default function CoverInfo() {
  const rand = Math.floor(Math.random()*10)

  const song= songFeeder[rand]
  return (
    <div>
      <a href='#' className='cover'>
        <img
          src='https://upload.wikimedia.org/wikipedia/en/1/1f/The_Joy_Of_Motion2014.jpg'
          alt='cover'
        />
        <p className='songName'>{song.songName}</p>
        <p className='artistName'>{artistName}</p>
        <p>{song.artistName}</p>
        <div className='numbers'>
          <p className='plays'>{plays}</p>
          <p className='likes'>{likes}</p>
        </div>
      </a>
    </div>
  );
}
