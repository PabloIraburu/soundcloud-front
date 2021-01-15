import React, { useState } from "react"
import './Discover.css'
import Search from "../../components/search/Search";
import { Modal } from "../../components/Modal/Modal";
import { MyButton } from "../../components/MyButton/MyButton";
import { Upload } from "../../components/Upload/Upload";
import FollowedUsers from "../../components/FollowedUsers/followedUsers";
import List from "../../components/List/List";
import { CoverMd } from "../../components/CoverMd/CoverMd";

export default function Discover() {

    const [openModalUpload, setOpenModalUpload] = useState(false);
    const handleOpenUpload = () => setOpenModalUpload(!openModalUpload);

    const ListaSongsFake = [
        {
          title: "Soy el 1",
          categories: "Videojuegos",
          author: "Autor 1",
          img:
            "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
          _id: 1,
        },
        {
          title: "Soy el 2",
          categories: "Videojuegos",
          author: "Autor 2",
          img:
            "https://images.unsplash.com/photo-1581375074612-d1fd0e661aeb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1502&q=80",
          _id: 2,
        },
        {
          title: "Soy el 3",
          categories: "Comedia",
          author: "Autor 3",
          img:
            "https://images.unsplash.com/photo-1584168844383-3c3ee678981a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=682&q=80",
          _id: 3,
        },
        {
          title: "Soy el 4",
          categories: "Comedia",
          author: "Autor 4",
          img:
            "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
          _id: 4,
        },
        {
          title: "Soy el 5",
          categories: "Comida",
          author: "Autor 5",
          img:
            "https://images.unsplash.com/photo-1607043832356-06c04346e9c5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
          _id: 5,
        },
        {
          title: "Soy el 6",
          categories: "Comida",
          author: "Autor 6",
          img:
            "https://images.unsplash.com/photo-1607012104821-b10328a95078?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2763&q=80",
          _id: 6,
        },
        {
          title: "Soy el 7",
          categories: "Comedia",
          author: "Autor 7",
          img:
            "https://images.unsplash.com/photo-1607053117298-1e68e05881ca?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
          _id: 7,
        },
        {
          title: "Soy el 8",
          categories: "Comedia",
          author: "Autor 8",
          img:
            "https://images.unsplash.com/photo-1550755375-73584cff528c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
          _id: 8,
        },
        {
          title: "Soy el 9",
          categories: "Comedia",
          author: "Autor 9",
          img:
            "https://images.unsplash.com/photo-1610644605879-1e0e8fcb9ac2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1402&q=80",
          _id: 9,
        },
        {
          title: "Soy el 10",
          categories: "Videojuegos",
          author: "Autor 10",
          img:
            "https://images.unsplash.com/photo-1610643625267-aee6dae3ca22?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80",
          _id: 10,
        },
        {
          title: "Soy el 11",
          categories: "Comedia",
          author: "Autor 11",
          img:
            "https://images.unsplash.com/photo-1610568129002-c01dc3cdd39c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80",
          _id: 11,
        },
        {
          title: "Soy el 12",
          categories: "Videojuegos",
          author: "Autor 12",
          img:
            "https://images.unsplash.com/photo-1610555422528-07bae5b5cb51?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80",
          _id: 12,
        },
      ];

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
                <div className="CoversMd-wrap-profile">
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
                <div className="CoversMd-wrap-profile">
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