import React, { useContext, useState, useEffect } from "react";
import styles from './CoverSm.module.css';
import { PlayerContext } from "../../contexts/PlayerContext/playerContext";
import { playerActions } from "../../reducers/playerReducer";
import { UserContext } from "../../contexts/UserContext/contextProvider";
import { ServerRequest } from "../../helpers/ServerRequest";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import LibraryMusicOutlinedIcon from '@material-ui/icons/LibraryMusicOutlined';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from "@material-ui/styles";


export const CoverSm = ({ entity, title, categories, author, img, description, id, index, handleAddToFavourites, handleRemoveFromFavourites, handleAddToPlaylist }) => {

    const { userId } = useContext(UserContext);
    const { dispatchPlayer } = useContext(PlayerContext);
    const [isFav, setIsFav] = useState(false);
    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            border: '1px solid #dadde9',
        },
    }))(Tooltip);

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
                <p
                    className={styles["CoverSm-title"]}
                    onClick={() => dispatchPlayer({ type: playerActions.PLAY_SONG, song: entity })}
                >
                    {title}
                </p>
                <p className={styles["CoverSm-author"]}>{author}</p>
                <p className={styles["CoverSm-category"]}>{categories}</p>
                <p className={styles["CoverSm-description"]}>{description}</p>
            </div>
            <div className={styles["CoverSm-button-options"]}>
                <HtmlTooltip title="Add To Playlist" placement="left">
                    <LibraryMusicOutlinedIcon
                        fontSize="inherit"
                        onClick={() => handleAddToPlaylist(id)}
                    />
                </HtmlTooltip>

                <HtmlTooltip title="Add To Queue" placement="left">
                    <PlaylistAddIcon
                        fontSize="inherit"
                        onClick={() => dispatchPlayer({ type: playerActions.ADD_TO_QUEUE, song: entity })}
                    />
                </HtmlTooltip>

                {
                    !isFav &&
                    <HtmlTooltip title="Add Favorite" placement="left">
                        <div className={styles["FavoriteIcon"]}>
                            <FavoriteBorderOutlinedIcon
                                fontSize="inherit"
                                // style={{ color: '#f9b807' }}
                                onClick={() => handleAddToFavourites(id)}
                            />
                        </div>
                    </HtmlTooltip>
                }
                {
                    isFav &&
                    <HtmlTooltip title="Remove Favorite" placement="left">
                        <div className={styles["FavoriteIcon"]}>
                            <FavoriteIcon
                                fontSize="inherit"
                                // style={{ color: '#f9b807' }}
                                onClick={() => handleRemoveFromFavourites(id)}
                            />
                        </div>
                    </HtmlTooltip>
                }
            </div>
        </div>
    );
};

