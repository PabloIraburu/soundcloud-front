import React from "react"
import MenuIcon from '@material-ui/icons/Menu';
import './NewLanding.css'
import Search from "../../components/Search/Search";
import UserInfo from "../../components/UserInfo/UserInfo";

export default function Discover () {

    return(
        <div className='landing'>
            <script src="https://kit.fontawesome.com/2903311b15.js" crossOrigin="anonymous"></script>
            <div className='leftBar'>
                <div className="header">
                    <div className="logo">
                        <p>Sound</p><p>Mist</p>
                    </div>
                </div>
                <div className="profile">
                    <UserInfo/>
                </div>
                <div className="categories">
                    <div className="songs"><i className="fas fa-meteor"></i><h2>Songs</h2></div>
                    <div className="artists"><i className="fas fa-jedi"></i><h2>Artists</h2></div>
                    <div className="styles"><i className="fas fa-user-astronaut"></i><h2>Styles</h2></div>
                    <div className="favourites"><i className="fab fa-galactic-republic"></i><h2>Favourites</h2></div>
                </div>
                <div className="addTrack">
                    <a className='button' href="">Add Track</a>
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
        </div>
    )

}