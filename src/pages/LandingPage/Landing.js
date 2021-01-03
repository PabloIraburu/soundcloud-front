import React, {useState, useEffect, useContext} from "react";
import styles from "./Landing.module.css";
import { Modal } from "../../components/Modal/Modal";
import { MyButton } from "../../components/MyButton/MyButton";
import { Register } from "../../pages/Register/Register";
import { Login } from "../../pages/Login/Login";
import { Upload } from "../../components/Upload/Upload";
import logo from "../../img/logo.png";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { ServerRequest } from "../../helpers/ServerRequest";

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



  //Get songs from DB
  const [songList, setSongList] = useState([]);
  useEffect(() => {
    ServerRequest("data/song", "GET")
      .then((response) => setSongList(response))
      .catch(console.log);
  }, [])

  console.log("songList", songList);

  //Actualizar backend, sino trackId no funcionará
  const songsId = songList.map(songId => songId.trackId);
  console.log("songsId", songsId);

  // const trackIds = ["5fc4d698c891ef40a7a07580", "5fc4e79bb0b05e5bc165ef9e"];
  const [currentTrack, setCurrentTrack] = useState(0);

  const handleClickNext = () => {
    if (currentTrack < songsId.length - 1) {
      setCurrentTrack(currentTrack + 1);
    }
  };

  const handleClickPrev = () => {
    if (currentTrack > 0) {
      setCurrentTrack(currentTrack - 1);
    }
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

          <div className={styles["Landing-buttons"]}>
            {/*<MyButton onClick={handleOpenUpload} variant="pink-or" size="150px">*/}
            {/*  Upload Song*/}
            {/*</MyButton>*/}
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
        <audio controls="controls">
          {/* <source src="track.ogg" type="audio/ogg" /> */}
          {/* <source src={`http://localhost:3300/track/${songsId[currentTrack]}`} type="audio/mpeg" /> */}
          <source src="2 - N'to - Ayahuasca.mp3" type="audio/mpeg" />
        </audio>
      </div>
      <div className={styles["Landing-player"]}>
        <AudioPlayer
          // autoPlay
          onClickNext={handleClickNext}
          onClickPrevious={handleClickPrev}
          showSkipControls={true}
          showJumpControls={false}
          src="https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"
          src={`http://localhost:3300/track/${songsId[currentTrack]}`}
        />
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
