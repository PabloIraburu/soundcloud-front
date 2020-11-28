import React, { useState } from "react";
//importar modal y formulario
import Carousel from "../../components/Carousel/Carousel";
import Search from "../../components/Search/Search";
import "./LandingStyles.css";
import { AppBar, Toolbar, } from "@material-ui/core"
// import RegisterForm from "../../components/Forms/RegisterForm";
// import RegisterModal from "../../components/Modals/RegisterModal";
import { Modal } from "../../components/Modal/Modal";
import { Register } from "../../pages/Register/Register";
import { Login } from "../../pages/Login/Login";
import Container from "../../components/Container/Container";



const navLinks = [
  { title: `Sign in`, path: `/` },
  { title: `Create Account`, path: `/` }
]

const Home = () => {
  //Gestión modal registro
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const handleOpenRegister = () => setOpenModalRegister(!openModalRegister);
  const handleCloseRegister = (e) => {
    const { className: el } = e.target;
    if (el !== 'backdrop' && el !== 'fas fa-times') return;
    setOpenModalRegister(!openModalRegister);
  }

  //Gestión modal login
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const handleOpenLogin = () => setOpenModalLogin(!openModalLogin);
  const handleCloseLogin = (e) => {
    const { className: el } = e.target;
    if (el !== 'backdrop' && el !== 'fas fa-times') return;
    setOpenModalLogin(!openModalLogin);
  }

  return (
    <div className='App'>
      <div>
        <AppBar position="static">
          <Toolbar>

          </Toolbar>
        </AppBar>
        <Carousel />
        {/* <RegisterModal /> */}
        <button type="button" onClick={handleOpenRegister} className="button-register">Crear cuenta</button>
        {openModalRegister &&
          <Modal handleClose={handleCloseRegister}>
            <Register />
          </Modal>
        }
        <button type="button" onClick={handleOpenLogin} className="button-login">Accede</button>
        {openModalLogin &&
          <Modal handleClose={handleCloseLogin}>
            <Login />
          </Modal>
        }

      </div>
      <div className='searchBar'>
        <Search />
      </div>
        <Container/>
    </div>
  );
};

export default Home;
