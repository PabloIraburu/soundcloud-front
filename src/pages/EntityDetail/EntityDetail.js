import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from "react-router-dom";
import { CoverBg } from '../../components/CoverBg/CoverBg'
import { SongItemList } from '../../components/SongItemList/SongItemList'
import styles from "./EntityDetail.module.css";
import { ServerRequest } from '../../helpers/ServerRequest';
import { SongsContext } from '../../contexts/SongsContext/songsContext';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


export const EntityDetail = () => {

  const { songs } = useContext(SongsContext);
  const location = useLocation();
  // const entityId = useParams();
  // const entityType = ((location.pathname).split("/", 2))[1];
  const entityId = ((location.pathname).split("/", 3))[2];
  const [entity, setEntity] = useState({});
  const [entitySongs, setEntitySongs] = useState([]);
  const [owner, setOwner] = useState({});

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
      })
      .catch(console.log)
  }, []);

  useEffect(() => {
    ServerRequest(`data/user/?_id=${entity.id_owner}`, "GET")
      .then(response => setOwner(response))
      .catch(console.log)
  }, [entity]);

  //GET ENTITY SONGS  
  useEffect(() => {
    ServerRequest(`data/songsinplaylist/?id_playlist=${entityId}`, "GET")
      .then(response => setEntitySongs(response))
      .catch(console.log)
  }, [])

  console.log(entitySongs);

  return (
    <>
      {
        (entity === {} || owner === {})
          ? <p>Loading...</p>
          : <div className={styles["PlaylistDetail-header"]}>
            <CoverBg
              key={entity._id}
              id={entity._id}
              title={entity.title}
              author={owner.name}
              img={entity.image}
              description={entity.description}
              created={entity.createdAt}
            />
          </div>
      }

      <h1>REAL SONGS OF PLAYLIST</h1>

      <div className={styles["EntityDetail-list"]}>
        <div className={styles["EntityDetail-img"]}></div>
        <div className={styles["EntityDetail-text"]}>
          <p className={styles["EntityDetail-title"]}>Song Title</p>
          <p>Artist</p>
          <p>Album</p>
          <p>Category</p>
          <p><MoreHorizIcon fontSize="small" style={{ color: "lightgrey" }} /></p>
          <div className={styles["EntityDetail-icons"]}></div>
        </div>
      </div >
      <hr className={styles["EntityDetail-hr"]} />


      {
        (entitySongs.length !== 0)
          ? <p>This Playlist is empty.</p>
          : <div className={styles["PlaylistDetail-list"]}>
            {entitySongs.map((song) => (
              <SongItemList
                // handleAddRemove={handleRemoveSongFromPlaylist}
                // handleAddFavSong={handleAddSongToFav}
                song={song}
              />
            ))}
          </div>
      }

      <h1>FAKE LIST SONGS </h1>
      <div className={styles["EntityDetail-list"]}>
        <div className={styles["EntityDetail-img"]}></div>
        <div className={styles["EntityDetail-text"]}>
          <p className={styles["EntityDetail-title"]}>Song Title</p>
          <p>Artist</p>
          <p>Album</p>
          <p>Category</p>
          <p><MoreHorizIcon fontSize="small" style={{ color: "lightgrey" }} /></p>
          <div className={styles["EntityDetail-icons"]}></div>
        </div>
      </div >
      <hr className={styles["EntityDetail-hr"]} />
      {
        (songs.length === 0)
          ? <p>This Playlist is empty.</p>
          : <div className={styles["PlaylistDetail-list"]}>
            {songs.map((song) => (
              <SongItemList
                song={song}
              />
            ))}
          </div>
      }

    </>
  )
}
