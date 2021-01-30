import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext/contextProvider";
import { CoverBg } from '../../components/CoverBg/CoverBg'
import { SongItemList } from '../../components/SongItemList/SongItemList'
import styles from "./EntityDetail.module.css";
import { ServerRequest } from '../../helpers/ServerRequest';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


export const EntityDetail = () => {

  const { userId } = useContext(UserContext);
  const location = useLocation();
  const entityId = ((location.pathname).split("/", 3))[2];
  const [entity, setEntity] = useState({});
  const [entitySongs, setEntitySongs] = useState([]);
  const [favSongs, setFavSongs] = useState([]);
  const [owner, setOwner] = useState({});
  const [forceReload, setForceReload] = useState(false);

  console.log("entity id", entityId);


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
      .then(response => {
        console.log(response);
        setOwner(response)
      })
      .catch(console.log)
  }, [entity]);

  //GET ENTITY SONGS  
  useEffect(() => {
    ServerRequest(`data/songsinplaylist/?id_playlist=${entityId}`, "GET")
      .then(response => {
        setEntitySongs(response)
        console.log('these are the songs', response)
      })
      .catch(console.log)
  }, [forceReload]);

  //REMOVE SONG FROM PLAYLIST
  const handleRemoveSongFromPlaylist = (songId) => {
    ServerRequest(`data/songsinplaylist/?id_playlist=${entityId}&&id_song=${songId}`, "GET")
      .then((res) => {
        const resId = res;
        ServerRequest(`data/songsinplaylist/${resId[0]._id}`, "DELETE")
          .then(console.log)
          .catch(() => {
            setForceReload(!forceReload)
          })
      })
      .catch(console.log)
  }

  //ADD SONG TO FAVOURITES
  const handleAddSongToFavourites = (songId) => {
    const favSong = {
      id_song: songId,
      id_user: userId,
      isFav: true
    }
    ServerRequest("data/favouritesongs", "POST", favSong)
      .then((response) => setFavSongs([...favSongs, response]))
      .catch(console.log);
  }

  //REMOVE SONG FROM FAVOURITES
  const handleRemoveSongFromFavourites = (songId) => {
    ServerRequest(`data/favouritesongs/?id_song=${songId}&&id_user=${userId}`, "DELETE")
      .then(() => favSongs.filter((favSong) => favSong.id_song !== songId))
      .catch(console.log)
  }
  console.log("entity song properties:", entitySongs);

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
              categories={entity.category}
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
        (entitySongs.length === 0)
          ? <p>This Playlist is empty.</p>
          : <div className={styles["PlaylistDetail-list"]}>
            {entitySongs.map((song, index) => (
              <SongItemList
                handleRemoveSongFromPlaylist={handleRemoveSongFromPlaylist}
                handleAddToFavourites={handleAddSongToFavourites}
                handleRemoveFromFavourites={handleRemoveSongFromFavourites}
                song={song.id_song}
                index={index}
              />
            ))}
          </div>
      }

    </>
  )
}
