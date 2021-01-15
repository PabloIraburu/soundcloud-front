import React from 'react';
import { CoverMd } from "../../components/CoverMd/CoverMd";
import { ListaSongsFake } from "../../data/fakeSongs";
import styles from './Albums.module.css';

export const Albums = () => {

  return (
    <>
      <h1>Albums</h1>

      <div className={styles["Albums-list"]}>
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
