import CoverInfo from "../Cover/CoverInfo";
import React from "react";
import "./container.css"


export default function Container () {
    return(
        <div className='container'>
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
        </div>

    )
}