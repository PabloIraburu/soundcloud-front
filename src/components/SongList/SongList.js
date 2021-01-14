import React from 'react';
import { SongItem } from '../SongItem/SongItem';

export const SongList = ({ songs, handleDelete, handleToggle, handleEdit }) => {
    return (
        <ol>
            {
                songs.map(song => (
                    <div key={song.id} className="list-options">
                        <SongItem song={song} handleDelete={handleDelete} handleToggle={handleToggle} handleEdit={handleEdit} />
                    </div>
                ))
            }
        </ol>
    )
}
