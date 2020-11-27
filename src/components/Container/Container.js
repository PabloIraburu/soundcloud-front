import CoverInfo from "../Cover/CoverInfo";
import React from "react";
import "./container.css"


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
                <button>Explore the trending page</button>
            </div>
        </div>

    )
}