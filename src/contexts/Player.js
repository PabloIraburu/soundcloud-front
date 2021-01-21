import React, { useContext } from 'react'
import { PlayerContext } from './playerContext'
import H5AudioPlayer from 'react-h5-audio-player';

export const Player = () => {
    const { state, dispatch } = useContext(PlayerContext);
    
    const trackIds = ["5fc4d698c891ef40a7a07580", "5fc4e79bb0b05e5bc165ef9e"];
    const [currentTrack, setCurrentTrack] = useState(0);
    
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
                src={`http://localhost3300/track/${_id}`}
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
        />
      </div>
      </>
    )
}


