import React, { useState } from "react"
import Search from "../../components/Search/Search";
import { Modal } from "../../components/Modal/Modal";
import { MyButton } from "../../components/MyButton/MyButton";
import { Upload } from "../../components/Upload/Upload";
// import FollowedUsers from "../../components/FollowedUsers/followedUsers";
import List from "../../components/List/List";
import { CoverMd } from "../../components/CoverMd/CoverMd";
import { ListaSongsFake } from "../../data/fakeSongs";
import './Discover.css'

export default function Discover() {

    const [openModalUpload, setOpenModalUpload] = useState(false);
    const handleOpenUpload = () => setOpenModalUpload(!openModalUpload);

    //Gestión modal upload
    const handleCloseUpload = (e) => {
        const { className: el } = e.target;
        if (el !== "backdrop" && el !== "fas fa-times") return;
        setOpenModalUpload(!openModalUpload);
    };

    return (
        <div className='landing'>
            <script src="https://kit.fontawesome.com/2903311b15.js" crossOrigin="anonymous"></script>
            {/* <div className="rightBar">
                <FollowedUsers />
            </div> */}
            <div className='middleBar'>
                <div className="headMid">
                    <div className="search">
                        <Search />
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
                                <img src="https://www.ismorbo.com/wp-content/uploads/2018/10/40550719_1376357265830478_8906633344016595746_n.jpg" alt="" />
                                <img src="https://lab.fm/wp-content/uploads/2020/03/030420-Joji-Run-Tonight-Show-Jimmy-Fallon-YouTube.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottomFrame">
                    <div className="recommended">
                        <MyButton onClick={handleOpenUpload} variant="pink-or" size="150px">
                            Upload Song
                        </MyButton>
                        <div className="listComp">
                            <List />
                        </div>
                        <div className="title"></div>
                        <div className="gallery">
                        </div>
                    </div>
                    <div className="player"></div>
                    <div className="playlist"></div>
                </div>

                <h3>Recommended for you</h3>
                <div className="Discover-albums">
                    {ListaSongsFake.map((song) => (
                        <CoverMd
                            key={song._id}
                            title={song.title}
                            categories={song.categories}
                            author={song.author}
                            img={song.img}
                        />
                    ))}
                </div>

                <h3>World's Top 100</h3>
                <div className="Discover-albums">
                    {ListaSongsFake.map((song) => (
                        <CoverMd
                            key={song._id}
                            title={song.title}
                            categories={song.categories}
                            author={song.author}
                            img={song.img}
                        />
                    ))}
                </div>
            </div>
            {openModalUpload && (
                <Modal handleClose={handleCloseUpload}>
                    <Upload />
                </Modal>
            )}
        </div>
    )

}