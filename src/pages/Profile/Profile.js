import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { MyButton } from "../../components/MyButton/MyButton";
import { UserContext } from "../../contexts/UserContext/contextProvider"
import { MySongs } from "../MySongs/MySongs";


export const Profile = () => {
  const { user, signOut } = useContext(UserContext);

  return (
    <>
        <div className="Profile-header">
          <h1>My account</h1>
        </div>

        <div className="Profile-content">
          <span>
            <p>Name</p>
            <p>{user.name}</p>
          </span>
          <hr className="hr" />
          <span >
            <p>E-mail</p>
            <p>{user.email}</p>
          </span>
          <hr className="hr" />
          <span>
            <p>Account</p>
            <p>Free</p>
          </span>
        </div>

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

          <MySongs />

    </>

);
};

