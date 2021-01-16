import React, { useContext } from 'react';
import { CoverMd } from "../../components/CoverMd/CoverMd";
import { CoverSm } from "../../components/CoverSm/CoverSm";
import { SongsContext } from "../../contexts/SongsContext/songsContext";
import styles from './Favourites.module.css';

export const Favourites = () => {
  const { songs } = useContext(SongsContext);

  return (
    <>
      <h1>Favourites</h1>

      <h3>Favourite songs</h3>
      <div className={styles["Favourites-songs"]}>
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

      <h3>Favourite Playlists</h3>
      <div className={styles["Favourites-playlists"]}>
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

      <h3>Favourite Albums</h3>
      <div className={styles["Favourites-albums"]}>
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
