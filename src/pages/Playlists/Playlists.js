import React, { useContext } from 'react';
import { CoverMd } from "../../components/CoverMd/CoverMd";
import { SongsContext } from "../../contexts/SongsContext/songsContext";
import styles from './Playlists.module.css';


export const Playlists = () => {
  const { songs } = useContext(SongsContext);

  return (
    <>
      <h1>Playlists</h1>

      <div className={styles["Playlists-list"]}>
      {songs.map((song) => (
          <CoverMd
              key={song._id}
              title={song.title}
              categories={song.category}
              author={song.artist}
              img={song.image}
          />
      ))}
      </div>

    </>
  )
}
