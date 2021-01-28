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
        entityType,
        handleAddToFavourites,
        handleRemoveFromFavourites,
        handlePlay,
        handleOpenOptions,

    }) => {

    const { userId } = useContext(UserContext);
    const { player, dispatchPlayer } = useContext(PlayerContext);
    const [isFav, setIsFav] = useState(false);
    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            border: '1px solid #dadde9',
        },
    }))(Tooltip);


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
                    <HtmlTooltip title="Add To Queue" placement="left">
                        <PlaylistAddIcon
                            fontSize="small"
                            onClick={() => dispatchPlayer({ type: playerActions.ADD_TO_QUEUE, song: entity })}
                        />
                    </HtmlTooltip>

                    <div /*className={styles["PlayButton"]} */>
                        <HtmlTooltip title="Play" placement="top">
                            <PlayCircleFilledIcon
                                fontSize="large"
                                onClick={() => handlePlay(id)}
                            />
                        </HtmlTooltip>

                    </div>

                    {!isFav &&
                        <HtmlTooltip title="Add Favourites" placement="top">
                            <FavoriteBorderOutlinedIcon
                                fontSize="small"
                                onClick={() => handleAddToFavourites(id)}
                            />
                        </HtmlTooltip>

                    }
                    {isFav &&
                        <HtmlTooltip title="Remove Favourite" placement="top">
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
                    <HtmlTooltip title="Options" placement="top">
                        <MoreVertIcon fontSize="small" />
                    </HtmlTooltip>
                </div>
            </div>
        </div>
    );
};
