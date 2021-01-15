import React from 'react';
import { CoverMd } from "../../components/CoverMd/CoverMd";
import { CoverSm } from "../../components/CoverSm/CoverSm";
import { ListaSongsFake } from "../../data/fakeSongs";
import styles from './Favourites.module.css';

export const Favourites = () => {

  return (
    <>
      <h1>Favourites</h1>

      <h3>Favourite songs</h3>
      <div className={styles["Favourites-songs"]}>
        {ListaSongsFake.map((song) => (
          <CoverSm
            key={song._id}
            title={song.title}
            categories={song.categories}
            author={song.author}
            img={song.img}
          />
        ))}
      </div>

      <h3>Favourite Playlists</h3>
      <div className={styles["Favourites-playlists"]}>
        {ListaSongsFake.map((song) => (
          <CoverMd
            key={song._id}
            title={song.title}
            categories={song.categories}
            author={song.author}
            img={song.img}
          />
        ))}
      </div>

      <h3>Favourite Albums</h3>
      <div className={styles["Favourites-albums"]}>
        {ListaSongsFake.map((song) => (
          <CoverMd
            key={song._id}
            title={song.title}
            categories={song.categories}
            author={song.author}
            img={song.img}
          />
        ))}
      </div>

    </>
  )
}
