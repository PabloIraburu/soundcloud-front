import React, { useContext } from 'react';
import { CoverSm } from "../../components/CoverSm/CoverSm";
import { CoverMd } from "../../components/CoverMd/CoverMd";
import { SongsContext } from "../../contexts/SongsContext/songsContext";
import styles from './Recommended.module.css';

export const Recommended = () => {
  const { songs } = useContext(SongsContext);

  return (
    <>
      <h1>Recommended</h1>

      <h3>Recommended songs</h3>
      {
        (songs.lenght !== 0) &&
        <div className={styles["Recommended-list-songs"]}>

          <div className={styles["Recommended-list-songs-items"]}>
          {songs.map((song) => (
            <CoverSm
                key={song._id}
                title={song.title}
                categories={song.category}
                author={song.artist}
                img={song.image}
            />
          ))}
          </div>
          <div className={styles["Recommended-list-songs-items"]}>
          {songs.map((song) => (
            <CoverSm
                key={song._id}
                title={song.title}
                categories={song.category}
                author={song.artist}
                img={song.image}
            />
          ))}
          </div>
          <div className={styles["Recommended-list-songs-items"]}>
          {songs.map((song) => (
            <CoverSm
                key={song._id}
                title={song.title}
                categories={song.category}
                author={song.artist}
                img={song.image}
            />
          ))}
          </div>
          
        </div>
      }

      <h3>Recommended Playlists</h3>
      {
        (songs.lenght !== 0) &&
        <div className={styles["Recommended-list-playlists"]}>
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
      }
    </>
  )
}
