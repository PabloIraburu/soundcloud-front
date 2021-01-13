import React, {useState} from "react"
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Playlist = () =>{
  const [songsId, setsongsId] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(0);

  
	const handleClickNext = () => {

		if(currentTrack < songsId.length - 1){
			setCurrentTrack(currentTrack + 1);
		}

  }
  
  const handleClickPrev = () => {
		if(currentTrack > 0){
			setCurrentTrack(currentTrack - 1);
		}
	}

  return(

   <div>
   <AudioPlayer
    // autoPlay
    onClickNext={handleClickNext}
    onClickPrevious={handleClickPrev}
    showSkipControls={true}
    showJumpControls={false}
    src="https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"
    src={`http://localhost:3300/track/${songsId[currentTrack]}`}
    />
    </div>
 
  )
  


}

export default Playlist;