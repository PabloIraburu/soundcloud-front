import React, { useContext } from 'react'
import { PlayerContext } from './PlayerContext/playerContext'

export const songView = () => {

    const { state, dispatch } = useContext(PlayerContext);

    useEffect(() => {
        ServerRequest(`data/song`, "GET")
            .then((payload) => {
                dispatch({ type: playerAction.LOAD_SONGS, songs: payload })
            })
            .catch(console.log)
    }, [])

    return (
        <div>
            {state.songToReproduce &&
                state.songToReproduce.mpa((song, index) => {
                    <div>
                        <span>Name: {song.title}</span>
                        <input
                            type=""
                            value="Play"
                            onClick={}
                        />
                    </div>
                })
            }
        </div>
    )
}
