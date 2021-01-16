import React, {useContext} from 'react'
import "./UserInfo.css"
import {UserContext} from "../../contexts/UserContext/contextProvider"


export default function UserInfo() {
    
const {user} = useContext(UserContext)

    return(
        <a className='userCard' href='/profile'>
            <img src={user.image} alt="foto"/>
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