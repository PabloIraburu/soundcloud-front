import React, {useContext} from 'react'
import "./UserInfo.css"
import {UserContext} from "../../contexts/UserContext/contextProvider"


export default function UserInfo() {
    
const { user, user: {followers}} = useContext(UserContext);
console.log(user);

    return(
        <a className='userCard' href='/profile'>
            <div style={{ backgroundImage: `url(${user.image})` }} className="userCard-img"></div>
            <div className="text">
                <div className="identity">
                    <h1 className='Name'>{user.name}</h1>
                    {/*<i className="fas fa-drum"></i>*/}
                </div>
                <div className="numbers">
                    {followers.length === 0 
                        ? <p className="followers">0 Followers</p>
                        : <p className="followers">{followers.length} Followers</p>
                    }
                    <p className="tracks">Tracks</p>
                </div>
            </div>
        </a>
    )
}