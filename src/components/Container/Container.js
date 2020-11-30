import CoverInfo from "../Cover/CoverInfo";
import React from "react";
import "./container.css"
import {MyButton} from "../MyButton/MyButton";


export default function Container () {
    return(
        <div className='container'>
            <h2 className='header'>
                Hear the lastest trends in the music community
            </h2>
           <div className="upperRow">
               <CoverInfo/>
               <CoverInfo/>
               <CoverInfo/>
               <CoverInfo/>
               <CoverInfo/>
           </div>
            <div className="downRow">
                <CoverInfo/>
                <CoverInfo/>
                <CoverInfo/>
                <CoverInfo/>
                <CoverInfo/>
            </div>
            <div className="buttonHolder">
                <MyButton  variant="blue-sky" size="100px">
                    Explore Trending
                </MyButton>
            </div>
        </div>

    )
}