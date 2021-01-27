import React, { useContext, useState, useEffect } from "react";
import styles from './CoverSm.module.css';
import { Link } from "react-router-dom";
import { PlayerContext } from "../../contexts/PlayerContext/playerContext";
import { playerActions } from "../../reducers/playerReducer";
import { UserContext } from "../../contexts/UserContext/contextProvider";
import { ServerRequest } from "../../helpers/ServerRequest";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import LibraryMusicOutlinedIcon from '@material-ui/icons/LibraryMusicOutlined';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';


export const CoverSm = ({
    entity,
    title,
    categories,
    author,
    img,
    description,
    id,
    index,
    handleAddToFavourites,
    handleRemoveFromFavourites,
    handleAddToPlaylist
}) => {

    const { userId } = useContext(UserContext);
    const { player, dispatchPlayer } = useContext(PlayerContext);
    const [isFav, setIsFav] = useState(false);

    // GET FAVOURITE SONGS
    useEffect(() => {
        ServerRequest(`data/favouritesongs/?id_user=${userId}`, "GET")
            .then(response => (
                response.find((fsong) => {
                    if (fsong.id_song === id) {
                        setIsFav(!isFav);
                    }
                })))
            .catch(console.log)
    }, [id]);

    return (
        <div className={styles["CoverSm-card"]}>
            <div style={{ backgroundImage: `url(${img})` }} className={styles["CoverSm-img"]}>
                <div className={styles["CoverSm-icon-wrapper"]}>
                    <PlayCircleFilledIcon
                        fontSize="large"
                        onClick={() => dispatchPlayer({ type: playerActions.PLAY_SONG, song: entity })}
                    />
                </div>
            </div>
            <div className={styles["CoverSm-text"]}>
                <Link
                    className={styles["CoverSm-title"]}
                    onClick={() => dispatchPlayer({ type: playerActions.PLAY_SONG, song: entity })}
                >
                    {title}
                </Link>
                <p className={styles["CoverSm-author"]}>{author}</p>
                <p className={styles["CoverSm-category"]}>{categories}</p>
                <p className={styles["CoverSm-description"]}>{description}</p>
            </div>
            <div className={styles["CoverSm-button-options"]}>
                <LibraryMusicOutlinedIcon
                    fontSize="inherit"
                    onClick={() => handleAddToPlaylist(id)}
                />
                <PlaylistAddIcon
                    fontSize="inherit"
                    onClick={() => dispatchPlayer({ type: playerActions.ADD_TO_QUEUE, song: entity })}
                />

                {
                    !isFav && <FavoriteBorderOutlinedIcon
                        fontSize="inherit"
                        onClick={() => handleAddToFavourites(id)}
                    />
                }
                {
                    isFav && <FavoriteIcon
                        fontSize="inherit"
                        style={{ color: '#f9b807' }}
                        onClick={() => handleRemoveFromFavourites(id)}
                    />
                }
            </div>
        </div>
    );
};
