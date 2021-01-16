import React from "react";
import styles from './UserCardFollowMenu.module.css';


export const UserCardFollowMenu = ({ userId, img, name, followers, handleFollow }) => {

  return (
    <div className={styles["UserCardFollowMenu-wrap"]}>
      <div style={{ backgroundImage: `url(${img})` }} className={styles["UserCardFollowMenu-img"]}></div>
      <div className={styles["UserCardFollowMenu-info"]}>
        <div className={styles["UserCardFollowMenu-userName"]}>
          <p>{name}</p>
        </div>
        <div className={styles["UserCardFollowMenu-followers"]}>
        {followers === undefined ? <p>0 followers</p> : <p>{followers} followers</p>}
        </div>
      </div>
      <div className={styles["UserCardFollowMenu-followIcon"]}>
        <i className="far fa-heart" onClick={() => handleFollow(userId)}></i>
      </div>
      
    </div >
  );
};