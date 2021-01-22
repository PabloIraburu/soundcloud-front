import React from "react";
import * as route from "../routes/routes";
import { Switch, Route, Redirect } from "react-router-dom";

import LateralBar from "../components/LateralBar/LateralBar";
import Discover from "../pages/Discover/Discover";
import { Profile } from "../pages/Profile/Profile";
import { EditProfile } from "../pages/EditProfile/EditProfile";
import { Songs } from "../pages/Songs/Songs";
import { Albums } from "../pages/Albums/Albums";
import { Playlists } from "../pages/Playlists/Playlists";
import { Favourites } from "../pages/Favourites/Favourites";
import { Recommended } from "../pages/Recommended/Recommended";
import { getToken } from "../utils/LocalStorage.utils";
import { FollowLateralBar } from "../components/FollowLateralBar/FollowLateralBar";
import { AlbumDetail } from "../pages/AlbumDetail/AlbumDetail";
import { EntityDetail } from "../pages/EntityDetail/EntityDetail";
import '../App.css';


export const MainRouter = () => {

  const PrivateRoute = ({ component: Component, path }) => (
    <Route
      path={path}
      render={() => getToken() ? <Component /> : <Redirect to={route.HOME} />}
    />
  )


  return (
    <>
      <LateralBar />
      <FollowLateralBar />
      <div className="MainRouter-wrap">
        <Switch>
          <PrivateRoute exact path={route.DISCOVER} component={Discover} />
          <PrivateRoute exact path={route.ALBUMS} component={Albums} />
          <PrivateRoute exact path={route.PLAYLISTS} component={Playlists} />
          <PrivateRoute exact path={route.FAVOURITES} component={Favourites} />
          <PrivateRoute exact path={route.RECOMMENDED} component={Recommended} />
          <PrivateRoute exact path={route.SONGS} component={Songs} />
          <PrivateRoute exact path={route.PROFILE} component={Profile} />
          <PrivateRoute exact path={route.EDITPROFILE} component={EditProfile} />
          <PrivateRoute exact path={route.ALBUMDETAIL} component={AlbumDetail} />
          <PrivateRoute path={route.PLAYLISTDETAIL} component={EntityDetail} />
          <PrivateRoute path={route.ALBUMDETAIL} component={EntityDetail} />

          {/* <Redirect to="/discover" /> */}

        </Switch>
      </div>
    </>
  );
};
