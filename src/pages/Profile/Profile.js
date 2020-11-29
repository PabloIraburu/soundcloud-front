import React, { useState, useEffect } from 'react';
import { getToken } from "../../utils/LocalStorage.utils";
import { DecodeToken } from "../../utils/DecodeToken";
import { ServerRequest } from '../../helpers/ServerRequest';
import './Profile.css';

export const Profile = () => {

  const [user, setUser] = useState({});

  useEffect(() => {
    const token = getToken();
    const decodedToken = DecodeToken(token);
    const userId = decodedToken.id;

    ServerRequest(`data/user/${userId}`, "GET")
      .then((response) => {
        setUser(response);
      })
      .catch(console.log);
  }, []);

  return (
    <div className="Profile-wrap">
      <div className="Lateral-menu">
        <h3>My name</h3>
      </div>

      <div className="Profile-content">
        <h3>My name</h3>
        <span className="">
          <p>Name</p>
          <p>{user.name}</p>
        </span>
        <hr className="hr" />
        <span className="">
          <p>E-mail</p>
          <p>{user.email}</p>
        </span>
        <button>Edit profile</button>
      </div>
    </div >
  )
}

