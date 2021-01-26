import React, { useContext } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import { PlayerContext } from '../../contexts/PlayerContext/playerContext'
import { playerActions } from "../../reducers/playerReducer";
import 'react-h5-audio-player/lib/styles.css';

export const Player = () => {

  const { player, dispatchPlayer } = useContext(PlayerContext);
  console.log(player);
  // console.log("trackId", state.songToReproduce[state.currentPlay].trackId);
  console.log(player.songToReproduce);
  console.log(player.currentPlay);


  const handleClickNext = () => {
    dispatchPlayer({ type: playerActions.NEXT_SONG });
  };
  const handleClickPrev = () => {
    console.log('Next');
    dispatchPlayer({ type: playerActions.PREV_SONG });
  };

  return (
    <>
      {(player.reproduceSongList.length !== 0 && player.currentPlay !== undefined) &&
        <AudioPlayer
          onClickNext={handleClickNext}
          onClickPrevious={handleClickPrev}
          showSkipControls
          showJumpControls={false}
          autoPlayAfterSrcChange
          onEnded={handleClickPrev}
          // src={`http://localhost:3300/track/${songs[0].trackId}`}
          src={`track/${player.songToReproduce[player.currentPlay].trackId}`}
        // layout={'stacked'}
        />
      }
    </>
  )
}
