import React from "react"
import MenuIcon from '@material-ui/icons/Menu';
import './NewLanding.css'
import Search from "../../components/Search/Search";


export default function Landing () {

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
                    <userProfile/>
                </div>
                <div className="categories">
                    <div className="songs"><i className="fas fa-meteor"></i><h2>Songs</h2></div>
                    <div className="artists"><i className="fas fa-jedi"></i><h2>Artists</h2></div>
                    <div className="styles"><i className="fas fa-user-astronaut"></i><h2>Styles</h2></div>
                    <div className="favourites"><i className="fab fa-galactic-republic"></i><h2>Favourites</h2></div>
                </div>
                <div className="addTrack">
                    <a href="">Add Track</a>
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
                    <div className="slider"></div>
                </div>
                <div className="bottomFrame"></div>
            </div>
        </div>
    )

}