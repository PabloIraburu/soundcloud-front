import React from 'react';
import { CoverMd } from "../../components/CoverMd/CoverMd";
import { ListaSongsFake } from "../../data/fakeSongs";
import styles from './Playlists.module.css';


export const Playlists = () => {

  return (
    <>
      <h1>Playlists</h1>

      <div className={styles["Playlists-list"]}>
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
