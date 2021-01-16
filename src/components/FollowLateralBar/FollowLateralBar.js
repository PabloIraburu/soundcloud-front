import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext/contextProvider';
import { ServerRequest } from '../../helpers/ServerRequest';
import { UserCardFollowMenu } from '../UserCardFollowMenu/UserCardFollowMenu';
import styles from './FollowLateralBar.module.css';

export const FollowLateralBar = () => {

const { allUsers } = useContext(UserContext);

const handleFollow = () => {}

  return (
    <nav className={styles["FollowLateralBar-nav"]}>
      <h1>Your SoundFriends</h1>
        <p className={styles["FollowLateralBar-nav-p"]}>You don't follow any profile yet... Let us recommend some people you may know 🤩</p>
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
