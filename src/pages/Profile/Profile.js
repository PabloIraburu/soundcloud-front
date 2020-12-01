import React, { useState, useEffect } from 'react';
import { getToken } from "../../utils/LocalStorage.utils";
import { DecodeToken } from "../../utils/DecodeToken";
import { ServerRequest } from '../../helpers/ServerRequest';
import './Profile.css';
import { MyButton } from '../../components/MyButton/MyButton';
import { Upload } from '../../components/Upload/Upload';
import { Modal } from '../../components/Modal/Modal';

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

  //Gestión modal upload
  const [openModalUpload, setOpenModalUpload] = useState(false);
  const handleOpenUpload = () => setOpenModalUpload(!openModalUpload);
  const handleCloseUpload = (e) => {
    const { className: el } = e.target;
    if (el !== 'backdrop' && el !== 'fas fa-times' && el !== 'GoToRegister-link') return;
    setOpenModalUpload(!openModalUpload);
  }

  const handleSubmit = () => {

  }

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
        <MyButton onClick={handleSubmit} variant="pink-or" size="30%">Edit Profile</MyButton>

        <MyButton onClick={handleOpenUpload} variant="blue-sky" size="30%">Upload Song</MyButton>
      </div>

      {openModalUpload &&
        <Modal handleClose={handleCloseUpload}>
          <Upload />
        </Modal>
      }
    </div >
  )
}

