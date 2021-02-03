import React, { useContext } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import { PlayerContext } from '../../contexts/PlayerContext/playerContext'
import { playerActions } from "../../reducers/playerReducer";
import 'react-h5-audio-player/lib/styles.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { API_URL } from "../../helpers/ServerRequest";
import './Player.css';

export const Player = () => {

  const { player, dispatchPlayer } = useContext(PlayerContext);

  const handleClickNext = () => {
    dispatchPlayer({ type: playerActions.NEXT_SONG });
    console.log(player.currentPlay)
  };
  const handleClickPrev = () => {
    console.log('Next');
    dispatchPlayer({ type: playerActions.PREV_SONG });
  };

  return (
    <>
      {player.reproduceSongList.length !== 0

        ?
        <AudioPlayer
          header={`Playing: ${
            player.reproduceSongList[player.currentPlay] && player.reproduceSongList[player.currentPlay].title
            }`}
          onClickNext={handleClickNext}
          onClickPrevious={handleClickPrev}
          showSkipControls
          showJumpControls={false}
          autoPlayAfterSrcChange={true}
          onEnded={handleClickNext}
          src={`${API_URL}/track/${
            player.reproduceSongList.length !== 0 &&
            player.currentPlay !== undefined &&
            player.reproduceSongList[player.currentPlay].trackId
            }`}
          layout={'stacked'}
          customAdditionalControls={
            [
              <FavoriteIcon
                fontSize="small"
                style={{ color: '#0b1e45' }}
              />,
              <div style={{ backgroundImage: `url(${player.reproduceSongList[player.currentPlay].image})` }} className="Player-image"></div>
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
          layout={'stacked-reverse'}
        />
      }
    </>
  )
}
