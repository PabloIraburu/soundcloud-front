import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext/contextProvider";
import { CoverBg } from '../../components/CoverBg/CoverBg'
import { SongItemList } from '../../components/SongItemList/SongItemList'
import { ServerRequest } from '../../helpers/ServerRequest';
import { toast } from 'react-toastify';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import styles from "./EntityDetail.module.css";


export const EntityDetail = () => {

  const notify = (e) => toast(`${e}`);
  const { userId } = useContext(UserContext);
  const location = useLocation();
  const entityId = ((location.pathname).split("/", 3))[2];
  const [entity, setEntity] = useState({});
  const [entitySongs, setEntitySongs] = useState([]);
  const [forceReload, setForceReload] = useState(false);

  //GET ENTITY INFORMATION
  useEffect(() => {
    ServerRequest(`data/playlist/${entityId}`, "GET")
      .then(response => {
        setEntity(response)
      })
      .catch(console.log)
  }, []);

  //GET SONGS & FAVOURITE SONGS
  useEffect(() => {
    ServerRequest(`data/songsinplaylist/?id_playlist=${entityId}`, "GET")
      .then((response) => {
        console.log("songs in playlist", response);
        ServerRequest(`data/favouritesongs/?id_user=${userId}`, "GET")
          .then((res) => {
            let favs = (res.map(fav => fav.id_song._id))
            setEntitySongs(response.map((song) => {
              if (favs.includes(song.id_song._id)) {
                console.log("song.id_song.isFav", song.id_song.isFav);
                song.id_song.isFav = true
              }
              return song;
            }))
          })
          .catch(console.log)
      })
      .catch(console.log)
  }, [forceReload])

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
  const AddSongToFavourites = (songId) => {
    const favSong = {
      id_song: songId,
      id_user: userId,
    }
    ServerRequest("data/favouritesongs", "POST", favSong)
      .then(() => {
        setEntitySongs(entitySongs.filter((song) => {
          if (song.id_song._id === songId) {
            (song.id_song.isFav = true)
          }
          return song;
        }))
        notify('Song added to favourites correctly')
      })
      .catch(console.log)
  }

  //REMOVE SONG FROM FAVOURITES
  const RemoveSongFromFavourites = (songId) => {
    ServerRequest(`data/favouritesongs/?id_song=${songId}&&id_user=${userId}`, "GET")
      .then((res) => {
        ServerRequest(`data/favouritesongs/${res[0]._id}`, "DELETE")
          .catch(() => {
            setForceReload(!forceReload)
            notify('Song removed from favourites correctly')
          })
      })
  }


  return (
    <div className={styles["PlaylistDetail-wrap"]}>
      {
        (entity === {})
          ? <p>Loading...</p>
          : <div className={styles["PlaylistDetail-header"]}>
            <CoverBg
              key={entity._id}
              id={entity._id}
              title={entity.title}
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
                handleAddToFavourites={AddSongToFavourites}
                handleRemoveFromFavourites={RemoveSongFromFavourites}
                song={song.id_song}
                isFav={song.id_song.isFav}
                index={index}
              />
            ))}
          </div>
      }


    </div>
  )
}
