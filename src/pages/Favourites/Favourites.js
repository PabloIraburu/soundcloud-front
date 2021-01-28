import React, { useContext, useState, useEffect } from 'react';
import styles from './Favourites.module.css';
import { Modal } from "../../components/Modal/Modal";
import { CoverMd } from "../../components/CoverMd/CoverMd";
import { CoverSm } from "../../components/CoverSm/CoverSm";
import { ServerRequest } from '../../helpers/ServerRequest';
import { UserContext } from '../../contexts/UserContext/contextProvider';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { playerActions } from '../../reducers/playerReducer';
import { PlayerContext } from '../../contexts/PlayerContext/playerContext';

export const Favourites = () => {

  const { userId } = useContext(UserContext);
  const { dispatchPlayer } = useContext(PlayerContext);
  const [songId, setSongId] = useState([]);
  const [forceReload, setForceReload] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [favSongs, setFavSongs] = useState([]);
  const [favPlaylists, setFavPlaylists] = useState([]);

  console.log("favSong", favSongs);
  console.log("favourites", favPlaylists);


  //GET FAVOURITE SONGS
  useEffect(() => {
    ServerRequest(`data/favouritesongs/?id_user=${userId}`, "GET")
      .then(response => setFavSongs(response))
      .catch(console.log)
  }, [forceReload]);

  //GET FAVOURITE PLAYLISTS
  useEffect(() => {
    ServerRequest(`data/favouriteplaylists/?id_user=${userId}`, "GET")
      .then(response => setFavPlaylists(response))
      .catch(console.log)
  }, [forceReload])

  //REMOVE SONG FROM FAVOURITES
  const RemoveSongFromFavourites = (songId) => {
    ServerRequest(`data/favouritesongs/?id_song=${songId}&&id_user=${userId}`, "GET")
      .then((res) => {
        const resId = res;
        ServerRequest(`data/favouritesongs/${resId[0]._id}`, "DELETE")
          .then(() => favSongs.filter((favSong) => favSong.id_song !== songId))
          .catch(() => {
            setForceReload(!forceReload)
          })
      })
      .catch(console.log)
  }

  //REMOVE PLAYLIST FROM FAVOURITES
  const RemovePlaylistFromFavourites = (playlistId) => {
    ServerRequest(`data/favouriteplaylists/?id_playlist=${playlistId}&&id_user=${userId}`, "GET")
      .then((res) => {
        const resId = res;
        ServerRequest(`data/favouriteplaylists/${resId[0]._id}`, "DELETE")
          .then(() => favPlaylists.filter((favPlaylist) => favPlaylist.id_playlist !== playlistId))
          .catch(() => {
            setForceReload(!forceReload)
          })
      })
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

  //PLAY PLAYLIST
  const handlePlayPlaylist = (playlistId) => {
    ServerRequest(`data/songsinplaylist/?id_playlist=${playlistId}`, "GET")
      .then(payload => { dispatchPlayer({ type: playerActions.START_PLAY, songs: payload.map(playlist => playlist.id_song) }) })
      .catch(console.log)
  };

  //GET SONGS IN PLAYLIST TO HANDLE ADD TO QUEUE
  const handleAddToQueue = (playlistId) => {
    ServerRequest(`data/songsinplaylist/?id_playlist=${playlistId}`, "GET")
      .then(payload => dispatchPlayer({ type: playerActions.ADD_TO_QUEUE, song: payload.id_song }))
      .catch(console.log)
  };

  return (
    <>
      <h1>Favourites</h1>

      <h3>Favourite songs</h3>
      {
        (favSongs.lenght === 0)
          ? <p>You haven't any favourite song.</p>
          : <div className={styles["Favourites-songs"]}>
            {favSongs.map((song) => (
              <CoverSm
                entity={song.id_song}
                key={song.id_song._id}
                title={song.id_song.title}
                author={song.id_song.artist}
                description={song.id_song.description}
                categories={song.id_song.category}
                img={song.id_song.image}
                id={song.id_song._id}
                entityType="song"
                handleRemoveFromFavourite={RemoveSongFromFavourites}
                handleAddToPlaylist={handleOpenAddToPlaylist}
              />
            ))}
          </div>
      }

      <h3>Favourite Playlists</h3>

      {
        (favPlaylists.lenght === 0)
          ? <p>You haven't any favourite playlist.</p>
          : <div className={styles["Favourites-playlists"]}>
            {favPlaylists.map((playlist) => (
              <CoverMd
                entity={playlist.id_playlist}
                key={playlist.id_playlist._id}
                title={playlist.id_playlist.title}
                description={playlist.id_playlist.description}
                categories={playlist.id_playlist.category}
                img={playlist.id_playlist.image}
                id={playlist.id_playlist._id}
                entityType="playlist"
                handleRemoveFromFavourites={RemovePlaylistFromFavourites}
                handleOpenOptions={() => handleAddToQueue(playlist._id)}
                handlePlay={handlePlayPlaylist}
              />
            ))}
          </div>
      }

      {openModalAddToPlaylist && (
        <Modal handleClose={handleCloseAddToPlaylist}>
          <h3>Add song to playlist</h3>
          {userPlaylists.length === 0
            ? <p>You haven't created any playlists yet</p>
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
