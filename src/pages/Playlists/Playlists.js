import React from 'react';
import { CoverBg } from "../../components/CoverBg/CoverBg";
import { CoverMd } from "../../components/CoverMd/CoverMd";
import { CoverSm } from "../../components/CoverSm/CoverSm";
import { ListaSongsFake } from "../../data/fakeSongs";

export const Playlists = () => {

  return (
    <>
      <h1>Playlists</h1>

      <div className="CoversBg-wrap-profile">
        {ListaSongsFake.map((song) => (
          <CoverBg
            key={song._id}
            title={song.title}
            categories={song.categories}
            author={song.author}
            img={song.img}
          />
        ))}
      </div>

      <div className="CoversMd-wrap-profile">
        {ListaSongsFake.map((song) => (
          <CoverMd
            key={song._id}
            title={song.title}
            categories={song.categories}
            author={song.author}
            img={song.img}
          />
        ))}
      </div>

      <div className="CoversMd-wrap-profile">
        {ListaSongsFake.map((song) => (
          <CoverSm
            key={song._id}
            title={song.title}
            categories={song.categories}
            author={song.author}
            img={song.img}
          />
        ))}
      </div>

    </>
  )
}
