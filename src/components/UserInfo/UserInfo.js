import React, {useContext} from 'react'
import "./UserInfo.css"
import {UserContext} from "../../components/Context/contextProvider"


export default function UserInfo() {
const {user} = useContext(UserContext)
    console.log(user)

    return(
        <a className='userCard' href='/profile'>
            <img src="https://media-exp1.licdn.com/dms/image/C4D03AQHclFQplwf2dg/profile-displayphoto-shrink_400_400/0?e=1611792000&v=beta&t=d9rXAfR4Sa_hOVeEUqIHgJn2FQLNMtqCbahfzRZDBVs" alt="foto"/>
            <div className="text">
                <div className="identity">
                    <h1 className='Name'>{user.name}</h1>
                    {/*<i className="fas fa-drum"></i>*/}
                </div>
                <div className="numbers">
                    <p className="followers">Followers</p>
                    <p className="tracks">Tracks</p>
                </div>
            </div>
        </a>
    )
}