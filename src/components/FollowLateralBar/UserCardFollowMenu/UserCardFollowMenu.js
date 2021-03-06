import React  from "react";
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import PersonAddDisabledRoundedIcon from '@material-ui/icons/PersonAddDisabledRounded';
import styles from './UserCardFollowMenu.module.css';

export const UserCardFollowMenu = ({ userId, img, name, handleFollow, handleUnfollow, followButton }) => {


  return (
    <div className={styles["UserCardFollowMenu-wrap"]}>
      <div style={{ backgroundImage: `url(${img})` }} className={styles["UserCardFollowMenu-img"]}></div>
      <div className={styles["UserCardFollowMenu-info"]}>
        <div className={styles["UserCardFollowMenu-userName"]}>
          <p>{name}</p>
        </div>
      </div>
      <div className={styles["UserCardFollowMenu-followIcon"]}>


        {!followButton && <PersonAddDisabledRoundedIcon
          fontSize="small"
          style={{ color: "white" }}
          onClick={() => {
            handleUnfollow(userId)
          }}
        />}


        {followButton && <PersonAddRoundedIcon
          fontSize="small"
          style={{ color: "white" }}
          onClick={() => {
            handleFollow(userId)
          }}
        />}
      </div>

    </div >
  );
};