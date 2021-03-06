import React, {useContext} from "react";
import styles from './CoverSm.module.css';
import {PlayerContext} from "../../contexts/PlayerContext/playerContext";
import {playerActions} from "../../reducers/playerReducer";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import LibraryMusicOutlinedIcon from '@material-ui/icons/LibraryMusicOutlined';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import {toast} from 'react-toastify';
import {withStyles} from "@material-ui/styles";


export const CoverSm = ({
                            entity,
                            title,
                            categories,
                            author,
                            img,
                            description,
                            id,
                            isFav,
                            index,
                            handleAddToFavourites,
                            handleRemoveFromFavourite,
                            handleAddToPlaylist
                        }) => {

    const notify = (e) => toast(`${e}`);
    const {dispatchPlayer} = useContext(PlayerContext);
    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            border: '1px solid #dadde9',
        },
    }))(Tooltip)

    return (
        <div className={styles["CoverSm-card"]}>
            <div style={{backgroundImage: `url(${img})`}} className={styles["CoverSm-img"]}>
                <div className={styles["CoverSm-icon-wrapper"]}>
                    <div className={styles["PlayButton"]}
                         onClick={() => dispatchPlayer({type: playerActions.PLAY_SONG, song: entity})}>
                        <PlayCircleFilledIcon
                            fontSize="large"
                            onClick={() => dispatchPlayer({type: playerActions.PLAY_SONG, song: entity})}
                        />
                    </div>
                </div>
            </div>
            <div className={styles["CoverSm-text"]}>
                <p
                    className={styles["CoverSm-title"]}
                    onClick={() => {
                        console.log("Song title", entity);
                        dispatchPlayer({type: playerActions.PLAY_SONG, song: entity})
                    }}
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
                        onClick={() => {
                            console.log("Add to playlist icon", id);
                            handleAddToPlaylist(id)
                        }}
                    />
                </HtmlTooltip>

                <HtmlTooltip title="Add To Queue" placement="left">
                    <PlaylistAddIcon
                        fontSize="inherit"
                        onClick={() => {
                            console.log("Add to queue icon", entity);
                            dispatchPlayer({type: playerActions.ADD_TO_QUEUE, song: entity})
                            notify('Song added to queue correctly')
                        }}
                    />
                </HtmlTooltip>

                {
                    !isFav &&
                    <HtmlTooltip title="Add Favorite" placement="left">
                        <div className={styles["FavoriteIcon"]} onClick={() => handleAddToFavourites(id)}>
                            <FavoriteBorderOutlinedIcon
                                fontSize="inherit"
                                onClick={() => handleAddToFavourites(id)}
                            />
                        </div>
                    </HtmlTooltip>
                }
                {
                    isFav &&
                    <HtmlTooltip title="Remove Favorite" placement="left">
                        <div className={styles["FavoriteIcon"]} onClick={() => handleRemoveFromFavourite(id)}>
                            <FavoriteIcon
                                fontSize="inherit"
                                onClick={() => handleRemoveFromFavourite(id)}
                            />
                        </div>
                    </HtmlTooltip>
                }
            </div>

        </div>
    );
};

