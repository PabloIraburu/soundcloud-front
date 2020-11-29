import React, { useState } from "react";
import Carousel from "../../components/Carousel/Carousel";
import Search from "../../components/Search/Search";
import "./LandingStyles.css";
import { AppBar, Toolbar, Button, Grid } from "@material-ui/core"
import { Modal } from "../../components/Modal/Modal";
import { Register } from "../../pages/Register/Register";
import { Login } from "../../pages/Login/Login";
import Container from "../../components/Container/Container";

const navLinks = [
  { title: `Sign in`, path: `/` },
  { title: `Create Account`, path: `/` }
]

export default function LandingPage() {
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

  return (
    <div className='App'>
      <div>
        <Toolbar>
          <img src="soundcloud.png" className='soundcloud' />
          <Grid container justify="flex-end">
            <Button variant="contained" color="primary" href="#contained-buttons" onClick={handleOpenLogin} className="button-signin">
              Sign In
            </Button>
            <Button variant="contained" color="primary" href="#contained-buttons" onClick={handleOpenRegister} className="button-register">
              Crear cuenta
            </Button>
          </Grid>
        </Toolbar>
        <Carousel/>
      </div>
      <div className='searchBar'>
        <h2>Search Artist</h2>
        <Search />
      </div>
      <Container />

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
    </div>
  );
}


