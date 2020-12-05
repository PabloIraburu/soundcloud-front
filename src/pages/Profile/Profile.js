import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../utils/LocalStorage.utils";
import { DecodeToken } from "../../utils/DecodeToken";
import { ServerRequest } from "../../helpers/ServerRequest";
import "./Profile.css";
import { MyButton } from "../../components/MyButton/MyButton";
import { Upload } from "../../components/Upload/Upload";
import { Modal } from "../../components/Modal/Modal";
import { CoverBg } from "../../components/CoverBg/CoverBg";
import { CoverMd } from "../../components/CoverMd/CoverMd";
import { CoverSm } from "../../components/CoverSm/CoverSm";

export const Profile = () => {
  const ListaSongsFake = [
    {
      title: "Soy el 1",
      categories: "Videojuegos",
      author: "Autor 1",
      img:
        "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
      _id: 1,
    },
    {
      title: "Soy el 2",
      categories: "Videojuegos",
      author: "Autor 2",
      img:
        "https://images.unsplash.com/photo-1581375074612-d1fd0e661aeb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1502&q=80",
      _id: 2
    },
    {
      title: "Soy el 3",
      categories: "Comedia",
      author: "Autor 3",
      img:
        "https://images.unsplash.com/photo-1584168844383-3c3ee678981a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=682&q=80",
      _id: 3
    },
    {
      title: "Soy el 4",
      categories: "Comedia",
      author: "Autor 4",
      img:
        "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      _id: 4
    },
    {
      title: "Soy el 5",
      categories: "Comida",
      author: "Autor 5",
      img:
        "https://images.unsplash.com/photo-1607043832356-06c04346e9c5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      _id: 5
    },
    {
      title: "Soy el 6",
      categories: "Comida",
      author: "Autor 6",
      img:
        "https://images.unsplash.com/photo-1607012104821-b10328a95078?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2763&q=80",
      _id: 6
    },
    {
      title: "Soy el 7",
      categories: "Comedia",
      author: "Autor 7",
      img:
        "https://images.unsplash.com/photo-1607053117298-1e68e05881ca?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      _id: 7
    },
    {
      title: "Soy el 8",
      categories: "Comedia",
      author: "Autor 8",
      img:
        "https://images.unsplash.com/photo-1550755375-73584cff528c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      _id: 8
    },
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
    if (
      el !== "backdrop" &&
      el !== "fas fa-times" &&
      el !== "GoToRegister-link"
    )
      return;
    setOpenModalUpload(!openModalUpload);
  };

  const handleSubmit = () => { };

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
          <MyButton onClick={handleSubmit} variant="pink-or" size="30%">
            Edit Profile
          </MyButton>
        </Link>
        <MyButton onClick={handleOpenUpload} variant="blue-sky" size="30%">
          Upload Song
        </MyButton>
      </div>

      <div className="CoversBg-wrap-profile">
        {ListaSongsFake.map((song) => (
          <CoverBg
            key={song._id}
            title={song.title}
            categories={song.categories}
            author={song.author}
            img={song.img}
          />
        ))}
      </div>

      <div className="CoversMd-wrap-profile">
        {ListaSongsFake.map((song) => (
          <CoverMd
            key={song._id}
            title={song.title}
            categories={song.categories}
            author={song.author}
            img={song.img}
          />
        ))}
      </div>

      <div className="CoversMd-wrap-profile">
        {ListaSongsFake.map((song) => (
          <CoverSm
            key={song._id}
            title={song.title}
            categories={song.categories}
            author={song.author}
            img={song.img}
          />
        ))}
      </div>

      {openModalUpload && (
        <Modal handleClose={handleCloseUpload}>
          <Upload />
        </Modal>
      )}
    </div>
  );
};
