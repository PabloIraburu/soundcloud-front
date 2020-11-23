import React from "react";
//importar modal y formulario
import Carousel from "../../components/Carousel/Carousel";
import Search from "../../components/Search/Search";
import "./LandingStyles.css";
import Modal from 'react-bootstrap/Modal'
import RegisterForm from "../../components/Forms/RegisterForm";
import { AppBar, Toolbar,  } from "@material-ui/core"


const navLinks = [
  { title: `Sign in`, path: `/` },
  { title: `Create Account`, path: `/` }
]

const Home = () => {
  return (
    <div className='App'>
      <div>
        <AppBar position="static">
          <Toolbar>

          </Toolbar>
        </AppBar>
        <Carousel />
        <Modal>
          <RegisterForm />
        </Modal>
      </div>
      <div className='searchBar'>
        <Search />
      </div>
    </div>
  );
};

export default Home;
