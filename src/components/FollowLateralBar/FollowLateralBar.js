import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext/contextProvider';
import { UserCardFollowMenu } from '../UserCardFollowMenu/UserCardFollowMenu';
import styles from './FollowLateralBar.module.css';

export const FollowLateralBar = () => {

const { allUsers, user } = useContext(UserContext);

const handleFollow = () => {}

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
