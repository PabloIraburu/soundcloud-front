import React, { useState } from "react";
//importar modal y formulario
import Carousel from "../../components/Carousel/Carousel";
import Search from "../../components/Search/Search";
import "./LandingStyles.css";
<<<<<<< HEAD
import Modal from 'react-bootstrap/Modal'
import RegisterForm from "../../components/Forms/RegisterForm";
import { Toolbar } from "@material-ui/core"
import Button from '@material-ui/core/Button';
=======
import { AppBar, Toolbar, } from "@material-ui/core"
// import RegisterForm from "../../components/Forms/RegisterForm";
// import RegisterModal from "../../components/Modals/RegisterModal";
import { Modal } from "../../components/Modal/Modal";
import { Register } from "../../pages/Register/Register";
import Container from "../../components/Container/Container";

>>>>>>> 0e00e474850dd8e4b642d193cd387af074cd0917


const Home = () => {

  const [openModalRegister, setOpenModalRegister] = useState(false);
  const handleOpenRegister = () => setOpenModalRegister(!openModalRegister);
  const handleCloseRegister = (e) => {
    const { className: el } = e.target;
    if (el !== 'backdrop' && el !== 'fas fa-times') return;
    setOpenModalRegister(!openModalRegister);
  }

  return (
    <div className='App'>
      <div>
          <Toolbar>
            <Button variant="contained" color="primary" href="#contained-buttons" className="signin">
            Sign In
            </Button>
            <Button variant="contained" color="primary" href="#contained-buttons" className="createaccount">
            Create Account
            </Button>
          </Toolbar>
        <Carousel />
        {/* <RegisterModal /> */}
        <button type="button" onClick={handleOpenRegister} className="button-register">Crear cuenta</button>
        {openModalRegister &&
          <Modal handleClose={handleCloseRegister}>
            <Register />
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
