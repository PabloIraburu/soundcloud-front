import React, { useContext, useEffect, useState } from 'react';
import { ServerRequest } from '../../helpers/ServerRequest';
import { DecodeToken } from '../../utils/DecodeToken';
import { getToken } from '../../utils/LocalStorage.utils';
import { UserContext } from '../../contexts/UserContext/contextProvider';
import { UserCardFollowMenu } from '../UserCardFollowMenu/UserCardFollowMenu';
import styles from './FollowLateralBar.module.css';

export const FollowLateralBar = () => {

  const { user, allUsers } = useContext(UserContext);
  const userId = DecodeToken(getToken()).id;

  const [following, setFollowing] = useState([]);
  const [nonFollowing, setNonFollowing] = useState([]);

  //Lista de usuarios seguidos
  useEffect(() => {
    if (allUsers) {
      ServerRequest(`data/follower/?follower=${userId}`, "GET") //Devuelve array de los usuarios que sigo
        .then(response => {
          setFollowing(response.map(f => allUsers.find(u => u._id === f.followed)));
        })
        .catch(console.log);
    }
  }, [allUsers])

  //Todos los usuarios que no sigue el usuario logueado, menos el logueado
  useEffect(() => {
    ServerRequest(`data/user`, "GET")
      .then((response) => {
        setNonFollowing(response);
        console.log(response)
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
  }

  const handleUnfollow = async (userId) => {
    const unfollowId = await ServerRequest(`data/follower/?follower=${user._id}&&followed=${userId}`, "GET")

    ServerRequest(`data/follower/${unfollowId._id}`, "DELETE")

  }


  return (
    <nav className={styles["FollowLateralBar-nav"]}>
      <h1>Your SoundFriends</h1>
      {/* {
        (following.length === 0)
          ? <p className={styles["FollowLateralBar-nav-p"]}>You don't follow any profile yet... Let us suggest some people you may know 🤩</p>
          : <div className={styles["FollowLateralBar-userItems"]}>
            {following.map((user) => (
              <UserCardFollowMenu
                key={user._id}
                userId={user._id}
                name={user.name}
                img={user.image}
                // followers={}
                handleFollow={handleFollow}
              // userFollowed={user}
              />
            ))}
          </div>
      } */}

      <h3>Find new SoundFriends</h3>
      {/* {
        (nonFollowing.length === 0)
          ? <p>loading...</p>
          : <div className={styles["FollowLateralBar-userItems"]}>
            {nonFollowing.map((user) => (
              <UserCardFollowMenu
                key={user._id}
                userId={user._id}
                name={user.name}
                img={user.image}
              // handleUnfollow={handleUnfollow}
              handleFollow={handleFollow}
              />
            ))}
          </div>
      } */}
    </nav>
  )
}
