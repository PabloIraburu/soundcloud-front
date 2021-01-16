import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext/contextProvider';
import { ServerRequest } from '../../helpers/ServerRequest';
import { UserCardFollowMenu } from '../UserCardFollowMenu/UserCardFollowMenu';
import styles from './FollowLateralBar.module.css';

export const FollowLateralBar = () => {

const { user } = useContext(UserContext);
const userId = user._id;
const [allUsers, setAllUsers] = useState({});

useEffect(() => {
  ServerRequest(`data/user`, "GET")
  .then((response) => {
    setAllUsers(response.filter((user) => {
      if (user._id !== userId) {
        return true
      }
    }));
  })
  .catch(console.log);
  
}, []);

const handleFollow = () => {}

  return (
    <nav className={styles["FollowLateralBar-nav"]}>
      <h1>Your SoundFriends</h1>
        <p>You don't follow any profile yet... Let us recommend some people you may know 🤩</p>
      <h3>Find new SoundFrieds</h3>
        <p>Loading...</p>
      {/* {
        (allUsers === {}) ? <p>loading...</p> : 
        <div className={styles["FollowLateralBar-userItems"]}>
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
      } */}
    </nav>
  )
}
