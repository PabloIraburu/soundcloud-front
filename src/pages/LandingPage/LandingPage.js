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


const navLinks = [
  { title: `Sign in`, path: `/` },
  { title: `Create Account`, path: `/` }
]

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

      </div>
      <div className='searchBar'>
        <Search />
      </div>
    </div>
  );
};

export default Home;
