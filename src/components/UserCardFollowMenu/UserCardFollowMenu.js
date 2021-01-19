import React, {useState} from "react";
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import PersonAddDisabledRoundedIcon from '@material-ui/icons/PersonAddDisabledRounded';
import styles from './UserCardFollowMenu.module.css';


export const UserCardFollowMenu = ({ userId, img, name, followers, handleFollow, handleUnfollow}) => {
const [followButton, setFollowButton]= useState(true)
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
        {/* <i className="far fa-heart" onClick={() => handleFollow(userId)}></i> */}
          {followButton && <PersonAddRoundedIcon
              fontSize="small"
              style={{color: "white"}}
              onClick={() => {
                  handleFollow(userId)
                  setFollowButton(false)
              }}
          />}
          {!followButton && <PersonAddDisabledRoundedIcon
              fontSize="small"
              style={{color: "white"}}
              onClick={() => {
                      handleUnfollow(userId)
                      setFollowButton(false)
                  }
              }
          />}
      </div>

    </div >
  );
};