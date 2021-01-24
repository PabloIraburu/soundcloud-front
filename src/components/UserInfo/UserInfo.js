import React, {useContext, useState, useEffect} from 'react';
import "./UserInfo.css";
import {UserContext} from "../../contexts/UserContext/contextProvider";
import {ServerRequest} from '../../helpers/ServerRequest';


export default function UserInfo() {

    const {user} = useContext(UserContext);
    const [followers, setFollowers] = useState([]);
    console.log(followers);

    useEffect(() => {
        ServerRequest(`data/follower/?followed=${user._id}`, "GET")
            .then(response => setFollowers(response))
            .catch(console.log);
    }, [user])

    return (
        <a className='userCard' href='/profile'>
            <span className="superior-row">
                 <div style={{backgroundImage: `url(${user.image})`}} className="userCard-img"></div>
                <div className="identity">
                    {followers.length === 0
                        ? <p className="followers">0 Followers</p>
                        : <p className="followers">{followers.length} Followers</p>
                    }
                    <p className="tracks">Tracks</p>
                </div>
            </span>
            <div className="numbers">
                <h1 className='Name'>{user.name}</h1>
            </div>
        </a>
    )
}