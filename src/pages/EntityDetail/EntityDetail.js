import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { CoverBg } from '../../components/CoverBg/CoverBg'
import { SongItemList } from '../../components/SongItemList/SongItemList'
import styles from "./EntityDetail.module.css";
// import { useParams } from 'react-router-dom';
import { ServerRequest } from '../../helpers/ServerRequest';
// import { SongsContext } from '../../contexts/SongsContext/songsContext';


export const EntityDetail = () => {

  // const {songs} = useContext(SongsContext);
  const location = useLocation();
  // const entityId = useParams();
  const entityId = ((location.pathname).split("/", 3))[2];
  const entityType = ((location.pathname).split("/", 2))[1];
  const [entity, setEntity] = useState([]);
  const [entitySongs, setEntitySongs] = useState([]);
  
  // console.log("entity id", entityId);
  // console.log("entity type", entityType);

  // useEffect(() => {
  //   setEntity(location.state.entity)
  // }, []);

  // console.log("request to data/entity", `data/${entityType}/${entityId}`);
  // console.log("request to data/songsinentity", `data/songsin${entityType}/?id_${entityType}=${entityId}`);

  //GET ENTITY INFORMATION
  useEffect(() => {
    if (entity.length !== 0 && entityId.length !== 0) {
      ServerRequest(`data/${entityType}/${entityId}`, "GET")
        .then(response => {
          setEntity(response)
          console.log("entity id", entityId);
        })
        .catch(console.log)
    }

  }, [entityId, entityType]);
  
  //GET SONGS IN ENTITY (PLAYLIST OR ALBUM)
  useEffect(() => {
    if (entity.length !== 0 && entityId.length !== 0) {
      ServerRequest(`data/songsin${entityType}/?id_${entityType}=${entityId}`, "GET")
        .then(response => {
          setEntitySongs(response)
          console.log("entity type", entityType);
        })
        .catch(console.log)
    }
  }, [entityId, entityType]);

  return (
    <>
      {
        // (entity === undefined) &&
        (entity.length === 0) 
        ? <p>Loading...</p>
        : <div className={styles["PlaylistDetail-header"]}>
          {entity.map((entity) => (
            <CoverBg
              key={entity._id}
              title={entity.title}
              author={entity.author}
              img={entity.image}
              description={entity.description}
              entityType={entity}
            />
          ))}
        </div>
      }
      {/* <MyButton onClick={handleOpenNewPlaylist} variant="pink-or" size="150px">New Playlist</MyButton> */}

      {
        // (entitySongs.lenght !== 0) &&
        (entitySongs.length === 0) 
        ? <p>This {entityType} is empty.</p>
        : <div className={styles["PlaylistDetail-list"]}>
          {entitySongs.map((songs) => (
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
