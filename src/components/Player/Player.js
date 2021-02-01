import React, { useContext } from 'react'
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { PlayerContext } from '../../contexts/PlayerContext/playerContext'
import { playerActions } from "../../reducers/playerReducer";
import 'react-h5-audio-player/lib/styles.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { API_URL } from "../../helpers/ServerRequest";


// import './Player.scss';


export const Player = () => {

  // const initialState = {
  //   reproduceSongList: [],
  //   currentPlay: undefined
  // }

  const { player, dispatchPlayer } = useContext(PlayerContext);
  console.log(player);
  console.log("Song to reproduce", player.reproduceSongList);
  console.log("index played", player.currentPlay);
  if (player.reproduceSongList.length !== 0) {
    console.log("Canción en la posición del currentPlay", player.reproduceSongList[0].trackId);
  }


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
      {player.reproduceSongList.length !== 0 /* && player.currentPlay */

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

          // { player.reproduceSongList.map((song) => {

          // })}
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
              // onClick={() => handleRemoveFromFavourite(id)}
              />
              //     {
              //       !isFav &&
              //     <HtmlTooltip title="Add Favorite" placement="left">
              //       {/* <div className={styles["FavoriteIcon"]}> */}
              //       <FavoriteBorderOutlinedIcon
              //         fontSize="inherit"
              //         // style={{ color: '#f9b807' }}
              //         onClick={() => handleAddToFavourites(id)}
              //       />
              //       {/* </div> */}
              //     </HtmlTooltip>
              //   }
              // {
              //       isFav &&
              // <HtmlTooltip title="Remove Favorite" placement="left">
              //   {/* <div className={styles["FavoriteIcon"]}> */}
              //   <FavoriteIcon
              //     fontSize="inherit"
              //     // style={{ color: '#f9b807' }}
              //     onClick={() => handleRemoveFromFavourite(id)}
              //   />
              //   {/* </div> */}
              // </HtmlTooltip>
              // }
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
