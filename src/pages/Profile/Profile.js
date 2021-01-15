import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { MyButton } from "../../components/MyButton/MyButton";
import { deleteToken } from "../../utils/LocalStorage.utils"
import { useHistory } from "react-router-dom";
import { HOME } from "../../routes/routes"
import { UserContext } from "../../contexts/UserContext/contextProvider"


export const Profile = () => {
  const { user } = useContext(UserContext);
  const history = useHistory()

  const signOut = () => {
    deleteToken();
    history.push(HOME)
  }

  return (
    <div className="Profile-wrap">

      <div className="Profile-content">
        <div className="EditProfile-header">
          <h3>My account</h3>
        </div>
        <span className="">
          <p>Name</p>
          <p>{user.name}</p>
        </span>
        <hr className="hr" />
        <span className="">
          <p>E-mail</p>
          <p>{user.email}</p>
        </span>
        <hr className="hr" />
        <span className="">
          <p>Account</p>
          <p>Free</p>
        </span>

        <div className="Profile-buttons-section">
          <Link
            to={{
              pathname: "/editprofile",
              state: { user },
            }}
          >
            <MyButton  variant="pink-or" size="200px">
              Edit Profile
          </MyButton>
          </Link>

          <MyButton onClick={signOut} variant="pink-or" size="200px">
            Sign Out
          </MyButton>

        </div>
      </div>

    </div>
  );
};
