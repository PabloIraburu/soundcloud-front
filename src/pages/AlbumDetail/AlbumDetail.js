import React, {useContext} from 'react';
import { SongsContext } from '../../contexts/SongsContext/songsContext';
import { SongItemList } from '../../components/SongItemList/SongItemList';
import { CoverBg } from '../../components/CoverBg/CoverBg';
import styles from './AlbumDetail.module.css';


export const AlbumDetail = (/*{entity}*/) => {

  const { songs } = useContext(SongsContext);
  const entity = songs[0];
  console.log(entity);

  return (
    <>
    {
    (entity !== undefined) && 
    <div className={styles["AlbumDetail-header"]}>
      <CoverBg
        title={entity.title}
        categories={entity.category}
        author={entity.id_owner}
        img={entity.image}
        description={entity.description}
      />
    </div>
    }

      {
      (songs.length !== 0) && 
        <div className={styles["AlbumDetail-list"]}>
          {songs.map((songs) => (
            <SongItemList 
              song={songs}
            />
          ))};
        </div>
      }
    </>
  )
}