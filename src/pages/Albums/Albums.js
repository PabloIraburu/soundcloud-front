import React, { useState, useContext } from 'react';
import { CoverMd } from "../../components/CoverMd/CoverMd";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { SongsContext } from "../../contexts/SongsContext/songsContext";
import styles from './Albums.module.css';

export const Albums = () => {

  const { songs } = useContext(SongsContext);

//Actualizar backend, sino trackId no funcionará
// const songsId = songs.map(songId => songId.trackId);
// console.log("songsId", songsId);

const trackIds = ["5fc4d698c891ef40a7a07580", "5fc4e79bb0b05e5bc165ef9e"];
const [currentTrack, setCurrentTrack] = useState(0);

const handleClickNext = () => {
  if (currentTrack < songs._id.length - 1) {
    setCurrentTrack(currentTrack + 1);
  }
};

const handleClickPrev = () => {
  if (currentTrack > 0) {
    setCurrentTrack(currentTrack - 1);
  }
};

  return (
    <>
      <h1>Albums</h1>
      
      {
        (songs.lenght !== 0) &&
        <div className={styles["Albums-list"]}>
            {songs.map((song) => (
              <CoverMd
                  key={song._id}
                  title={song.title}
                  categories={song.category}
                  author={song.artist}
                  img={song.image}
              />
            ))}
        </div>
      }

      <audio controls="controls">
          <source src={`http://localhost:3300/track/600237f7fea6f3048545a5a3`} type="audio/mpeg" />
          {/* <source src={`http://localhost:3300/track/${songsId[currentTrack]}`} type="audio/mpeg" /> */}
      </audio>

        <div className={styles["Landing-player"]}>
        <AudioPlayer
          onClickNext={handleClickNext}
          onClickPrevious={handleClickPrev}
          showSkipControls={true}
          showJumpControls={false}
          // src={`http://localhost:3300/track/${songsId[currentTrack]}`}
          src={`http://localhost:3300/track/600237f7fea6f3048545a5a3`}
        />
      </div>

    </>
  )
}






