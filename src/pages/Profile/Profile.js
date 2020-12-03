import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from "../../utils/LocalStorage.utils";
import { DecodeToken } from "../../utils/DecodeToken";
import { ServerRequest } from '../../helpers/ServerRequest';
import './Profile.css';
import { MyButton } from '../../components/MyButton/MyButton';
import { Upload } from '../../components/Upload/Upload';
import { Modal } from '../../components/Modal/Modal';
import { CoverMd } from '../../components/CoverMd/CoverMd';

export const Profile = () => {

  const ListaSongsFake = [
    {
      title: "Soy el 1",
      categories: "Videojuegos",
      author: "Autor 1",
      img: "https://images.unsplash.com/photo-1604160450925-0eecf551fa86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2551&q=80"
    },
    {
      title: "Soy el 2",
      categories: "Videojuegos",
      author: "Autor 2",
      img: "https://images.unsplash.com/photo-1603516071728-9d8ac803a335?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2525&q=80"
    },
    {
      title: "Soy el 3",
      categories: "Comedia",
      author: "Autor 3",
      img: "https://images.unsplash.com/photo-1584626128261-75a4a218fc11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80"
    },
    {
      title: "Soy el 4",
      categories: "Comedia",
      author: "Autor 4",
      img: "https://images.unsplash.com/photo-1584168844383-3c3ee678981a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1241&q=80"
    },
    {
      title: "Soy el 5",
      categories: "Comida",
      author: "Autor 5",
      img: "https://images.unsplash.com/photo-1604256140940-5150dc006258?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80"
    },
    {
      title: "Soy el 6",
      categories: "Comida",
      author: "Autor 6",
      img: "https://images.unsplash.com/photo-1603822810271-ceebe6d4c53a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2500&q=80"
    },
    {
      title: "Soy el 7",
      categories: "Comedia",
      author: "Autor 7",
      img: "https://images.unsplash.com/photo-1582246915745-10e34377da98?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1275&q=80"
    },
    {
      title: "Soy el 8",
      categories: "Comedia",
      author: "Autor 8",
      img: "https://images.unsplash.com/photo-1601642702400-c1544ff700d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80"
    }
  ];

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
        <h3>{user.name}</h3>
      </div>

      <div className="Profile-content">
        <h3>My account</h3>
        <span className="">
          <p>Name</p>
          <p>{user.name}</p>
        </span>
        <hr className="hr" />
        <span className="">
          <p>E-mail</p>
          <p>{user.email}</p>
        </span>

        <Link
          to={{
            pathname: "/editprofile",
            state: { user },
          }}
        >
          <MyButton onClick={handleSubmit} variant="pink-or" size="30%">Edit Profile</MyButton>
        </Link>
        <MyButton onClick={handleOpenUpload} variant="blue-sky" size="30%">Upload Song</MyButton>
      </div>

      <div className="CoversMd-wrap">
      {ListaSongsFake.map(song => 
        (
          <CoverMd
          title={song.title}
          categories={song.categories}
          author={song.author}
          img={song.img}
        />
      ))}
    </div>

      {openModalUpload &&
        <Modal handleClose={handleCloseUpload}>
          <Upload />
        </Modal>
      }
    </div >
  )
}

