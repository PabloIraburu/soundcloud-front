import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { MyButton } from "../../components/MyButton/MyButton";
import { deleteToken } from "../../utils/LocalStorage.utils"
import { useHistory } from "react-router-dom";
import { HOME } from "../../routes/routes"
import { UserContext } from "../../contexts/UserContext/contextProvider"
import { SongList } from "../../components/SongList/SongList";
import { ServerRequest } from "../../helpers/ServerRequest";
// import { SongsContext } from "../../contexts/SongsContext/songsContext";


export const Profile = () => {
  const { user } = useContext(UserContext);
  // const { songs } = useContext(SongsContext);
  const [userSongs, setUserSongs] = useState({})
  const history = useHistory()
  const userId = user._id;

  useEffect(() => {
      ServerRequest(`data/song/?id_author=${userId}`, "GET")
          .then((response) => {
              setUserSongs(response);
          })
          .catch(console.log);

  }, [userId]);

  console.log('userSongs', userSongs);
  console.log(userSongs._id);

  const signOut = () => {
    deleteToken();
    history.replace(HOME)
  }

  const handleAddToPlaylist = () => {

  }

  const handleDeleteSong = () => {
    ServerRequest(`data/song/${userSongs._id}`, "DELETE")
    .then((response) => {
        setUserSongs(response);
    })
    .catch(console.log);
  }

  const handleEditSong = () => {

  }


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

        <div className="Profile-mySongs-section">
          <h3>My songs</h3>
            {/* {userSongs && <SongList 
              songs={userSongs} 
              handleAddToPlaylist={handleAddToPlaylist} 
              handleDeleteSong={handleDeleteSong} 
              handleEditSong={handleEditSong}
            />} */}
        </div>
    </>

  );
};
