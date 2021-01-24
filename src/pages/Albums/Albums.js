import React, { useState, useEffect, useContext } from 'react';
import { ServerRequest } from '../../helpers/ServerRequest';
import { CoverMd } from "../../components/CoverMd/CoverMd";


import styles from './Albums.module.css';
import { UserContext } from '../../contexts/UserContext/contextProvider';


export const Albums = () => {

  const { userId } = useContext(UserContext);

  const [userAlbums, setUserAlbums] = useState([]);
  const [albums, setAlbums] = useState([]);

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

  return (
    <>
      <div className={styles["Albums-header"]}>
        <h1>My Albums</h1>
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
              author={album.author}
              img={album.image}
              id={album._id}
              entityType="album"
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
              author={album.author}
              entityType="album"
            />
          ))}
        </div>
      }

    </>
  )
}
