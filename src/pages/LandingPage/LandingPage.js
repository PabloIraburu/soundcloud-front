import React, { useState } from "react";
//importar modal y formulario
import Carousel from "../../components/Carousel/Carousel";
import Search from "../../components/Search/Search";
import "./LandingStyles.css";
import { AppBar, Toolbar, Button, Grid } from "@material-ui/core"
// import RegisterForm from "../../components/Forms/RegisterForm";
// import RegisterModal from "../../components/Modals/RegisterModal";
import { Modal } from "../../components/Modal/Modal";
import { Register } from "../../pages/Register/Register";
import Container from "../../components/Container/Container";



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
          <img src="soundcloud.png" className={classes.soundcloud} />
          <Grid container justify="flex-end">
            <Button variant="contained" color="primary" href="#contained-buttons" className="button-signin">
              Sign In
            </Button>
            <Button variant="contained" color="primary" href="#contained-buttons" onClick={handleOpenRegister} className="button-register">
              Crear cuenta
            </Button>
          </Grid>
          </Toolbar>
        <Carousel />
        {/* <RegisterModal /> */}
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
