import React, { useContext } from 'react'
import { PlayerContext } from './playerContext'
import H5AudioPlayer from 'react-h5-audio-player';

export const Player = () => {
    const { state, dispatch } = useContext(PlayerContext);

    return (
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
    )
}
