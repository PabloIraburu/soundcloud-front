import React, { useContext, useState, useEffect } from "react";
import styles from "./CoverMd.module.css";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { PlayerContext } from "../../contexts/PlayerContext/playerContext";
import { ServerRequest } from "../../helpers/ServerRequest";
import { UserContext } from "../../contexts/UserContext/contextProvider";


export const CoverMd = (
    {
        entity,
        id,
        img,
        title,
        categories,
        author,
        description,
        entityType,
        handleAddToFavourites,
        handleRemoveFromFavourites,
        handlePlay,
        handleOpenOptions,

    }) => {

    const { userId } = useContext(UserContext);
    const { player, dispatchPlayer } = useContext(PlayerContext);
    const [isFav, setIsFav] = useState(false);

    // GET FAVOURITE PLAYLISTS
    useEffect(() => {
        ServerRequest(`data/favouriteplaylists/?id_user=${userId}`, "GET")
            .then(response => (
                response.find((fplaylist) => {
                    if (fplaylist.id_playlist === id) {
                        setIsFav(!isFav)
                    }
                })))
            .catch(console.log)
    }, [id])

    return (
        <div className={styles["CoverMd-wrap"]}>
            <div
                style={{ backgroundImage: `url(${img})` }}
                className={styles["CoverMd-img"]}
            >
                <div className={styles["icon-wrapper"]}>
                    <MoreHorizRoundedIcon
                        fontSize="small"
                        onClick={() => handleOpenOptions(entity)}
                    />
                    <div className={styles["PlayButton"]}>
                        <PlayCircleFilledIcon
                            fontSize="large"
                            onClick={() => handlePlay(entity._id)}
                        />
                    </div>

                    {!isFav && <FavoriteBorderOutlinedIcon
                        fontSize="small"
                        onClick={() => handleAddToFavourites(id)}
                    />}
                    {isFav && <FavoriteIcon
                        fontSize="small"
                        style={{ color: '#f9b807' }}
                        onClick={() => handleRemoveFromFavourites(id)}
                    />}

                </div>
            </div>
            <div className={styles["CoverMd-text"]}>
                <Link className={styles["CoverMd-title"]} to={{ pathname: `/${entityType}/${id}`, state: id }}>
                    {/* <Link className={styles["CoverMd-title"]} to={{ pathname: `/${entityType}/${id}`, state: { entity } }}>*/}
                    {title}
                </Link>
                <p className={styles["CoverMd-author"]}>{author}</p>
                <p className={styles["CoverMd-category"]}>{categories}</p>
                <p className={styles["CoverMd-description"]}>{description}</p>
            </div>
        </div>
    );
};
