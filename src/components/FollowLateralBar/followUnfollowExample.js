
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { serverRequest } from "../../helpers/urlBack";
import {getToken, getUserId} from "../../util/LocalStorage.utils";
import { PodcastsUser } from "../../Components/PodcastsUser/PodcastsUser";
import { FavoritosUser } from "../../Components/FavoritosUser/FavoritosUser";
import "./OtherProfile.css";
import { Footer } from "../../Components/Footer/Footer";

export const OtherProfile = () => {
  const [user, setUser] = useState({});
  const [podcastAuthor, setPodcastAuthor] = useState(undefined);
  const [followsUsuario, setFollowsUsuario] = useState(undefined);
  const [isLoggedUserFollowing, setIsLoggedUserFollowing] = useState(undefined);
  const [iconFollowOnClick, setIconFollowOnClick] = useState("Seguir");
  const [followGoingToBeDeleted, setFollowGoingToBeDeleted] = useState(undefined);


  const token = getToken();
  const decodedToken = getToken();
  const loggedUserId = getUserId();
  var str = window.location.href
  var res = str.split("profile/");
  const userId = res[1];

  useEffect(() => {
    serverRequest(`data/user/${userId}`, "GET")
      .then((response) => {
        setUser(response);
      })
      .catch(console.log);
  }, []);
  /* console.log(isLoggedUserFollowing.id_followedUser) */
  // Para comprobar si ya sigue al usuario
  useEffect(() => {
    serverRequest(`data/follows/?id_followingUser=${loggedUserId}&&id_followedUser=${userId}`, "GET")
      .then((response) => {
        setIsLoggedUserFollowing(response[0]);
        console.log("isLoggedUserFollowing ");
        console.log(/* "isLoggedUserFollowing " + */isLoggedUserFollowing);
        console.log("isLoggedUserFollowing LGNTH" + isLoggedUserFollowing.length);
      })
      .catch(console.log);
  }, [])

  useEffect(() => {
    if (isLoggedUserFollowing && isLoggedUserFollowing.hasOwnProperty("id_followedUser") === true) {
      console.log(isLoggedUserFollowing.id_followedUser)
      setIconFollowOnClick("No seguir");
      serverRequest(`data/follows/?id_followingUser=${loggedUserId}&&id_followedUser=${userId}`, "GET")
        .then((response) => {
          setFollowGoingToBeDeleted(response[0]);
        })
    }
  }, [isLoggedUserFollowing])
  //Para comprobar a quien sigue

  useEffect(() => {
    serverRequest(`data/follows/?id_followingUser=${loggedUserId}`, "GET")
      .then((response) => {
        setFollowsUsuario(response/* [0] */);
        console.log("Follows " + followsUsuario);
      })
      .catch(console.log);
  }, [])

  const [isMyPodcastsSelected, setIsMyPodcastsSelected] = useState(true)
  const [isFavoritosSelected, setIsFavoritosSelected] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)

  /* const [favSelected, setFavSelected] = useState("notSelected")
  const [myPodcastsSelected, setMyPodcastsSelected] = useState("selected") */
  const favoritos = () => {
    setSelectedTab(1)
    /* setFavSelected("selected")
    setMyPodcastsSelected("notSelected") */
  }
  const MisPodcasts = () => {
    setSelectedTab(0)
    /*  setIsMyPodcastsSelected(true)
        setIsFavoritosSelected(false) */
    /* setFavSelected("notSelected")
    setMyPodcastsSelected("selected") */
  }

  const follow = () => {
    if (iconFollowOnClick === "Seguir") {
      const newFollow = {
        id_followedUser: userId,
        id_followingUser: loggedUserId
      };
      console.log(newFollow)
      serverRequest("data/follows", "POST", newFollow)
        .then((response) => {
          console.log(followsUsuario + " FOLLOWS USER")
          console.log("CREADO")
          setIconFollowOnClick("No seguir");
          /* setFavoritosUsuario(response); */
        })
      serverRequest(`data/follows/?id_followingUser=${loggedUserId}&&id_followedUser=${userId}`, "GET")
        .then((response) => {
          setFollowGoingToBeDeleted(response[0]);
        })
    }
    else if (iconFollowOnClick === "No seguir") {
      console.log("yes")
      console.log(isLoggedUserFollowing)
      console.log(followGoingToBeDeleted._id)

      serverRequest(`data/follows/${followGoingToBeDeleted._id}`, "DELETE")
        .then(response => {
          console.log(response);
          setIconFollowOnClick("Seguir");
          setIsLoggedUserFollowing(undefined);
        });
    }
  }


  const options = { month: "2-digit", day: "2-digit", year: "numeric" };
  return (
    <div>
      <body>
        <div className="UserProfile-wrap">
          <br />

          <div className="UserCard-wrap">
            <div className={"UserInfo"}>
              <h2>Perfil</h2>
              <br></br>
              <div className="UserSectionLine"><p>Usuario </p><p className="userInformationDisplayed">{user.username}</p></div>
              <div className="UserSectionLine"><p>Nombre Completo </p> <p className="userInformationDisplayed">{user.nombre}</p></div>
              <div className="UserSectionLine"><p>Email </p><p className="userInformationDisplayed">{user.email}</p></div>
              <div className="UserSectionLine"><p>Fecha de nacimiento </p><p className="userInformationDisplayed">{new Date(user.fechaNacimiento).toLocaleString("es-ES", options)}</p></div>
              <button className="followButton" onClick={follow}>{iconFollowOnClick}</button>
              {/* <button className="followButton" onClick={pueseso}>follows</button> */}
            </div>
            <div className={"vr"} />
            <img className="profilePicture" alt="background" src="https://c0.anyrgb.com/images/434/137/recording-studio-person-woman-microphone-radio-podcast-talking-singing-presenter.jpg" />
            {/* <Link
              to={{
                pathname: "/editUserProfile",
                state: { user },
              }}
            >
              <button>Editar perfil</button>
            </Link> */}
            <br />
          </div>
          <hr />
          <br />
        </div>
        <div className="UserPodcasts">
          <div style={{ display: "flex", width: "50%", justifyContent: "space-between" }}>
            <h4 className={selectedTab === 0 ? "selected" : "notSelected"} onClick={MisPodcasts}>Podcasts subidos</h4>
            <h4 className={selectedTab === 1 ? "selected" : "notSelected"} onClick={favoritos}>Favoritos</h4>
          </div>
          <br />
          {selectedTab === 0 && <PodcastsUser />}
          {selectedTab === 1 && <FavoritosUser userId={userId} />}
          <br />
        </div>
      </body>
    </div>
  );
};