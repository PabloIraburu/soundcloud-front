import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from "react-router-dom";
import { CoverBg } from '../../components/CoverBg/CoverBg'
import { SongItemList } from '../../components/SongItemList/SongItemList'
import styles from "./EntityDetail.module.css";
import { ServerRequest } from '../../helpers/ServerRequest';
// import { SongsContext } from '../../contexts/SongsContext/songsContext';


export const EntityDetail = () => {

  // const {songs} = useContext(SongsContext);
  const location = useLocation();
  // const entityId = useParams();
  const entityId = ((location.pathname).split("/", 3))[2];
  // const entityType = ((location.pathname).split("/", 2))[1];
  const [entity, setEntity] = useState({});
  const [entitySongs, setEntitySongs] = useState([]);
  
  console.log("entity id", entityId);
  // console.log("entity type", entityType);

  // useEffect(() => {
  //   setEntity(location.state.entity)
  // }, []);

  // console.log("request to data/entity", `data/${entityType}/${entityId}`);
  // console.log("request to data/songsinentity", `data/songsin${entityType}/?id_${entityType}=${entityId}`);

  //GET ENTITY INFORMATION
  useEffect(() => {
      ServerRequest(`data/playlist/${entityId}`, "GET")
        .then(response => {
          setEntity(response)
          console.log("entity id 1231231", response);
        })
        .catch((response)=>{
          console.log('hey THIS SHIT DOESNT WORK')
        })

  }, []);
  
  // //GET SONGS IN ENTITY (PLAYLIST OR ALBUM)
  // useEffect(() => {
  //   if (entity.length !== 0 && entityId.length !== 0) {
  //     ServerRequest(`data/songsinplaylist/?id_playlist=${entityId}`, "GET")
  //       .then(response => {
  //         setEntitySongs(response)
  //         // console.log("entity type", entityType);
  //       })
  //       .catch(console.log)
  //   }
  // }, [entityId]);

  return (
    <>
      {
        // (entity === undefined) &&
        (entity === {})
        ? <p>Loading...</p>
        : <div className={styles["PlaylistDetail-header"]}>
            <CoverBg
              key={entity._id}
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
        (entitySongs.length === 0) 
        ? <p>This Playlist is empty.</p>
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
