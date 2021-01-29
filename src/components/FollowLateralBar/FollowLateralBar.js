import React, { useContext, useEffect, useState } from 'react';
import { ServerRequest } from '../../helpers/ServerRequest';
import { DecodeToken } from '../../utils/DecodeToken';
import { getToken } from '../../utils/LocalStorage.utils';
import { UserContext } from '../../contexts/UserContext/contextProvider';
import { UserCardFollowMenu } from './UserCardFollowMenu/UserCardFollowMenu';
import styles from './FollowLateralBar.module.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PlayerContext } from "../../contexts/PlayerContext/playerContext";
import { playerActions } from "../../reducers/playerReducer";
import { CoverSm } from "../CoverSm/CoverSm";
import { NowPlayingItem } from "./NowPlayingItem/NowPlayingItem";

export const FollowLateralBar = () => {

    const { user } = useContext(UserContext);
    const { player, dispatchPlayer } = useContext(PlayerContext)
    const loggedUserId = DecodeToken(getToken()).id;
    const [following, setFollowing] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [nonFollowing, setNonFollowing] = useState([]);
    const followButton = false;
    const [reload, setReload] = useState(false);

    //Todos los usuarios que no sigue el usuario logueado, menos el logueado
    useEffect(() => {
        ServerRequest(`data/user`, "GET")
            .then((response) => {
                const res = (response.filter(r => r._id !== loggedUserId));
                setAllUsers(res)
                ServerRequest(`data/follower/?follower=${loggedUserId}`, "GET") //Devuelve array de los usuarios que sigo
                    .then(response => {
                        let followedPeeps = response.map(u => u.followed)
                        setFollowing(response.map(f => res.find(u => u._id === f.followed)));
                        setNonFollowing(res.filter(u => !followedPeeps.includes(u._id)))
                    })
                    .catch(console.log);
            })
            .catch(console.log);
    }, [reload]);

    const handleFollow = (userId) => {
        const userFollowedId = userId;
        const newFollow = {
            //Perfil seguido
            followed: userFollowedId,
            //Perfil seguidor, usuario logueado
            follower: user._id
        }
        ServerRequest(`data/follower`, "POST", newFollow)
            .then(() => {
                setReload(!reload)
            })
    }

    const handleUnfollow = (userId) => {
        console.log(userId)
        console.log(loggedUserId)
        ServerRequest(`data/follower/?followed=${userId}&follower=${loggedUserId}`, "GET")
            .then((response) => {
                setReload(!reload)
                console.log(response)
                ServerRequest(`data/follower/${response[0]._id}`, "DELETE")
                    .then(() => setReload(!reload)
                    )
            })
    }

    return (
        <nav className={styles["FollowLateralBar-nav"]}>
            <div className={styles["Follows"]}>
                <h1>Your SoundFriends</h1>
                {
                    (following.length === 0)
                        ? <p className={styles["FollowLateralBar-nav-p"]}>You don't follow any profile yet... Let us suggest
                        some people you may know 🤩</p>
                        : <div className={styles["FollowLateralBar-userItems"]}>
                            {following.map((user) => (
                                <UserCardFollowMenu
                                    key={user._id}
                                    userId={user._id}
                                    name={user.name}
                                    img={user.image}
                                    // followers={}
                                    handleUnfollow={handleUnfollow}
                                    // userFollowed={user}
                                    followButton={followButton}
                                />
                            ))}
                        </div>
                }

                <h3>Find new SoundFriends</h3>
                {
                    (nonFollowing.length === 0)
                        ? <div className={styles["FollowLateralBar-userItems"]}>
                            {allUsers.map((user) => (
                                <UserCardFollowMenu
                                    key={user._id}
                                    userId={user._id}
                                    name={user.name}
                                    img={user.image}
                                    followButton={!followButton}
                                    handleFollow={handleFollow}
                                />
                            ))}
                        </div>
                        : <div className={styles["FollowLateralBar-userItems"]}>
                            {nonFollowing.map((user) => (
                                <>
                                    <UserCardFollowMenu
                                        key={user._id}
                                        userId={user._id}
                                        name={user.name}
                                        img={user.image}
                                        followButton={!followButton}
                                        handleFollow={handleFollow}
                                    />
                                </>
                            ))}
                            <ToastContainer
                                position="top-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                            />
                        </div>
                }
            </div>
            <div className={styles["NowPlaying"]}>
                <h3>Currently playing</h3>
                <div className={styles["Playlist"]}>
                    {player.reproduceSongList.map(s =>
                        <NowPlayingItem
                            key={s._id}
                            entity={s}
                            id={s._id}
                            title={s.title}
                            author={s.artist}
                            categories={s.category}
                            img={s.image}
                        />
                    )}
                </div>
            </div>
        </nav>
    )
}
