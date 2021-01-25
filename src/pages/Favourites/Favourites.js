import React, { useEffect, useState, useContext } from 'react';
import { CoverMd } from "../../components/CoverMd/CoverMd";
import { CoverSm } from "../../components/CoverSm/CoverSm";
import styles from './Favourites.module.css';
import { ServerRequest } from '../../helpers/ServerRequest';
import { UserContext } from '../../contexts/UserContext/contextProvider';

export const Favourites = () => {

  const { userId } = useContext(UserContext);

  const [favSongs, setFavSongs] = useState([]);
  const [favPlaylists, setFavPlaylists] = useState([]);

  //GET FAVOURITE SONGS
  useEffect(() => {
    ServerRequest(`data/favouritesongs/?id_user=${userId}`, "GET")
      .then(response => setFavSongs(...favSongs, response))
      .catch(console.log)
    }, []);
    
    //GET FAVOURITE PLAYLISTS
    useEffect(() => {
      ServerRequest(`data/favouriteplaylists/?id_user=${userId}`, "GET")
      .then(response => setFavPlaylists(...favPlaylists, response))
      .catch(console.log)
    }, []);
    
    console.log("favSong", favSongs);
    console.log("favPlaylist", favPlaylists);
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
                entity={song}
                key={song._id}
                title={song.title}
                description={song.description}
                img={song.image}
                id={song._id}
                entityType="song"
              // handleOpenOptions={() => handleOpenEditPlaylist(song)}
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
                entity={playlist}
                key={playlist._id}
                title={playlist.title}
                description={playlist.description}
                img={playlist.image}
                id={playlist._id}
                entityType="playlist"
              // handleOpenOptions={() => handleOpenEditPlaylist(playlist)}
              />
            ))}
          </div>
      }
    </>
  )
}
