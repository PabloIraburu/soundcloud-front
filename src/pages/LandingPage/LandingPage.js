import React, { useState } from "react";
import Search from "../../components/Search/Search";
import "./LandingStyles.css";
import { AppBar, Toolbar, Button, Grid } from "@material-ui/core"
import { Modal } from "../../components/Modal/Modal";
import { MyButton} from "../../components/MyButton/MyButton";
import { Register } from "../../pages/Register/Register";
import { Login } from "../../pages/Login/Login";
import { Upload } from "../../components/Upload/Upload";
import Container from "../../components/Container/Container";
import { CoverMd } from "../../components/CoverMd/CoverMd";

const navLinks = [
  { title: `Sign in`, path: `/` },
  { title: `Create Account`, path: `/` }
]

export default function LandingPage() {

  const ListaPodcastFake = [
    {
      title: "Soy el podcast 1",
      categories: "Videojuegos",
      author: "Autor podcast 1",
      img: "https://images.unsplash.com/photo-1604160450925-0eecf551fa86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2551&q=80"
    },
    {
      title: "Soy el podcast 2",
      categories: "Videojuegos",
      author: "Autor podcast 2",
      img: "https://images.unsplash.com/photo-1603516071728-9d8ac803a335?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2525&q=80"
    },
    {
      title: "Soy el podcast 3",
      categories: "Comedia",
      author: "Autor podcast 3",
      img: "https://images.unsplash.com/photo-1584626128261-75a4a218fc11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80"
    },
    {
      title: "Soy el podcast 4",
      categories: "Comedia",
      author: "Autor podcast 4",
      img: "https://images.unsplash.com/photo-1584168844383-3c3ee678981a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1241&q=80"
    },
    {
      title: "Soy el podcast 1",
      categories: "Comida",
      author: "Autor podcast 1",
      img: "https://images.unsplash.com/photo-1604256140940-5150dc006258?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80"
    },
    {
      title: "Soy el podcast 2",
      categories: "Comida",
      author: "Autor podcast 2",
      img: "https://images.unsplash.com/photo-1603822810271-ceebe6d4c53a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2500&q=80"
    },
    {
      title: "Soy el podcast 3",
      categories: "Comedia",
      author: "Autor podcast 3",
      img: "https://images.unsplash.com/photo-1582246915745-10e34377da98?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1275&q=80"
    },
    {
      title: "Soy el podcast 4",
      categories: "Comedia",
      author: "Autor podcast 4",
      img: "https://images.unsplash.com/photo-1601642702400-c1544ff700d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80"
    }
  ];

  //Gestión modal registro
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const handleOpenRegister = () => setOpenModalRegister(!openModalRegister);
  const handleCloseRegister = (e) => {
    const { className: el } = e.target;
    if (el !== 'backdrop' && el !== 'fas fa-times' && el !== 'GoToLogin-link') return;
    setOpenModalRegister(!openModalRegister);
  }

  //Gestión modal login
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const handleOpenLogin = () => setOpenModalLogin(!openModalLogin);
  const handleCloseLogin = (e) => {
    const { className: el } = e.target;
    if (el !== 'backdrop' && el !== 'fas fa-times' && el !== 'GoToRegister-link') return;
    setOpenModalLogin(!openModalLogin);
  }

  //Gestión modal upload
  const [openModalUpload, setOpenModalUpload] = useState(false);
  const handleOpenUpload = () => setOpenModalUpload(!openModalUpload);
  const handleCloseUpload = (e) => {
    const { className: el } = e.target;
    if (el !== 'backdrop' && el !== 'fas fa-times' && el !== 'GoToRegister-link') return;
    setOpenModalUpload(!openModalUpload);
  }

  return (
    <div className='App'>
      <div className="container">
        <Toolbar>
          <img src="soundcloud.png" className='soundcloud' />
          {/* <Grid container justify="flex-end"> */}
            <Button variant="contained" color="primary" href="#contained-buttons" onClick={handleOpenLogin} className="button-signin">
              Sign In
            </Button>
            <Button variant="contained" color="primary" href="#contained-buttons" onClick={handleOpenRegister} className="button-register">
              Create Account
            </Button>
            <Button variant="contained" color="primary" href="#contained-buttons" onClick={handleOpenUpload} className="button-upload">
              Upload Song
            </Button>
            <MyButton onClick={handleOpenUpload} variant="pink-or" size="100px">
              Pink Or
            </MyButton>

        </Toolbar>
      </div>
      <div className='searchBar'>
        <h2>Search Artist</h2>
        <Search />
      </div>
      <Container />
      <div className="CoversMd-wrap">
      {ListaPodcastFake.map(podcast => 
        (
          <CoverMd
          title={podcast.title}
          categories={podcast.categories}
          author={podcast.author}
          img={podcast.img}
        />
      ))}
    </div>
      {openModalRegister &&
        <Modal handleClose={handleCloseRegister}>
          <Register handleCloseRegister={handleCloseRegister} openLogin={handleOpenLogin} />
        </Modal>
      }
      {openModalLogin &&
        <Modal handleClose={handleCloseLogin}>
          <Login handleCloseLogin={handleCloseLogin} openRegister={handleOpenRegister} />
        </Modal>
      }
      {openModalUpload &&
        <Modal handleClose={handleCloseUpload}>
          <Upload />
        </Modal>
      }
    </div>
  );
}


