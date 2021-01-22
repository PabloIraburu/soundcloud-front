import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from "react-router-dom";
import { CoverBg } from '../../components/CoverBg/CoverBg'
import { SongItemList } from '../../components/SongItemList/SongItemList'
import styles from "./EntityDetail.module.css";
import { useParams } from 'react-router-dom';
import { ServerRequest } from '../../helpers/ServerRequest';
import { SongsContext } from '../../contexts/SongsContext/songsContext';


export const EntityDetail = () => {

  const {songs} = useContext(SongsContext);
  const location = useLocation();
  const entityId = useParams();
  const entityType = ((location.pathname).split("/", 2))[1];
  const [entity, setEntity] = useState({});
  const [entitySongs, setEntitySongs] = useState([]);
  
  useEffect(() => {
    setEntity(location.state.entity)
  }, []);
  
  useEffect(() => {
      ServerRequest(`data/songsin${entityType}/?id_${entityType}=${entityId}`)
        .then(response => setEntitySongs(response))
        .catch(console.log)
  }, []);

  return (
    <>
      {
        (entity !== undefined) &&
        <div className={styles["PlaylistDetail-header"]}>
          <CoverBg
            title={entity.title}
            author={entity.author}
            img={entity.image}
            description={entity.description}
          />
        </div>
      }
      {/* <MyButton onClick={handleOpenNewPlaylist} variant="pink-or" size="150px">New Playlist</MyButton> */}

      {
        // (entitySongs.lenght !== 0) &&
        (songs.lenght !== 0) &&
        <div className={styles["PlaylistDetail-list"]}>
          {/* {entitySongs.map((songs) => ( */}
          {songs.map((songs) => (
            <SongItemList
              // handleAddRemove={handleRemoveSongFromPlaylist}
              // handleAddFavSong={handleAddSongToFav}
              song={songs}
            />
          ))}
        </div>
      }

    </>
  )
}
