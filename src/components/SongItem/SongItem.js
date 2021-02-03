import React, { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext/playerContext";
import { withStyles } from "@material-ui/styles";
import { playerActions } from "../../reducers/playerReducer";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditIcon from "@material-ui/icons/Edit";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import Tooltip from '@material-ui/core/Tooltip';
import styles from './SongItem.module.css';

export const SongItem = ({ song, handleDeleteSong, handleOpenModalEditSong }) => {

    const { dispatchPlayer } = useContext(PlayerContext);
    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            border: '1px solid #dadde9',
        },
    }))(Tooltip);

    const options = { month: "2-digit", day: "2-digit", year: "numeric" };

    return (
        <>
            <div className={styles["SongItem-card"]}>
                <div style={{ backgroundImage: `url(${song.image})` }} className={styles["SongItem-img"]}>
                    <div className={styles["SongItem-icon-wrapper"]}>
                        <PlayCircleFilledIcon
                            fontSize="small"
                            onClick={() => dispatchPlayer({ type: playerActions.PLAY_SONG, song: song })}
                        />
                    </div>
                </div>
                <div className={styles["SongItem-text"]}>
                    <p className={styles["SongItem-title"]} onClick={() => dispatchPlayer({ type: playerActions.PLAY_SONG, song: song })}>{song.title}</p>
                    <p>{song.artist}</p>
                    <p>{song.album}</p>
                    <p>{song.category}</p>
                    <p>{new Date(song.createdAt).toLocaleString("es-ES", options)}</p>

                    <div className={styles["SongItem-icons"]}>
                        <HtmlTooltip title="Edit Song" placement="top">
                            <EditIcon
                                fontSize="small"
                                style={{ color: "white" }}
                                onClick={() => handleOpenModalEditSong(song)}
                            />
                        </HtmlTooltip>

                        <HtmlTooltip title="Delete Song" placement="top">
                            <DeleteOutlineOutlinedIcon
                                fontSize="small"
                                style={{ color: "white" }}
                                onClick={() => handleDeleteSong(song)}
                            />
                        </HtmlTooltip>

                    </div>
                </div>
            </div >
            <hr className={styles["SongItem-hr"]} />
        </>
    );
};
