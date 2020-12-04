import React, { useState } from "react";
import styles from "./Landing.module.css";
import { Modal } from "../../components/Modal/Modal";
import { MyButton } from "../../components/MyButton/MyButton";
import { Register } from "../../pages/Register/Register";
import { Login } from "../../pages/Login/Login";
import { Upload } from "../../components/Upload/Upload";
import logo from "../../img/logo.png";

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

  return (
    <div className={styles["Landing"]}>
      <div className={styles["Landing-menu"]}>
        <div className={styles["Landing-logo-section"]}>
          <img src={logo} className={styles["Landing-logo"]} alt="logo" />
          <h3 className={styles["Landing-logo-text"]}>SoundMist</h3>
        </div>
        <div className={styles["Landing-buttons-section"]}>
          <div className={styles["Landing-buttons"]}>
            <MyButton onClick={handleOpenLogin} variant="white" size="100px">
              Sin In
            </MyButton>
          </div>

          <div className={styles["Landing-buttons"]}>
            <MyButton onClick={handleOpenRegister} variant="white" size="150px">
              Create Account
            </MyButton>
          </div>

          <div className={styles["Landing-buttons"]}>
            <MyButton onClick={handleOpenUpload} variant="pink-or" size="150px">
              Upload Song
            </MyButton>
          </div>
        </div>
      </div>
      <div className={styles["Landing-header"]}>
        <h1>Listen your music</h1>
        {/* <div className={styles["Landing-pic-wrap"]}>
          <img
            src="https://images.unsplash.com/photo-1520176501380-9a174bf7c783?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
            alt="pic"
            className={styles["Landing-pic"]}
          />
        </div> */}
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
      {openModalUpload && (
        <Modal handleClose={handleCloseUpload}>
          <Upload />
        </Modal>
      )}
    </div>
  );
};
