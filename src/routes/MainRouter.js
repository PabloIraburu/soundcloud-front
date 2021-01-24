import React from "react";
import * as route from "../routes/routes";
import { Switch, Route, Redirect } from "react-router-dom";

import LateralBar from "../components/LateralBar/LateralBar";
import Discover from "../pages/Discover/Discover";
import { Profile } from "../pages/Profile/Profile";
import { EditProfile } from "../pages/EditProfile/EditProfile";
import { Albums } from "../pages/Albums/Albums";
import { Playlists } from "../pages/Playlists/Playlists";
import { Favourites } from "../pages/Favourites/Favourites";
import { getToken } from "../utils/LocalStorage.utils";
import { FollowLateralBar } from "../components/FollowLateralBar/FollowLateralBar";
import { EntityDetail } from "../pages/EntityDetail/EntityDetail";
import { PlayerContextProvider } from "../contexts/PlayerContext/playerContext";
import { UserContextProvider } from "../contexts/UserContext/contextProvider";
import { SongsContextProvider } from "../contexts/SongsContext/songsContext";
import '../App.css';
import { Player } from "../components/Player/Player";
import { MySongs } from "../pages/MySongs/MySongs";


export const MainRouter = () => {

  const PrivateRoute = ({ component: Component, path }) => (
    <Route
      path={path}
      render={() => getToken() ? <Component /> : <Redirect to={route.HOME} />}
    />
  )

  return (
    <>
      <UserContextProvider>
        <PlayerContextProvider>
          <SongsContextProvider>

            <Player />
            <LateralBar />
            <FollowLateralBar />
            <div className="MainRouter-wrap">
              <Switch>
                <PrivateRoute exact path={route.DISCOVER} component={Discover} />
                <PrivateRoute exact path={route.MYSONGS} component={MySongs} />
                <PrivateRoute exact path={route.ALBUMS} component={Albums} />
                <PrivateRoute exact path={route.PLAYLISTS} component={Playlists} />
                <PrivateRoute exact path={route.FAVOURITES} component={Favourites} />
                <PrivateRoute exact path={route.PROFILE} component={Profile} />
                <PrivateRoute exact path={route.EDITPROFILE} component={EditProfile} />
                <PrivateRoute exact path={route.ALBUMDETAIL} component={EntityDetail} />
                <PrivateRoute exact path={route.PLAYLISTDETAIL} component={EntityDetail} />
                {/* <Redirect to="/discover" /> */}
              </Switch>
            </div>

          </SongsContextProvider>
        </PlayerContextProvider>
      </UserContextProvider>
    </>
  );
};
