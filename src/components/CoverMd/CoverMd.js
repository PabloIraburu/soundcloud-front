import React from "react";
import styles from "./CoverMd.module.css";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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

    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            border: '1px solid #dadde9',
        },
    }))(Tooltip);

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

                    <div className={styles["PlayButton"]} onClick={() => handlePlay(id)}>
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
                            <div className={styles["FavoriteIcon"]} onClick={() => handleAddToFavourites(id)}>
                                <FavoriteBorderOutlinedIcon
                                    fontSize="small"
                                    onClick={() => handleAddToFavourites(id)}
                                />
                            </div>
                        </HtmlTooltip>

                    }
                    {isFav &&
                        <HtmlTooltip title="Remove Favourite" placement="right">
                            <div className={styles["FavoriteIcon"]} onClick={() => handleRemoveFromFavourites(id)}>
                                <FavoriteIcon
                                    fontSize="small"
                                    onClick={() => handleRemoveFromFavourites(id)}
                                />
                            </div>
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
