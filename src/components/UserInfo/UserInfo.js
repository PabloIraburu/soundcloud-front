import React from 'react'
import "./UserInfo.css"

export default function UserInfo() {


    return(
        <div className='userCard'>
            <img src="https://media-exp1.licdn.com/dms/image/C4D03AQHclFQplwf2dg/profile-displayphoto-shrink_400_400/0?e=1611792000&v=beta&t=d9rXAfR4Sa_hOVeEUqIHgJn2FQLNMtqCbahfzRZDBVs" alt="foto"/>
            <div className="text">
                <div className="identity">
                    <h1 className='Name'>Pablo Iraburu</h1>
                    {/*<i className="fas fa-drum"></i>*/}
                </div>
                <div className="numbers">
                    <p className="followers">Followers</p>
                    <p className="tracks">Tracks</p>
                </div>
            </div>
        </div>
    )
}