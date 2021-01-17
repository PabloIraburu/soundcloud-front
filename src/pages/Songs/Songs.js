import React, { useReducer, useEffect, useRef } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { songsReducer } from "../../reducers/songsReducer";
import "./Songs.css";


const init = () => {
    return JSON.parse(localStorage.getItem("todos")) || [];
};


export const Songs = () => {

    const [songs, dispatch] = useReducer(songsReducer, [], init);

    useEffect(() => {
        //actualizar, esto no está bien
        // localStorage.setItem("todos", JSON.stringify(todos));
    }, [songs]);

    //Usamos el useRef para seleccionar el input tras hacer submit y seguir escribiendo;
    const ref = useRef(null);

    const handleSubmit = (e) => {
        // if (description.trim().length <= 1) {
        //     return;
        // }

        //añadir objeto con array de canciones

        // dispatch to add
        // dispatch({
        //     type: "add",
        //     payload: newSong,
        // });
    };

    const handleKeyUp = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    };

    const handleDelete = (songId) => {
        // create action
        const deleteSong = {
            type: "delete",
            payload: songId,
        };
        // dispatch to delete
        dispatch(deleteSong);
    };

    return (
        <>
            <div className="Songs-wrap">
                <h1>Songs</h1>
                <div className="add-list-options">
                    <input
                        type="text"
                        name="description"
                        /* 
                        value={description}
                        onChange={handleInputChange}
                        */
                        onKeyUp={handleKeyUp}
                        ref={ref}
                        placeholder="Add new to do"
                        autoComplete="off"
                    />
                    <AddCircleIcon
                        fontSize="large"
                        style={{ color: "white" }}
                        onClick={handleSubmit}
                    />
                </div>


            </div>
        </>
    )
}




