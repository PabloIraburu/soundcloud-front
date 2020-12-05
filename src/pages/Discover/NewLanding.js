import React, {useState} from "react"
import MenuIcon from '@material-ui/icons/Menu';
import './NewLanding.css'
import Search from "../../components/Search/Search";
import UserInfo from "../../components/UserInfo/UserInfo";
import {Modal} from "../../components/Modal/Modal";
import {Register} from "../Register/Register";
import LateralBar from "../../components/LateralBar/LateralBar";

export default function Discover () {

    return(
        <div className='landing'>
            <script src="https://kit.fontawesome.com/2903311b15.js" crossOrigin="anonymous"></script>
            <LateralBar/>
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
        </div>
    )

}