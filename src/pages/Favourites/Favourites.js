import React, { useContext, useState, useEffect } from 'react';
import styles from './Favourites.module.css';
import { Modal } from "../../components/Modal/Modal";
import { CoverMd } from "../../components/CoverMd/CoverMd";
import { CoverSm } from "../../components/CoverSm/CoverSm";
import { ServerRequest } from '../../helpers/ServerRequest';
import { UserContext } from '../../contexts/UserContext/contextProvider';
import { EditPlaylist } from "../../components/EditPlaylist/EditPlaylist";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { playerActions } from '../../reducers/playerReducer';
import { PlayerContext } from '../../contexts/PlayerContext/playerContext';
import { toast } from "react-toastify";

export const Favourites = () => {

  const notify = (e) => toast(`${e}`);

  const { userId } = useContext(UserContext);
  const { dispatchPlayer } = useContext(PlayerContext);
  const [songId, setSongId] = useState([]);
  const [forceReload, setForceReload] = useState(false);
  const [editPlaylist, setEditPlaylist] = useState();
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
      .then(response => {
        setFavPlaylists(response)
        setUserPlaylists(response.filter((playlist) => playlist.id_owner === userId));
      })
      .catch(console.log)
  }, [forceReload])

  //REMOVE SONG FROM FAVOURITES
  const RemoveSongFromFavourites = (songId) => {
    ServerRequest(`data/favouritesongs/?id_song=${songId}&&id_user=${userId}`, "GET")
      .then((res) => {
        const resId = res;
        ServerRequest(`data/favouritesongs/${resId[0]._id}`, "DELETE")
          .then(() => favSongs.filter((favSong) => favSong.id_song._id !== songId))
          .catch(() => {
            notify('Song removed from favourites correctly')
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
          .then(() => favPlaylists.filter((favPlaylist) => favPlaylist.id_playlist._id !== playlistId))
          .catch(() => {
            notify('Playlist removed from favourites correctly')
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
        notify('Song added to playlist correctly')
        setOpenModalAddToPlaylist(!openModalAddToPlaylist);
        setForceReload(!forceReload);
      })
      .catch((response) => notify(response.error))
  }

  //PLAY PLAYLIST
  const handlePlayPlaylist = (playlistId) => {
    ServerRequest(`data/songsinplaylist/?id_playlist=${playlistId}`, "GET")
      .then(payload => { dispatchPlayer({ type: playerActions.START_PLAY, songs: payload.map(playlist => playlist.id_song) }) })
      .catch(console.log)
  };

  //ADD PLAYLIST TO QUEUE
  const handleAddToQueue = (playlistId) => {
    ServerRequest(`data/songsinplaylist/?id_playlist=${playlistId}`, "GET")
      .then(payload => {
        console.log(payload)
        payload.map(payload => dispatchPlayer({ type: playerActions.ADD_TO_QUEUE, song: payload.id_song }))
        notify('Playlist added to queue correctly')
      })
      .catch((response) => notify(response.error))
  };

  //Gestión modal EditPlaylist
  const [openModalEditPlaylist, setOpenModalEditPlaylist] = useState(false);
  const handleOpenEditPlaylist = (e) => {
    setEditPlaylist(e);
    setForceReload(!forceReload)
    setOpenModalEditPlaylist(!openModalEditPlaylist)
  };
  const handleCloseEditPlaylist = (e) => {
    const { className: el } = e.target;
    if (el !== "backdrop" && el !== "fas fa-times") return;
    setOpenModalEditPlaylist(!openModalEditPlaylist);
  };

  return (
    <div className={styles["Favourites-wrap"]}>
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
                isFav={true}
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
                isFav={true}
                handleOpenOptions={() => handleOpenEditPlaylist(playlist)}
                handleRemoveFromFavourites={RemovePlaylistFromFavourites}
                handlePlay={handlePlayPlaylist}
                handleAddToQueue={handleAddToQueue}
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
      {openModalEditPlaylist &&
        <Modal handleClose={handleCloseEditPlaylist}>
          <EditPlaylist handleClose={handleOpenEditPlaylist} playlist={editPlaylist} setForceReload={setForceReload} forceReload={forceReload} />
        </Modal>}
    </div>
  )
}
