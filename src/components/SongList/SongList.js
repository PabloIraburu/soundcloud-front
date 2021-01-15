import React from 'react';
import { SongItem } from '../SongItem/SongItem';
import { ListaSongsFake } from "../../data/fakeSongs";
import styles from './SongList.module.css';


export const SongList = ({ handleDelete, handleToggle, handleEdit }) => {
    return (
        <ol className={styles["SongList-ol"]}>

            {
                ListaSongsFake.map(song => (
                    <div key={song._id} >
                        <SongItem 
                            handleDelete={handleDelete} 
                            handleToggle={handleToggle} 
                            handleEdit={handleEdit} 
                            key={song._id}
                            id={song._id}
                            title={song.title}
                            categories={song.categories}
                            author={song.author}
                            img={song.img}
                        />
                    </div>
                ))
            }
        </ol>
    )
}
