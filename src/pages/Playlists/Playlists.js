import React, { useState, useEffect, useContext } from 'react';
import { ServerRequest } from '../../helpers/ServerRequest';
import { CoverMd } from "../../components/CoverMd/CoverMd";
import { MyButton } from '../../components/MyButton/MyButton';
import { Modal } from "../../components/Modal/Modal";
import { EditPlaylist } from "../../components/EditPlaylist/EditPlaylist";
import CreatePlaylist from "../../components/CreatePlaylist/CreatePlaylist";
import { UserContext } from '../../contexts/UserContext/contextProvider';
import { PlayerContext } from '../../contexts/PlayerContext/playerContext';
import { playerActions } from '../../reducers/playerReducer';
import { ToastContainer, toast } from 'react-toastify';
import styles from './Playlists.module.css';


export const Playlists = () => {

  const notify = (e) => toast(`${e}`);
  const { userId } = useContext(UserContext);
  const { dispatchPlayer } = useContext(PlayerContext);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [editPlaylist, setEditPlaylist] = useState();
  const [favPlaylists, setFavPlaylists] = useState([]);
  const [forceReload, setForceReload] = useState(false);

  console.log("Playlist id", playlists._id);

  //GET USER PLAYLISTS
  useEffect(() => {
    ServerRequest(`data/playlist/?id_owner=${userId}`, "GET")
      .then(response => setUserPlaylists(response))
      .catch(console.log)
    console.log('user playlists', userPlaylists);
  }, [forceReload])

  //GET ALL PLAYLISTS
  useEffect(() => {
    ServerRequest(`data/playlist`, "GET")
      .then(response => setPlaylists(response))
      .catch(console.log)
    console.log('playlists', playlists)
  }, [forceReload])


  //ADD PLAYLIST TO FAVOURITES
  const AddPlaylistToFavourites = (playlistId) => {
    const favPlaylist = {
      id_playlist: playlistId,
      id_user: userId,
      isFav: true
    }
    ServerRequest("data/favouriteplaylists", "POST", favPlaylist)
      .then((response) => {
        notify('Playlist added to favourites correctly')
        setFavPlaylists([...favPlaylists, response])
        setForceReload(!forceReload)
      })
      .catch(console.log)
  }

  //REMOVE PLAYLIST FROM FAVOURITES
  const RemovePlaylistFromFavourites = (playlistId) => {
    ServerRequest(`data/favouriteplaylists/?id_playlist=${playlistId}&&id_user=${userId}`, "DELETE")
      .then(() => {
        favPlaylists.filter((favPlaylist) => favPlaylist.id_playlist !== playlistId)
        notify('Playlist removed from favourites correctly')
        setForceReload(!forceReload)
      })
      .catch(console.log)
  }

  //GET SONGS IN PLAYLIST TO HANDLE ADD TO QUEUE
  const handleAddToQueue = (playlistId) => {
    ServerRequest(`data/songsinplaylist/?id_playlist=${playlistId}`, "GET")
      .then(payload => {
        dispatchPlayer({ type: playerActions.ADD_TO_QUEUE, song: payload.id_song })
        notify('Playlist added to queue correctly')
      })
      .catch(console.log)
    console.log('playlists', playlists)
  };

  //PLAY PLAYLIST
  const handlePlayPlaylist = (playlistId) => {
    ServerRequest(`data/songsinplaylist/?id_playlist=${playlistId}`, "GET")
      .then(payload => { dispatchPlayer({ type: playerActions.START_PLAY, songs: payload.map(playlist => playlist.id_song) }) })
      .catch(console.log)
  };


  //Gestión modal NewPlaylist
  const [openModalNewPlaylist, setOpenModalNewPlaylist] = useState(false);
  const handleOpenNewPlaylist = () => setOpenModalNewPlaylist(!openModalNewPlaylist);
  const handleCloseNewPlaylist = (e) => {
    const { className: el } = e.target;
    if (el !== "backdrop" && el !== "fas fa-times") return;
    setOpenModalNewPlaylist(!openModalNewPlaylist);
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
    <>
      <div className={styles["Playlists-header"]}>
        <h1>My Playlists</h1>
        <MyButton onClick={handleOpenNewPlaylist} variant="pink-or" size="150px">New Playlist</MyButton>
      </div>
      {
        (userPlaylists.lenght !== 0) &&
        <div className={styles["Playlists-list"]}>
          {userPlaylists.map((playlist) => (
            <CoverMd
              entity={playlist}
              key={playlist._id}
              title={playlist.title}
              description={playlist.description}
              img={playlist.image}
              id={playlist._id}
              entityType="playlist"
              handleOpenOptions={() => handleOpenEditPlaylist(playlist)}
              handleAddToFavourites={AddPlaylistToFavourites}
              handleRemoveFromFavourites={RemovePlaylistFromFavourites}
              handlePlay={handlePlayPlaylist}
              handleAddToQueue={handleAddToQueue}

            />
          ))}
        </div>
      }
      <h1>ALL PLAYLISTS</h1>

      {
        (playlists.lenght !== 0) &&
        <div className={styles["Playlists-list"]}>
          {playlists.map((playlist) => (
            <CoverMd
              entity={playlist}
              key={playlist._id}
              title={playlist.title}
              description={playlist.description}
              img={playlist.image}
              id={playlist._id}
              entityType="playlist"
              handleOpenOptions={() => handleOpenEditPlaylist(playlist)}
              handleAddToFavourites={AddPlaylistToFavourites}
              handleRemoveFromFavourites={RemovePlaylistFromFavourites}
              handlePlay={handlePlayPlaylist}
              handleAddToQueue={handleAddToQueue}

            />
          ))}
        </div>
      }
      {openModalNewPlaylist &&
        <Modal handleClose={handleCloseNewPlaylist}>
          <CreatePlaylist handleClose={handleOpenNewPlaylist} setForceReload={setForceReload} forceReload={forceReload} notify={notify} />
        </Modal>}

      {openModalEditPlaylist &&
        <Modal handleClose={handleCloseEditPlaylist}>
          <EditPlaylist handleClose={handleOpenEditPlaylist} playlist={editPlaylist} setForceReload={setForceReload} forceReload={forceReload} notify={notify} />
        </Modal>}

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}
