import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { CoverBg } from '../../components/CoverBg/CoverBg'
import { SongItemList } from '../../components/SongItemList/SongItemList'
import { SongsContext } from "../../contexts/SongsContext/songsContext";
import styles from "./PlaylistDetail.module.css";
import { useParams } from 'react-router-dom';
import { ServerRequest } from '../../helpers/ServerRequest';


export const PlaylistDetail = () => {

  const { songs } = useContext(SongsContext);
  const location = useLocation();

  const entityId = useParams();
  console.log("album Id", entityId.id)

  const [entity, setEntity] = useState({});

  useEffect(() => {
    setEntity(location.state.entity)
  }, [])

  // useEffect(() => {
  //   ServerRequest(`/playlist/`)
  // }, [input])

  return (
    <>
      {
        (entity !== undefined) &&
        <div className={styles["PlaylistDetail-header"]}>
          <CoverBg
            title={entity.title}
            categories={entity.category}
            author={entity.id_owner}
            img={entity.image}
            description={entity.description}
          />
        </div>
      }
      {/* <MyButton onClick={handleOpenNewPlaylist} variant="pink-or" size="150px">New Playlist</MyButton> */}

      {
        // (playlistSongs.lenght !== 0) &&
        (songs.lenght !== 0) &&
        <div className={styles["PlaylistDetail-list"]}>
          {/* {playlistSongs.map((songs) => ( */}
          {songs.map((songs) => (
            <SongItemList
              // handleAddRemove={handleRemoveSongFromPlaylist}
              // handleAddFavSong={handleAddSongToFav}
              song={songs}
            />
          ))}
        </div>
      }

    </>
  )
}
