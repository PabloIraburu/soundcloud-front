import React from 'react';
import { SongItem } from '../SongItem/SongItem';
import { ListaSongsFake } from "../../data/fakeSongs";
import styles from './SongList.module.css';


export const SongList = ({ songs, handleDelete, handleEdit }) => {
    return (
        <ol className={styles["SongList-ol"]}>

            {
                songs.map(song => (
                    <div key={song._id} >
                        <SongItem 
                            handleDelete={handleDelete} 
                            handleEdit={handleEdit} 
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
