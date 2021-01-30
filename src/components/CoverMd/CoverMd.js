import React, { useContext, useState, useEffect } from "react";
import styles from "./CoverMd.module.css";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { PlayerContext } from "../../contexts/PlayerContext/playerContext";
import { playerActions } from "../../reducers/playerReducer";
import { ServerRequest } from "../../helpers/ServerRequest";
import { UserContext } from "../../contexts/UserContext/contextProvider";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from "@material-ui/styles";

export const CoverMd = (
    {
        entity,
        id,
        img,
        title,
        categories,
        author,
        description,
        isFav,
        entityType,
        handleAddToFavourites,
        handleRemoveFromFavourites,
        handlePlay,
        handleOpenOptions,
        handleAddToQueue

    }) => {

    const { userId } = useContext(UserContext);
    const { player, dispatchPlayer } = useContext(PlayerContext);
    const [favPlaylists, setFavPlaylists] = useState([]);
    // const [isFav, setIsFav] = useState(false);
    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            border: '1px solid #dadde9',
        },
    }))(Tooltip);


    // // GET FAVOURITE PLAYLISTS
    // useEffect(() => {
    //     ServerRequest(`data/favouriteplaylists/?id_user=${userId}`, "GET")
    //         .then(response => setFavPlaylists(response))
    //         .catch(console.log)
    // }, [id])

    // // GET FAVOURITE PLAYLISTS
    // useEffect(() => {
    //     favPlaylists.find((fplaylist) => {
    //         if (fplaylist.id_playlist._id === id) {
    //             setIsFav(!isFav)
    //         }
    //     })
    // }, [id, favPlaylists])

    return (
        <div className={styles["CoverMd-wrap"]}>
            <div
                style={{ backgroundImage: `url(${img})` }}
                className={styles["CoverMd-img"]}
            >
                <div className={styles["icon-wrapper"]}>
                    <HtmlTooltip title="Add To Queue" placement="left">
                        <PlaylistAddIcon
                            fontSize="small"
                            onClick={() => handleAddToQueue(id)}
                        />
                    </HtmlTooltip>

                    <div /*className={styles["PlayButton"]} */>
                        <HtmlTooltip title="Play" placement="top">
                            <PlayCircleFilledIcon
                                // fontSize="large"
                                style={{ fontSize: 50 }}
                                onClick={() => handlePlay(id)}
                            />
                        </HtmlTooltip>

                    </div>

                    {!isFav &&
                        <HtmlTooltip title="Add Favourites" placement="right">
                            <FavoriteBorderOutlinedIcon
                                fontSize="small"
                                onClick={() => handleAddToFavourites(id)}
                            />
                        </HtmlTooltip>

                    }
                    {isFav &&
                        <HtmlTooltip title="Remove Favourite" placement="right">
                            <FavoriteIcon
                                fontSize="small"
                                style={{ color: '#f9b807' }}
                                onClick={() => handleRemoveFromFavourites(id)}
                            />
                        </HtmlTooltip>
                    }

                </div>
            </div>
            <div className={styles["CoverMd-info"]}>
                <div className={styles["CoverMd-text"]}>

                    <Link className={styles["CoverMd-title"]} to={{ pathname: `/${entityType}/${id}`, state: id }}>
                        {title}
                    </Link>
                    <p className={styles["CoverMd-author"]}>{author}</p>
                    <p className={styles["CoverMd-category"]}>{categories}</p>
                    <p className={styles["CoverMd-description"]}>{description}</p>
                </div>

                <div className={styles["CoverMd-icon"]}>
                    <HtmlTooltip title="Edit Playlist" placement="bottom">
                        <MoreVertIcon fontSize="small" onClick={() => handleOpenOptions(id)} />
                    </HtmlTooltip>
                </div>
            </div>
        </div>
    );
};
