import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext/contextProvider';
import { ServerRequest } from '../../helpers/ServerRequest';
import { UserCardFollowMenu } from '../UserCardFollowMenu/UserCardFollowMenu';
import styles from './FollowLateralBar.module.css';

export const FollowLateralBar = () => {

const { allUsers, user } = useContext(UserContext);
const [editedUserLogged, setEditedUserLogged] = useState(user);
const [editedUserFollowed, setEditedUserFollowed] = useState();


//userId = id usuario a seguir (followed)
const handleFollow = (userId) => {

  console.log("Id usuario loguead", user._id);
  console.log("Id soundFriend", userId);

  // if (user.following.find((id) => userId !== id)) {  
    //Añadir el id del usuario seguido al array de seguidos del usuario logueado
    setEditedUserLogged((prevValue) => ({
      following: [...prevValue.following, userId]
    }));
    
    //Following
    ServerRequest(`data/user/${user._id}`, 'PUT', editedUserLogged)
    .then(console.log)
    .catch(console.log);
    console.log("User Logged", editedUserLogged);

    /* -------------------------------- */ 

    //Añadir el id del usuario logeado al array followers del usuario seguido
    setEditedUserFollowed(allUsers.find((user) => user._id === userId));
    setEditedUserFollowed((prevValue) => ({
      // ...prevValue,
      followers: [...prevValue.followers, user._id]
    }));
    console.log("User Followed", editedUserFollowed);
    
    //Followed
    ServerRequest(`data/user/${userId}`, 'PUT', editedUserFollowed)
    .then(console.log)
    .catch(console.log);
    console.log("User Followed", editedUserFollowed);
  // }
}

  return (
    <nav className={styles["FollowLateralBar-nav"]}>
      <h1>Your SoundFriends</h1>
        { 
          (user.length !== 0) 
            ? <p className={styles["FollowLateralBar-nav-p"]}>You don't follow any profile yet... Let us suggest some people you may know 🤩</p>
            : <div className={styles["FollowLateralBar-userItems"]}>
                {user.following.map((user) => (
                  <UserCardFollowMenu 
                    key={user._id}
                    userId={user._id}
                    name={user.name}
                    img={user.image}
                    followers={user.followers.length}
                    handleFollow={handleFollow}
                  />
                ))}
              </div>
          
        }

      <h3>Find new SoundFrieds</h3>
      {
        (allUsers.lenght === 0) 
        ? <p>loading...</p> 
        : <div className={styles["FollowLateralBar-userItems"]}>
          {allUsers.map((user) => (
            <UserCardFollowMenu 
              key={user._id}
              userId={user._id}
              name={user.name}
              img={user.image}
              followers={user.followers.length}
              handleFollow={handleFollow}
            />
          ))}
        </div>
      }
    </nav>
  )
}
