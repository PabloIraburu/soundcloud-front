import React from "react";

import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditIcon from "@material-ui/icons/Edit";
import styles from './SongItem.module.css';


export const SongItem = ({ id, title, category, author, img, handleClick, handleDeleteSong, handleEditSong }) => {
    return (
        <>
            {/* TODOLISTITEM: todo, index, handleDelete, handleToggle */}
            {/* <li
                key={id}
                onClick={() => handleToggle(id)}
                className={`${done && "complete"}`}
            > */}
                <div className={styles["SongItem-card"]}>
                    <div style={{ backgroundImage: `url(${img})` }} className={styles["SongItem-img"]}>
                        <div className={styles["SongItem-icon-wrapper"]}>
                        <i className="fas fa-play play-icon"></i>
                        </div>
                    </div>

                    <div className={styles["SongItem-text"]}>
                      <p className={styles["SongItem-title"]} onClick={handleClick}>{title}</p>
                      <p>{author}</p>
                      <p>{category}</p>

                      <div className={styles["SongItem-icons"]}> 
                      <DeleteOutlineOutlinedIcon
                          fontSize="small"
                          style={{ color: "white" }}
                          onClick={() => handleDeleteSong(id)}
                      />
                      <EditIcon
                          fontSize="small"
                          style={{ color: "white", opacity: "50%" }}
                          onClick={() => handleEditSong(id)}
                      />
                        </div>
                    </div>
                </div >

            {/* </li> */}

        </>
    );
};
