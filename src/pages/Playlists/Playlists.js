import React, { useState, useEffect, useContext } from 'react';
import { ServerRequest } from '../../helpers/ServerRequest';
import { CoverMd } from "../../components/CoverMd/CoverMd";
import { MyButton } from '../../components/MyButton/MyButton';
import { Modal } from "../../components/Modal/Modal";
import { EditPlaylist } from "../../components/EditPlaylist/EditPlaylist";
import CreatePlaylist from "../../components/CreatePlaylist/CreatePlaylist";

import styles from './Playlists.module.css';
import { UserContext } from '../../contexts/UserContext/contextProvider';


export const Playlists = () => {

  const { userId } = useContext(UserContext);

  const [userPlaylists, setUserPlaylists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [editPlaylist, setEditPlaylist] = useState();
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

  // const handleAddToFavourite = (id) => {
  //   const newFavoritePlaylist = {
  //     user_id: userId,
  //     song_id: id
  //   }
  //   ServerRequest(`favouritesongs`, "POST", newFavoritePlaylist)
  // }

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
            />
          ))}
        </div>
      }
      {openModalNewPlaylist &&
        <Modal handleClose={handleCloseNewPlaylist}>
          <CreatePlaylist handleClose={handleOpenNewPlaylist} />
        </Modal>}

      {openModalEditPlaylist &&
        <Modal handleClose={handleCloseEditPlaylist}>
          <EditPlaylist handleClose={handleOpenEditPlaylist} playlist={editPlaylist} setForceReload={setForceReload} forceReload={forceReload}/>
        </Modal>}
    </>
  )
}
