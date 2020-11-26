import React from "react";
//importar modal y formulario
import Carousel from "../../components/Carousel/Carousel";
import Search from "../../components/Search/Search";
import "./LandingStyles.css";
import Modal from 'react-bootstrap/Modal'
import RegisterForm from "../../components/Forms/RegisterForm";
import { Toolbar } from "@material-ui/core"
import Button from '@material-ui/core/Button';


const Home = () => {
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
