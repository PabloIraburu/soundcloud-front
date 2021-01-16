import React from 'react';
import { SongItem } from '../SongItem/SongItem';
import styles from './SongList.module.css';


export const SongList = ({ songs, handleAddToPlaylist, handleDeleteSong, handleEditSong }) => {
    return (
        <ol className={styles["SongList-ol"]}>

            {
                songs.map(song => (
                    <div key={song._id} >
                        <SongItem 
                            handleAddToPlaylist={handleAddToPlaylist} 
                            handleDeleteSong={handleDeleteSong} 
                            handleEditSong={handleEditSong}
                            key={song._id}
                            id={song._id}
                            title={song.title}
                            category={song.category}
                            author={song.artist}
                            img={song.image}
                        />
                    </div>
                ))
            }
        </ol>
    )
}
