import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { MyButton } from "../../components/MyButton/MyButton";
import { deleteToken } from "../../utils/LocalStorage.utils"
import { useHistory } from "react-router-dom";
import { HOME } from "../../routes/routes"
import { UserContext } from "../../contexts/UserContext/contextProvider"
import { SongList } from "../../components/SongList/SongList";
import { SongsContext } from "../../contexts/SongsContext/songsContext";


export const Profile = () => {
  const { user } = useContext(UserContext);
  const { songs } = useContext(SongsContext);

  const history = useHistory()

  const signOut = () => {
    deleteToken();
    history.push(HOME)
  }

  const handleAddToPlaylist = () => {

  }

  const handleDeleteSong = () => {

  }

  const handleEditSong = () => {

  }


  return (
    <>
        <div className="Profile-header">
          <h3>My account</h3>
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

        <div className="Profile-mySongs-section">
          <h3>My songs</h3>
            <SongList 
              songs={songs} 
              handleAddToPlaylist={handleAddToPlaylist} 
              handleDeleteSong={handleDeleteSong} 
              handleEditSong={handleEditSong}
            />
        </div>
    </>

  );
};
