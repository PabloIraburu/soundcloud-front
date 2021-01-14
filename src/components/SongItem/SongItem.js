import React from "react";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditIcon from "@material-ui/icons/Edit";

export const SongItem = ({ song, handleDelete, handleToggle, handleEdit }) => {
    return (
        <>
            {/* TODOLISTITEM: todo, index, handleDelete, handleToggle */}
            <li
                key={song.id}
                onClick={() => handleToggle(song.id)}
                className={`${song.done && "complete"}`}
            >
                {song.desc}
            </li>

            <div key="icons-div" className="icons-options">
                <DeleteOutlineOutlinedIcon
                    fontSize="small"
                    style={{ color: "white" }}
                    onClick={() => handleDelete(song.id)}
                />
                <EditIcon
                    fontSize="small"
                    style={{ color: "white", opacity: "50%" }}
                    onClick={() => handleDelete(song.id)}
                />
            </div>
        </>
    );
};
