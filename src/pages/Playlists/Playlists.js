import React, { useState, useEffect } from 'react';
import { ServerRequest } from '../../helpers/ServerRequest';
import { DecodeToken } from '../../utils/DecodeToken';
import { getToken } from '../../utils/LocalStorage.utils';
import { CoverMd } from "../../components/CoverMd/CoverMd";
import { MyButton } from '../../components/MyButton/MyButton';
import { Modal } from "../../components/Modal/Modal";
import { EditPlaylist } from "../../components/EditPlaylist/EditPlaylist";
import CreatePlaylist from "../../components/CreatePlaylist/CreatePlaylist";

import styles from './Playlists.module.css';


export const Playlists = () => {

  const userId = DecodeToken(getToken()).id;
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [editPlaylist, setEditPlaylist] = useState();

  //GET USER PLAYLISTS
  useEffect(() => {
    ServerRequest(`data/playlist/?id_owner=${userId}`, "GET")
      .then(response => setUserPlaylists(response))
      .catch(console.log)
      console.log('user playlists', userPlaylists);
  }, [])

  //GET ALL PLAYLISTS
  useEffect(() => {
    ServerRequest(`data/playlist`, "GET")
      .then(response => setPlaylists(response))
      .catch(console.log)
      console.log('playlists', playlists)
  }, [])

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
                  handleOpenOptions={() => handleOpenEditPlaylist(playlist)}
              />
            ))}
        </div>
        }
        {openModalNewPlaylist &&
        <Modal handleClose={handleCloseNewPlaylist}>
          <CreatePlaylist handleClose={handleOpenNewPlaylist}/>
        </Modal>}

      {openModalEditPlaylist &&
        <Modal handleClose={handleCloseEditPlaylist}>
          <EditPlaylist handleClose={handleOpenEditPlaylist} playlist={editPlaylist}/>
        </Modal>}
    </>
  )
}
