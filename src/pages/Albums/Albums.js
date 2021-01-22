import React, { useState, useEffect } from 'react';
import { ServerRequest } from '../../helpers/ServerRequest';
import { DecodeToken } from '../../utils/DecodeToken';
import { getToken } from '../../utils/LocalStorage.utils';
import { CoverMd } from "../../components/CoverMd/CoverMd";
import { MyButton } from '../../components/MyButton/MyButton';
import { Modal } from "../../components/Modal/Modal";
import { EditAlbum } from "../../components/EditAlbum/EditAlbum";
import CreateAlbum from "../../components/CreateAlbum/CreateAlbum";

import styles from './Albums.module.css';


export const Albums = () => {

  const userId = DecodeToken(getToken()).id;
  const [userAlbums, setUserAlbums] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [editAlbum, setEditAlbum] = useState();

  //GET USER Album
  useEffect(() => {
    ServerRequest(`data/album/?id_owner=${userId}`, "GET")
      .then(response => setUserAlbums(response))
      .catch(console.log)
  }, [])

  //GET ALL Album
  useEffect(() => {
    ServerRequest(`data/album`, "GET")
      .then(response => {
          setAlbums(response)
          console.log('this', response)
      })

      .catch(console.log)
  }, [])

  //Gestión modal NewAlbum
  const [openModalNewAlbum, setOpenModalNewAlbum] = useState(false);
  const handleOpenNewAlbum = () => setOpenModalNewAlbum(!openModalNewAlbum);
  const handleCloseNewAlbum = (e) => {
      const { className: el } = e.target;
      if (el !== "backdrop" && el !== "fas fa-times") return;
      setOpenModalNewAlbum(!openModalNewAlbum);
  };

  //Gestión modal EditAlbum
  const [openModalEditAlbum, setOpenModalEditAlbum] = useState(false);
  const handleOpenEditAlbum = (e) => {
    setEditAlbum(e);
    setOpenModalEditAlbum(!openModalEditAlbum)
  };
  const handleCloseEditAlbum = (e) => {
      const { className: el } = e.target;
      if (el !== "backdrop" && el !== "fas fa-times") return;
      setOpenModalEditAlbum(!openModalEditAlbum);
  };

  return (
    <>
      <div className={styles["Albums-header"]}>
        <h1>My Albums</h1>
        <MyButton onClick={handleOpenNewAlbum} variant="pink-or" size="150px">New Album</MyButton>
      </div>
        {
          (userAlbums.lenght !== 0) &&
          <div className={styles["Albums-list"]}>
            {userAlbums.map((album) => (
              <CoverMd
                  entity={album}
                  key={album._id}
                  title={album.title}
                  description={album.description}
                  img={album.image}
                  id={album._id}
                  entityType="album"
                  handleOpenOptions={() => handleOpenEditAlbum(album)}
              />
            ))}
        </div>
        }
        <h1>All Albums</h1>

        {
          (albums.lenght !== 0) &&
          <div className={styles["Albums-list"]}>
            {albums.map((album) => (
              <CoverMd
                  entity={album}
                  key={album._id}
                  title={album.title}
                  description={album.description}
                  img={album.image}
                  id={album._id}
                  entityType="album"
                  handleOpenOptions={() => handleOpenEditAlbum(album)}
              />
            ))}
        </div>
        }
        {openModalNewAlbum &&
        <Modal handleClose={handleCloseNewAlbum}>
          <CreateAlbum handleClose={handleOpenNewAlbum}/>
        </Modal>}

      {openModalEditAlbum &&
        <Modal handleClose={handleCloseEditAlbum}>
          <EditAlbum handleClose={handleOpenEditAlbum} albums={editAlbum}/>
        </Modal>}
    </>
  )
}
