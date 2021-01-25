import React, { useContext } from 'react'
import { PlayerContext } from '../../contexts/PlayerContext/playerContext'
import { SongsContext } from '../../contexts/SongsContext/songsContext';
import AudioPlayer from 'react-h5-audio-player';
import { playerActions } from "../../reducers/playerReducer";
import 'react-h5-audio-player/lib/styles.css';

export const Player = () => {

  // const { songs } = useContext(SongsContext);
  const { state, dispatch } = useContext(PlayerContext);
  console.log(state);
  // console.log("trackId", state.songToReproduce[state.currentPlay].trackId);
  console.log(state.songToReproduce);
  console.log(state.currentPlay);


  const handleClickNext = () => {
    dispatch({ type: playerActions.NEXT_SONG });
  };
  const handleClickPrev = () => {
    console.log('Next');
    dispatch({ type: playerActions.PREV_SONG });
  };

  return (
    <>
      {(state.reproduceSongList.length !== 0 && state.currentPlay !== undefined) &&
        <AudioPlayer
          onClickNext={handleClickNext}
          onClickPrevious={handleClickPrev}
          showSkipControls
          showJumpControls={false}
          autoPlayAfterSrcChange
          onEnded={handleClickPrev}
          // src={`http://localhost:3300/track/${songs[0].trackId}`}
          src={`track/${state.songToReproduce[state.currentPlay].trackId}`}
        // layout={'stacked'}
        />
      }
    </>
  )
}
