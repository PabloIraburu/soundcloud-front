import React, { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext/playerContext";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import styles from './SongItemList.module.css';
import { withStyles } from "@material-ui/styles";
import Tooltip from '@material-ui/core/Tooltip';
import { playerActions } from "../../reducers/playerReducer";
import FavoriteIcon from '@material-ui/icons/Favorite';


export const SongItemList = ({
    song,
    isFav,
    index,
    handleRemoveSongFromPlaylist,
    handleAddToFavourites,
    handleRemoveFromFavourites
}) => {

    const { dispatchPlayer } = useContext(PlayerContext);
    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            border: '1px solid #dadde9',
        },
    }))(Tooltip);

    return (
        <>
            <div className={styles["SongItemList-card"]}>
                <div style={{ backgroundImage: `url(${song.image})` }} className={styles["SongItemList-img"]}>
                    <div className={styles["SongItemList-icon-wrapper"]}>
                        <HtmlTooltip title="Play Song" placement="rigth">
                            <div className={styles["PlayButton"]} onClick={() => dispatchPlayer({ type: playerActions.PLAY_THIS_SONG, index: index })}>
                                <PlayCircleFilledIcon
                                    fontSize="small"
                                    onClick={() => dispatchPlayer({ type: playerActions.PLAY_THIS_SONG, index: index })}
                                />
                            </div>
                        </HtmlTooltip>

                    </div>
                </div>
                <div className={styles["SongItemList-text"]}>
                    <p className={styles["SongItemList-title"]}>{song.title}</p>
                    <p>{song.artist}</p>
                    <p>{song.album}</p>
                    <p>{song.category}</p>
                    <div className={styles["SongItemList-icons"]}>

                        <HtmlTooltip title="Delete From Playlist" placement="top">
                            <div className={styles["FavoriteIcon"]} onClick={() => handleRemoveSongFromPlaylist(song._id)}>
                                <LibraryMusicIcon
                                    fontSize="inherit"
                                    style={{ color: "white" }}
                                    onClick={() => handleRemoveSongFromPlaylist(song._id)}
                                />
                            </div>
                        </HtmlTooltip>

                        {
                            !isFav &&
                            <HtmlTooltip title="Add Favorite" placement="top">
                                <div className={styles["FavoriteIcon"]} onClick={() => handleAddToFavourites(song._id)}>
                                    <FavoriteBorderOutlinedIcon
                                        fontSize="inherit"
                                        onClick={() => handleAddToFavourites(song._id)}
                                    />
                                </div>
                            </HtmlTooltip>
                        }
                        {
                            isFav &&
                            <HtmlTooltip title="Remove Favorite" placement="top">
                                <div className={styles["FavoriteIcon"]} onClick={() => handleRemoveFromFavourites(song._id)}>
                                    <FavoriteIcon
                                        fontSize="inherit"
                                        onClick={() => handleRemoveFromFavourites(song._id)}
                                    />
                                </div>
                            </HtmlTooltip>
                        }
                    </div>
                </div>
            </div>
            <hr className={styles["SongItemList-hr"]} />
        </>
    );
};
