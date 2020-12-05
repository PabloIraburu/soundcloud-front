import UserInfo from "../UserInfo/UserInfo";
import React, {useState} from "react";
import {Modal} from "../Modal/Modal";
import "./LateralBar.css"

export default function LateralBar (){
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
        <div className='leftBar'>
            <div className="header">
                <div className="logo">
                    <p>Sound</p><p className='logoClear'>Mist</p>
                </div>
            </div>
            <div className="profile">
                <UserInfo/>
            </div>
            <nav>
                <ul className="categories">
                    <li><a className="songs" href='library'><i className="fas fa-meteor"></i><h2>Songs</h2></a></li>
                    <li><a className="artists" href='artists'><i className="fas fa-jedi"></i><h2>Artists</h2></a></li>
                    <li><a className="styles" href='styles'><i className="fas fa-user-astronaut"></i><h2>Styles</h2></a></li>
                    <li><a className="favourites" onClick={handleOpenModal}><i className="fab fa-galactic-republic"></i><h2>Favourites</h2></a></li>
                </ul>
            </nav>
            <div className="addTrack">
                <a className='button' href="" onClick={handleOpenModal}>Add Track</a>
            </div>
            {modalOpen &&
            <Modal handleClose={handleCloseFav}>
                <p>Hello</p>
            </Modal>}
        </div>
    )
}

