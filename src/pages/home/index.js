import React from "react";

import Carousel from "../../components/Carousel/Carousel";
import Search from "../../components/Search/Search";
import Navbar from "./Navbar/Navbar";
import CoverInfo from "../../components/Cover/CoverInfo";
import "./homeStyles.css";

const Home = () => {
  return (
    <div className='App'>
      <div>
        <Navbar />
        <Carousel />
      </div>
      <div className='searchBar'>
        <Search />
      </div>
      <div className='cover'>
        <CoverInfo />
      </div>
    </div>
  );
};

export default Home;
