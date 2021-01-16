import React from "react";

import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import styles from './SongItem.module.css';


export const SongItem = ({ id, title, category, author, img, handleAddToPlaylist, handleDeleteSong, handleEditSong }) => {
    return (
        <div className={styles["SongItem-card"]}>
            <div style={{ backgroundImage: `url(${img})` }} className={styles["SongItem-img"]}>
                <div className={styles["SongItem-icon-wrapper"]}>
                <i className="fas fa-play play-icon"></i>
                </div>
            </div>      
            <div className={styles["SongItem-text"]}>
              <p className={styles["SongItem-title"]}>{title}</p>
              <p>{author}</p>
              <p>{category}</p>     
              <div className={styles["SongItem-icons"]}> 
              <AddCircleIcon
                  fontSize="small"
                  style={{ color: "white" }}
                  onClick={() => handleAddToPlaylist(id)}
              />
            
              <EditIcon
                  fontSize="small"
                //   style={{ color: "white", opacity: "50%" }}
                  style={{ color: "white" }}
                  onClick={() => handleEditSong(id)}
              />
              <DeleteOutlineOutlinedIcon
                  fontSize="small"
                  style={{ color: "white" }}
                  onClick={() => handleDeleteSong(id)}
              />
                </div>
            </div>
        </div >     
    );
};
