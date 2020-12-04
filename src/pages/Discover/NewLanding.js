import React, {useState} from "react"
import MenuIcon from '@material-ui/icons/Menu';
import './NewLanding.css'
import Search from "../../components/Search/Search";
import UserInfo from "../../components/UserInfo/UserInfo";
import {Modal} from "../../components/Modal/Modal";
import {Register} from "../Register/Register";

export default function Discover () {
const [modalOpen,setModalOpen]= useState(false)
const handleOpenModal= () =>{
    setModalOpen(true)
    }
const handleCloseFav = (e) => {
    const { className: el } = e.target;
    if (el !== 'backdrop' && el !== 'fas fa-times' ) return;
    setModalOpen(false);
}
    return(
        <div className='landing'>
            <script src="https://kit.fontawesome.com/2903311b15.js" crossOrigin="anonymous"></script>
            <div className='leftBar'>
                <div className="header">
                    <div className="brand">
                        <p>Sound</p><p className='logoClear'>Mist</p>
                    </div>
                </div>
                <div className="profile">
                    <UserInfo/>
                </div>
                <div className="categories">
                    <a className="songs" href='library'><i className="fas fa-meteor"></i><h2>Songs</h2></a>
                    <a className="artists" href='artists'><i className="fas fa-jedi"></i><h2>Artists</h2></a>
                    <a className="styles" href='styles'><i className="fas fa-user-astronaut"></i><h2>Styles</h2></a>
                    <a className="favourites" onClick={handleOpenModal}><i className="fab fa-galactic-republic"></i><h2>Favourites</h2></a>
                </div>
                <div className="addTrack">
                    <a className='button' href="" onClick={handleOpenModal}>Add Track</a>
                </div>
            </div>
            <div className='rightBar'>
                <div className="headRight">
                    <div className="search">
                        <Search/>
                    </div>
                    <div className="notif">
                        <span><i className="fas fa-ambulance"></i></span>
                        <span><i className="far fa-dot-circle"></i></span>
                    </div>
                </div>
                <div className="mainFrame">
                    <div className="header">
                        <h2>Weekly Top Track</h2>
                    </div>
                    <div className="slider">
                        <div className="display">
                            <div className="text">
                                <h2>SLOWING DANCING IN THE DARK</h2>
                            </div>
                            <div className="images">
                                <img src="https://www.ismorbo.com/wp-content/uploads/2018/10/40550719_1376357265830478_8906633344016595746_n.jpg" alt=""/>
                                <img src="https://lab.fm/wp-content/uploads/2020/03/030420-Joji-Run-Tonight-Show-Jimmy-Fallon-YouTube.jpg" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottomFrame">
                    <div className="recomended">
                        <div className="title"></div>
                        <div className="gallery">
                        </div>
                    </div>
                    <div className="player"></div>
                    <div className="playlist"></div>
                </div>
            </div>
            {modalOpen &&
            <Modal handleClose={handleCloseFav}>
                <p>Hello</p>
            </Modal>
            }
        </div>
    )

}