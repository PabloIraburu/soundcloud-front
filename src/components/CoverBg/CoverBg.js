import React from "react";
import './CoverBg.css';
import { Link } from "react-router-dom";


export const CoverBg = ({ title, categories, author, img, podcastId, description }) => {

  return (
    <div className="">
      <div style={{ backgroundImage: `url(${img})` }} className="CoverBg-img">
        {/* <img src={img} alt={title} /> */}
      </div>
      <div className="icon-wrapper">
        <i className="fas fa-ellipsis-h icon-mini" />
        <i className="fas fa-play play-icon"></i>
        <i className="far fa-heart" />
      </div>
      <div className="CoverBg-text">
        {/* <Link className="CoverBg-title">{title}</Link> */}
        <p className="CoverBg-author">{author}</p>
        <p className="CoverBg-duration">{categories}</p>
        <p className="CoverBg-description">{description}</p>
        <p className="CoverBg-description">{podcastId}</p>
      </div>
    </div>
  );
};
