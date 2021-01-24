import React, { useContext, useState } from 'react'
import { PlayerContext } from '../../contexts/PlayerContext/playerContext'
import { SongsContext } from '../../contexts/SongsContext/songsContext';
import AudioPlayer from 'react-h5-audio-player';
import { playerActions } from "../../reducers/playerReducer";
import 'react-h5-audio-player/lib/styles.css';

export const Player = () => {

  const { songs } = useContext(SongsContext);
  const { state, dispatch } = useContext(PlayerContext);

  const handleClickNext = () => {
    dispatch({ type: playerActions.REPRODUCE_NEXT });
  };
  const handleClickPrev = () => {
    console.log('Next');
    dispatch({ type: playerActions.PREV_SONG });
  };

  return (
    <>
      {songs.length !== 0 &&
        <AudioPlayer
          onClickNext={handleClickNext}
          onClickPrevious={handleClickPrev}
          showSkipControls
          showJumpControls={false}
          autoPlayAfterSrcChange
          onEnded={handleClickPrev}
          src={`http://localhost:3300/track/${songs[0].trackId}`}
          layout={'stacked'}
        />
      }



      {/* {songs.length !== 0 &&
                    <div>
                        <audio controls={true} muted={false}>
                            <source src={`http://localhost:3300/track/${songs[1].trackId}`} type="audio/mpeg" />
                        </audio>
                        <AudioPlayer
                            onClickNext={handleClickNext}
                            onClickPrevious={handleClickPrev}
                            showSkipControls
                            showJumpControls={false}
                            autoPlayAfterSrcChange
                            onEnded={handleClickPrev}
                            src={`http://localhost:3300/track/${songs[1].trackId}`}
                            layout={'stacked'}
                        />
                    </div>
                } */}



      {/* {songs && songs.map((song) => {
        <audio controls={true} muted={false}>
          <source src={`http://localhost:3300/track/${song.trackId}`} type="audio/mpeg" />
        </audio>
      })} */}
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