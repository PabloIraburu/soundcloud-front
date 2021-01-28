import React, { useContext } from 'react'
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { PlayerContext } from '../../contexts/PlayerContext/playerContext'
import { playerActions } from "../../reducers/playerReducer";
import 'react-h5-audio-player/lib/styles.css';
// import './Player.scss';


export const Player = () => {

  const { player, dispatchPlayer } = useContext(PlayerContext);
  console.log(player);
  console.log("Song to reproduce", player.songToReproduce);
  console.log("index played", player.currentPlay);

  const handleClickNext = () => {
    dispatchPlayer({ type: playerActions.NEXT_SONG });
  };
  const handleClickPrev = () => {
    console.log('Next');
    dispatchPlayer({ type: playerActions.PREV_SONG });
  };

  return (
    <>
      {player.reproduceSongList.length !== 0 && player.currentPlay

        ?
        <AudioPlayer
          header={`Playing: ${
            player.reproduceSongList[player.currentPlay] && player.reproduceSongList[player.currentPlay].title
            }`}
          onClickNext={handleClickNext}
          onClickPrevious={handleClickPrev}
          showSkipControls
          showJumpControls={false}
          autoPlayAfterSrcChange
          onEnded={handleClickPrev}
          // src={`http://localhost:3300/track/${songs[0].trackId}`}
          // src={`track/${player.songToReproduce[player.currentPlay].trackId}`}
          src={`http://localhost:3001/track/${
            player.reproduceSongList.length !== 0 &&
            player.currentPlay !== undefined &&
            player.songToReproduce[player.currentPlay].trackId
            }`}
          layout={'stacked'}
          customAdditionalControls={
            [
              RHAP_UI.LOOP,
              <button>button 2 </button>,
              <button>button 3 </button>,
              <button>button 4 </button>,
            ]
          }
        />

        : <AudioPlayer
          header={'SoundMist Music'}
          onClickNext={handleClickNext}
          onClickPrevious={handleClickPrev}
          showSkipControls
          showJumpControls={false}
          autoPlayAfterSrcChange
          onEnded={handleClickPrev}
          // src={`http://localhost:3300/track/${songs[0].trackId}`}
          layout={'stacked-reverse'}
        />
      }
    </>
  )
}
