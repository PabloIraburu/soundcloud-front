import React, { useContext } from 'react'
import { PlayerContext } from '../../contexts/PlayerContext/playerContext'
import H5AudioPlayer from 'react-h5-audio-player';

export const Player = () => {
  const { state, dispatch } = useContext(PlayerContext);

  const [currentTrack, setCurrentTrack] = useState(0); //No hará falta tras implementar el useReduce

  const handlePlay = (song) => {
    setCurrentTrack(song._id)
  }

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
      <div>
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
      </div>

      <div className={styles["Landing-player"]}>
        <audio
          controls={true}
          muted={false}>
          {/* <source src={`https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3`} type="audio/mpeg" /> */}
          <source src={`http://localhost:3300/track/60022da4fea6f3048545a4b1`} type="audio/mpeg" />


          {/* <source src={`http://localhost:3300/track/${songsId[currentTrack]}`} type="audio/mpeg" /> */}
        </audio>
        <AudioPlayer
          onClickNext={handleClickNext}
          onClickPrevious={handleClickPrev}
          showSkipControls={true}
          showJumpControls={false}
          preload='metadata'
          // src={`http://localhost:3300/track/${songsId[currentTrack]}`}
          src={`http://localhost:3300/track/60022da4fea6f3048545a4b1`}
          // src={`https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3`}
          layout={'stacked'}
        />
      </div>
    </>
  )
}


