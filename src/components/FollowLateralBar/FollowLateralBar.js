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
          //response.followed = id usuario seguido
          // debugger;
          setFollowing(response.map(f => allUsers.find(u => u._id === f.followed)));
          console.log("Ids usuarios que sigo", following);
        })
        .catch(console.log);
    }
  }, [allUsers])

  //Todos los usuarios que no sigue el usuario logueado, menos el logueado
  useEffect(() => {
    ServerRequest(`data/user`, "GET")
      .then((response) => {
        setNonFollowing(response);
        console.log("nonFollowing", nonFollowing);
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
        setNonFollowing(response);
        setNonFollowing([
          ...nonFollowing,
          response
        ]);
      })
      .catch(console.log);
  }

  const handleUnfollow = async (userId) => {
    const unfollowId = await ServerRequest(`data/follower/?follower=${user._id}&&followed=${userId}`, "GET")
    // .then(response => console.log("response 50", response))
    // .then((response) => setUnfollowId(response) )
    // .then(console.log)
    // .catch(console.log);
    ServerRequest(`data/follower/${unfollowId._id}`, "DELETE")
    // ServerRequest(`data/follower/?follower=${user._id}&&followed=${userId}`, "GET")
    //   // .then((response) => setNonFollowedUsers(response))
    //   .then(console.log)
    //   .catch(console.log);

    console.log(unfollowId);
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

      <h3>Find new SoundFrieds</h3>
      {
        (nonFollowing.lenght === 0)
          ? <p>loading...</p>
          : <div className={styles["FollowLateralBar-userItems"]}>
            {allUsers.map((user) => (
              <UserCardFollowMenu
                key={user._id}
                userId={user._id}
                name={user.name}
                img={user.image}
              // handleUnfollow={handleUnfollow}
              // handleFollow={handleFollow}
              />
            ))}
          </div>
      }
    </nav>
  )
}
