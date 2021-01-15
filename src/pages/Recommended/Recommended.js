import React from 'react';
import { CoverSm } from "../../components/CoverSm/CoverSm";
import { CoverMd } from "../../components/CoverMd/CoverMd";
import { ListaSongsFake } from "../../data/fakeSongs";
import styles from './Recommended.module.css';

export const Recommended = () => {

  return (
    <>
      <h1>Recommended</h1>

      <h3>Recommended songs</h3>
      <div className={styles["Recommended-list-songs"]}>

        <div className={styles["Recommended-list-songs-items"]}>
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
        <div className={styles["Recommended-list-songs-items"]}>
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
        <div className={styles["Recommended-list-songs-items"]}>
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
        <div className={styles["Recommended-list-songs-items"]}>
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

      </div>


      <h3>Recommended Playlists</h3>
      {/* <div className={styles["Recommended-list-playlists"]}> */}
      <div className={styles["Recommended-list-playlists"]}>
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
      {/* </div> */}
    </>
  )
}
