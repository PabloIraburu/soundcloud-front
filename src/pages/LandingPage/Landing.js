import React, { useState } from "react";
import styles from "./Landing.module.css";
import { Modal } from "../../components/Modal/Modal";
import { MyButton } from "../../components/MyButton/MyButton";
import { Register } from "../../pages/Register/Register";
import { Login } from "../../pages/Login/Login";
import logo from "../../img/logo.png";
// import "react-h5-audio-player/lib/styles.css";

export const Landing = () => {
  //Gestión modal registro
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const handleOpenRegister = () => setOpenModalRegister(!openModalRegister);
  const handleCloseRegister = (e) => {
    const { className: el } = e.target;
    if (el !== "backdrop" && el !== "fas fa-times" && el !== "GoToLogin-link")
      return;
    setOpenModalRegister(!openModalRegister);
  };

  //Gestión modal login
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const handleOpenLogin = () => setOpenModalLogin(!openModalLogin);
  const handleCloseLogin = (e) => {
    const { className: el } = e.target;
    if (
      el !== "backdrop" &&
      el !== "fas fa-times" &&
      el !== "GoToRegister-link"
    )
      return;
    setOpenModalLogin(!openModalLogin);
  };

  return (
    <div className={styles["Landing"]}>
      <div className={styles["Landing-menu"]}>
        <div className={styles["Landing-logo-section"]}>
          <img src={logo} className={styles["Landing-logo"]} alt="logo" />
          <a href='/discover' className={styles["Landing-logo-text"]}>SoundMist</a>
        </div>

        <div className={styles["Landing-buttons-section"]}>
          <div className={styles["Landing-buttons"]}>
            <MyButton onClick={handleOpenLogin} variant="white" size="100px">
              Sign In
            </MyButton>
          </div>

          <div className={styles["Landing-buttons"]}>
            <MyButton onClick={handleOpenRegister} variant="white" size="150px">
              Create Account
            </MyButton>
          </div>

        </div>
      </div>
      <div className={styles["Landing-header"]}>
        <h1>Listen your music</h1>
      </div>

      {openModalRegister && (
        <Modal handleClose={handleCloseRegister}>
          <Register
            handleCloseRegister={handleCloseRegister}
            openLogin={handleOpenLogin}
          />
        </Modal>
      )}

      {openModalLogin && (
        <Modal handleClose={handleCloseLogin}>
          <Login
            handleCloseLogin={handleCloseLogin}
            openRegister={handleOpenRegister}
          />
        </Modal>
      )}

    </div>
  );
};
