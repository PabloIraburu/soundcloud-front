import React, {useContext, useEffect, useState} from 'react';
import {ServerRequest} from '../../helpers/ServerRequest';
import {DecodeToken} from '../../utils/DecodeToken';
import {getToken} from '../../utils/LocalStorage.utils';
import {UserContext} from '../../contexts/UserContext/contextProvider';
import {UserCardFollowMenu} from '../UserCardFollowMenu/UserCardFollowMenu';
import styles from './FollowLateralBar.module.css';

export const FollowLateralBar = () => {

    const {user} = useContext(UserContext);
    const userId = DecodeToken(getToken()).id;

    const [following, setFollowing] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [nonFollowing, setNonFollowing] = useState([]);
    const [followButton, setFollowButton] = useState(false);


    //Lista de usuarios seguidos
    // useEffect(() => {
    //     ServerRequest(`data/follower/?follower=${userId}`, "GET") //Devuelve array de los usuarios que sigo
    //       .then(response => {
    //           console.log(response)
    //           const colegas = response.map(a=>a.followed)
    //           let notImaginary = []
    //           console.log('Los compas', colegas)
    //           console.log(allUsers)
    //           for (let i= 0; i <= colegas.length; i++){
    //               notImaginary = allUsers.filter(a=> a._id === colegas[i])
    //               console.log(notImaginary)
    //               setFollowing(...following, notImaginary)
    //           }
    //           setFollowing(allUsers.map(f => colegas.find(u => u === f._id)));
    //       })
    //       .catch(console.log);
    //
    // }, [])

    //Todos los usuarios que no sigue el usuario logueado, menos el logueado
    useEffect(() => {
        ServerRequest(`data/user`, "GET")
            .then((response) => {
                const res = (response.filter(r => r._id !== user._id));
                setAllUsers(res)
                ServerRequest(`data/follower/?follower=${userId}`, "GET") //Devuelve array de los usuarios que sigo
                    .then(response => {
                        console.log(response)
                        console.log('AllUsers', res)
                        setFollowing(response.map(f => res.find(u => u._id === f.followed)));
                        response.map(f => console.log(f.followed))
                        console.log(response.map(f => res.filter(u => u._id !== f.followed)))
                        setNonFollowing(response.map(f => res.filter(u => u._id !== f.followed)))
                    })
                    .catch(console.log);
            })
            .catch(console.log);
    }, []);


    const handleFollow = (userId) => {
        const userFollowedId = userId;
        const newFollow = {
            //Perfil seguido
            followed: userFollowedId,
            //Perfil seguidor, usuario logueado
            follower: user._id
        }


        ServerRequest(`data/follower`, "POST", newFollow)
            .then((response) => {
                console.log(following)
                console.log(response.followed)
                const potentialFriendsLeft = nonFollowing.filter(nonFriend => nonFriend._id !== response.followed)
                const friendo = allUsers.filter(friend => friend._id === response.followed)
                setFollowing(...following, friendo)
                console.log(potentialFriendsLeft)
                setNonFollowing(potentialFriendsLeft);
                console.log(nonFollowing)
            })
            .catch(() => {
            });


        // ServerRequest(`data/follower`, "POST", newFollow)
        //   .then((response) => {
        //       console.log(following)
        //       console.log(response.followed)
        //       const potentialFriendsLeft = nonFollowing.filter(nonFriend => nonFriend._id !== response.followed)
        //       const friendo = allUsers.filter(friend => friend._id === response.followed)
        //       setFollowing(...following, friendo)
        //       console.log(potentialFriendsLeft)
        //     // setNonFollowing(potentialFriendsLeft);
        //       console.log(nonFollowing)
        //   })
        //   .catch(()=>{
        //   });
    }

    const handleUnfollow = async (userId) => {
        const unfollowId = await ServerRequest(`data/follower/?follower=${user._id}&&followed=${userId}`, "GET")

        ServerRequest(`data/follower/${unfollowId._id}`, "DELETE")

    }


    return (
        <nav className={styles["FollowLateralBar-nav"]}>
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
                    ? <p>loading...</p>
                    : <div className={styles["FollowLateralBar-userItems"]}>
                        {nonFollowing[0].map((user) => (
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
            }
        </nav>
    )
}
