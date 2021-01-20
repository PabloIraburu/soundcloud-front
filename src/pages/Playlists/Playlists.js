import React, { useState, useEffect } from 'react';
import { ServerRequest } from '../../helpers/ServerRequest';
import { DecodeToken } from '../../utils/DecodeToken';
import { getToken } from '../../utils/LocalStorage.utils';
import { CoverMd } from "../../components/CoverMd/CoverMd";
import { MyButton } from '../../components/MyButton/MyButton';
import { Modal } from "../../components/Modal/Modal";
import CreatePlaylist from "../../components/CreatePlaylist/CreatePlaylist";

import styles from './Playlists.module.css';


export const Playlists = () => {
  const userId = DecodeToken(getToken()).id;
  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    ServerRequest(`data/playlist/?id_owner=${userId}`, "GET")
      .then(response => setUserPlaylists(response))
      .catch(console.log)
  }, [])

  //Gestión modal NewPlaylist
  const [openModalNewPlaylist, setOpenModalNewPlaylist] = useState(false);
  const handleOpenNewPlaylist = () => setOpenModalNewPlaylist(!openModalNewPlaylist);
  const handleCloseNewPlaylist = (e) => {
      const { className: el } = e.target;
      if (el !== "backdrop" && el !== "fas fa-times") return;
      setOpenModalNewPlaylist(!openModalNewPlaylist);
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
                  // handleOpenOptions={}
              />
            ))}
        </div>
        }
      {openModalNewPlaylist &&
        <Modal handleClose={handleCloseNewPlaylist}>
          <CreatePlaylist handleClose={handleOpenNewPlaylist}/>
        </Modal>}
    </>
  )
}
