import React, { useContext, useState, useEffect } from 'react';
import styles from './Favourites.module.css';
import { Modal } from "../../components/Modal/Modal";
import { CoverMd } from "../../components/CoverMd/CoverMd";
import { CoverSm } from "../../components/CoverSm/CoverSm";
import { FavContext } from "../../contexts/FavContext/favContext";
import { favActions } from "../../reducers/favouritesReducer";
import { ServerRequest } from '../../helpers/ServerRequest';
import { UserContext } from '../../contexts/UserContext/contextProvider';
import AddCircleIcon from '@material-ui/icons/AddCircle';


export const Favourites = () => {

  const { userId } = useContext(UserContext);
  const { favourite, dispatchFav } = useContext(FavContext);
  const [songId, setSongId] = useState([]);
  const [forceReload, setForceReload] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  console.log("favSong", favourite.favSongs);
  console.log("favourites", favourite);

  //GET PLAYLISTS
  useEffect(() => {
    ServerRequest(`data/playlist`, "GET")
      .then((response) => {
        setPlaylists(response);
        setUserPlaylists(response.filter((playlist) => {
          if (playlist.id_owner === userId) {
            return true
          }
        }));
      })
      .catch(console.log)
  }, [])

  //ADD SONG TO FAVOURITES
  const AddSongToFavourites = (songId) => {
    const favSong = {
      id_song: songId,
      id_user: userId,
      isFav: true
    }
    ServerRequest("data/favouritesongs", "POST", favSong)
      .then((payload) => { dispatchFav({ type: favActions.FAV_SONG, fSong: payload }) })
      .catch(console.log);
    console.log(favourite);
  }

  //REMOVE SONG FROM FAVOURITES
  const RemoveSongFromFavourites = (songId) => {
    ServerRequest(`data/favouritesongs/?id_song=${songId}&&id_user=${userId}`, "DELETE")
      .then(dispatchFav({ type: favActions.UNFAV_SONG, songId: songId }))
      .catch(console.log)
  }

  //ADD PLAYLIST TO FAVOURITES
  const AddPlaylistToFavourites = (playlistId) => {
    const favPlaylist = {
      id_playlist: playlistId,
      id_user: userId,
      isFav: true
    }
    ServerRequest("data/favouriteplaylists", "POST", favPlaylist)
      .then((payload) => { dispatchFav({ type: favActions.FAV_PLAYLIST, fPlaylist: payload }) })
      .catch(console.log)
  }

  //REMOVE PLAYLIST FROM FAVOURITES
  const RemovePlaylistFromFavourites = (playlistId) => {
    ServerRequest(`data/favouriteplaylists/?id_playlist=${playlistId}&&id_user=${userId}`, "DELETE")
      .then(dispatchFav({ type: favActions.UNFAV_PLAYLIST, playlistId: playlistId }))
      .catch(console.log)
  }

  //GESTIÓN ADD SONG TO PLAYLISTT
  //GESTIÓN MODAL ADD SONG TO PLAYLIST
  const [openModalAddToPlaylist, setOpenModalAddToPlaylist] = useState(false);
  const handleOpenAddToPlaylist = (id) => {
    setSongId(id);
    setOpenModalAddToPlaylist(!openModalAddToPlaylist);
    setForceReload(!forceReload);
  };
  const handleCloseAddToPlaylist = (e) => {
    const { className: el } = e.target;
    if (el !== "backdrop" && el !== "fas fa-times") return;
    setOpenModalAddToPlaylist(!openModalAddToPlaylist);
  };

  //ADD SONG TO PLAYLIST
  const handleAddToPlaylist = (playlistId) => {
    const newSongInPlaylist = {
      id_playlist: playlistId,
      id_song: songId
    }
    ServerRequest(`data/songsinplaylist`, "POST", newSongInPlaylist)
      .then(() => {
        setOpenModalAddToPlaylist(!openModalAddToPlaylist);
        setForceReload(!forceReload);
      })
      .catch(console.log)
  }

  return (
    <>
      <h1>Favourites</h1>

      <h3>Favourite songs</h3>
      {
        (favourite.favSongs.lenght === 0)
          ? <p>You haven't any favourite song.</p>
          : <div className={styles["Favourites-songs"]}>
            {favourite.favSongs.map((song) => (
              <CoverSm
                entity={song}
                key={song._id}
                title={song.title}
                description={song.description}
                img={song.image}
                id={song._id}
                entityType="song"
                handleAddToFavourites={AddSongToFavourites}
                handleRemoveFromFavourite={RemoveSongFromFavourites}
                handleAddToPlaylist={handleOpenAddToPlaylist}
              />
            ))}
          </div>
      }

      <h3>Favourite Playlists</h3>

      {
        (favourite.favPlaylists.lenght === 0)
          ? <p>You haven't any favourite playlist.</p>
          : <div className={styles["Favourites-playlists"]}>
            {favourite.favPlaylists.map((playlist) => (
              <CoverMd
                entity={playlist}
                key={playlist._id}
                title={playlist.title}
                description={playlist.description}
                categories={playlist.category}
                img={playlist.image}
                id={playlist._id}
                entityType="playlist"
                handleAddToFavourites={AddPlaylistToFavourites}
                handleRemoveFromFavourites={RemovePlaylistFromFavourites}
              // handleOpenOptions={() => handleOpenEditPlaylist(playlist)}
              />
            ))}
          </div>
      }

      {openModalAddToPlaylist && (
        <Modal handleClose={handleCloseAddToPlaylist}>
          <h3>Add song to playlist</h3>
          {userPlaylists.length === 0
            ? <p>Any playlist created yet</p>
            : userPlaylists.map((playlist) => (
              <div className="Discover-AddToPlaylistList">
                <p onClick={() => handleAddToPlaylist(playlist._id)}>{playlist.title}</p>
                <AddCircleIcon
                  fontSize="inherit"
                  style={{ color: "#333" }}
                  onClick={() => handleAddToPlaylist(playlist._id)}
                />
              </div>
            ))}
        </Modal>
      )}
    </>
  )
}
