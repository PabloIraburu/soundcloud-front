import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext/contextProvider";
import { PlayerContext } from "../../contexts/PlayerContext/playerContext";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import styles from './SongItemList.module.css';
import { withStyles } from "@material-ui/styles";
import Tooltip from '@material-ui/core/Tooltip';
import { ServerRequest } from "../../helpers/ServerRequest";
import { playerActions } from "../../reducers/playerReducer";
import FavoriteIcon from '@material-ui/icons/Favorite';



export const SongItemList = ({ song, handleRemoveSongFromPlaylist, handleAddToFavourites, handleRemoveFromFavourites }) => {

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

    console.log(song)

    // GET FAVOURITE SONGS
    useEffect(() => {
        ServerRequest(`data/favouritesongs/?id_user=${userId}`, "GET")
            .then(response => (
                response.find((fsong) => {
                    if (fsong.id_song === song._id) {
                        setIsFav(!isFav);
                    }
                })))
            .catch(console.log)
    }, [song._id]);

    return (
        <div className={styles["SongItemList-card"]}>
            <div style={{ backgroundImage: `url(${song.image})` }} className={styles["SongItemList-img"]}>
                <div className={styles["SongItemList-icon-wrapper"]}>
                    <HtmlTooltip title="Play Song" placement="rigth">
                        <PlayCircleFilledIcon
                            fontSize="small"
                            // style={{ color: "white" }}
                            onClick={() => dispatchPlayer({ type: playerActions.PLAY_THIS_SONG, song: song })}
                        />
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
                        <LibraryMusicIcon
                            fontSize="inherit"
                            style={{ color: "white" }}
                            onClick={() => handleRemoveSongFromPlaylist(song._id)}
                        />
                    </HtmlTooltip>

                    {
                        !isFav &&
                        <HtmlTooltip title="Add Favorite" placement="top">
                            <FavoriteBorderOutlinedIcon
                                fontSize="inherit"
                                style={{ color: '#f9b807' }}
                                onClick={() => handleAddToFavourites(song._id)}
                            />
                        </HtmlTooltip>
                    }
                    {
                        isFav &&
                        <HtmlTooltip title="Remove Favorite" placement="top">
                            <FavoriteIcon
                                fontSize="inherit"
                                style={{ color: '#f9b807' }}
                                onClick={() => handleRemoveFromFavourites(song._id)}
                            />
                        </HtmlTooltip>
                    }
                </div>
            </div>
        </div >
    );
};
