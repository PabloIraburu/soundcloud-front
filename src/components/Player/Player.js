import React, { useContext, useState } from 'react'
import { PlayerContext } from '../../contexts/PlayerContext/playerContext'
import { SongsContext } from '../../contexts/SongsContext/songsContext';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export const Player = () => {

  const { songs } = useContext(SongsContext);
  const { state, dispatch } = useContext(PlayerContext);

  return (
    <>
      {/* <div>
        <AudioPlayer
          header={}
          onClickNext={}
          onClickPrevious={}
          showSkipControls
          showJumpControls={}
          autoPlayerAfterSrcChange
          onEnded={handleClickNext}
          src={`http://localhost:3300/track/${_id}`}
        />
      </div> */}

      <div>

        <audio
          controls={true}
          muted={false}>
          <source src={`http://localhost:3300/track/60022da4fea6f3048545a4b1`} type="audio/mpeg" />
        </audio>

        {songs && songs.map((song) => {
          <div>
            <AudioPlayer
              showSkipControls={true}
              showJumpControls={false}
              preload='metadata'
              src={`http://localhost:3300/track/${song.trackId}`}
              layout={'stacked'}
            />
          </div>
        })}

        {songs && songs.map((song) => {
          <audio controls={true} muted={false}>
            <source src={`http://localhost:3300/track/${song.trackId}`} type="audio/mpeg" />
          </audio>
        })}
      </div>
    </>
  )
}



{/* <AudioPlayer
onClickNext={handleClickNext}
onClickPrevious={handleClickPrev}
showSkipControls={true}
showJumpControls={false}
preload='metadata'
src={`http://localhost:3300/track/60022da4fea6f3048545a4b1`}
layout={'stacked'}
/> */}