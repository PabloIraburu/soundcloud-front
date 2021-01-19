import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext/contextProvider';
import { ServerRequest } from '../../helpers/ServerRequest';
import { UserCardFollowMenu } from '../UserCardFollowMenu/UserCardFollowMenu';
import styles from './FollowLateralBar.module.css';

export const FollowLateralBar = () => {

  const { user, setUser, allUsers, setAllUseres } = useContext(UserContext);
  const userId = user._id;

  const [followedUsers, setFollowedUsers] = useState([]);
  const [nonFollowedUsers, setNonFollowedUsers] = useState([]);
  const [unfollowId, setUnfollowId] = useState();
  // const [editedUserLogged, setEditedUserLogged] = useState(user);
  // const [editedUserFollowed, setEditedUserFollowed] = useState();

  //Todos los usuarios que no sigue el usuario logueado, menos el logueado
  useEffect(() => {
    ServerRequest(`data/user`, "GET")
      .then((response) => {
        console.log("response", response);
        setNonFollowedUsers(response.filter((user) => {
          if (user._id !== userId) {
            return true
          }
        }));
        console.log("nonFollowedUsers", nonFollowedUsers);
      })
      .catch(console.log);
  }, [followedUsers]);

  const handleFollow = (userId) => {
    const userFollowedId = userId;
    const newFollow = {
      followed: userFollowedId,
      follower: user._id
    }

    ServerRequest(`data/follower`, "POST", newFollow)
      .then((response) => {
        setNonFollowedUsers(response);
        setFollowedUsers((prevValues) => ({
          ...prevValues,
          response
        }));
        console.log(response);

      })
      .catch(console.log);
  }

  const handleUnfollow = (userId) => {
    ServerRequest(`data/follower/?follower=${user._id}&&followed=${userId}`, "GET")
      .then((response) => setUnfollowId(response))
      .catch(console.log);
    ServerRequest(`data/follower/${unfollowId._id}`, "DELETE")
  }

  useEffect(() => {
    ServerRequest(`data/follower/?follower=${user._id}`, "GET")
      .then((response) => setUnfollowId(response))
      .catch(console.log);

    console.log(unfollowId);

  }, [])

  return (
    <nav className={styles["FollowLateralBar-nav"]}>
      <h1>Your SoundFriends</h1>
      {/* {
        (followedUsers.length === 0)
          ? <p className={styles["FollowLateralBar-nav-p"]}>You don't follow any profile yet... Let us suggest some people you may know 🤩</p>
          : <div className={styles["FollowLateralBar-userItems"]}>
            {followedUsers.map((user) => (
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
        }
          
      */}


      <h3>Find new SoundFrieds</h3>
      {
        (nonFollowedUsers.lenght === 0)
          ? <p>loading...</p>
          : <div className={styles["FollowLateralBar-userItems"]}>
            {nonFollowedUsers.map((user) => (
              <UserCardFollowMenu
                key={user._id}
                userId={user._id}
                name={user.name}
                img={user.image}
                handleUnfollow={handleUnfollow}
                handleFollow={handleFollow}
              />
            ))}
          </div>
      }
    </nav>
  )
}


  // //userId = id usuario a seguir (followed)
  // const handleFollow = (userId) => {

  //   console.log("Id usuario loguead", user._id);
  //   console.log("Id soundFriend", userId);

  //   // if (user.following.find((id) => userId !== id)) {  
  //   //Añadir el id del usuario seguido al array de seguidos del usuario logueado
  //   setEditedUserLogged((prevValue) => ({
  //     following: [...prevValue.following, userId]
  //   }));

  //   //Following
  //   ServerRequest(`data/user/${user._id}`, 'PUT', editedUserLogged)
  //     .then(console.log)
  //     .catch(console.log);
  //   console.log("User Logged", editedUserLogged);

  //   /* -------------------------------- */

  //   //Añadir el id del usuario logeado al array followers del usuario seguido
  //   setEditedUserFollowed(allUsers.find((user) => user._id === userId));
  //   setEditedUserFollowed((prevValue) => ({
  //     // ...prevValue,
  //     followers: [...prevValue.followers, user._id]
  //   }));
  //   console.log("User Followed", editedUserFollowed);

  //   //Followed
  //   ServerRequest(`data/user/${userId}`, 'PUT', editedUserFollowed)
  //     .then(console.log)
  //     .catch(console.log);
  //   console.log("User Followed", editedUserFollowed);
  //   // }
  // }