import React, {useState, useEffect } from "react";
import {ServerRequest} from "../../helpers/ServerRequest";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './List.css'

export default function List () {
    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    const [entity, setEntity] = useState('');
     const SimpleSelect = () => {
        const classes = useStyles();
        const handleChange = (event) => {
            console.log(event.target)
            setEntity(event.target.value);
        };

        return (
            <div className='list'>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Entity</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={handleChange}
                        value={entity}
                    >
                        <MenuItem value='song'>Songs</MenuItem>
                        <MenuItem value='playlist'>Playlists</MenuItem>
                        <MenuItem value='user'>Users</MenuItem>
                        <MenuItem value='style'>Styles</MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
    }

    const [list, setList] = useState();
     
    // const body = {}
    /*const handleAddToFavourites = (x, p) =>{
        console.log(x)
        console.log(p)
        debugger
    let body = {
           SongIds:x._id
         }
         ServerRequest(`data/playlist/${p._id}` ,'PUT', body)
    }*/
    const handleAddToPlaylist = (x, plist) =>{
        console.log(x)
        console.log(plist)
        debugger
    let body = {
           SongIds:x._id
         }
         ServerRequest(`data/playlist/${plist._id}` ,'PUT', body)
    }
    useEffect(()=>{
        ServerRequest(`data/${entity}` ,'GET')
            .then((response) => {
                if (!response.message) {
                    setList(response)
                }
            })
            .catch((response) => console.log(response.error))
    },[entity]);


    const [playlist, setPlaylist] = useState()

    useEffect(()=>{
        ServerRequest(`data/playlist` ,'GET')
            .then((response) => {
                if (!response.message) {
                    setPlaylist(response)
                }
            })
            .catch((response) => console.log(response.error))
    },[entity]);


    const [plist, setPlist] = useState('');

        const handleChangePlaylist = (event) => {
            setPlist(event.target.value);
        }
        const deletePlaylist = (x) => {
            // ServerRequest(`data/playlist/${x._id}`, 'DELETE')
        }


    return(
        <div>
            <SimpleSelect/>
            <ul className='list'>
                {list && list.map((x) => (
                    <li key={x._id}>
                        <a onClick={()=> {
                            ServerRequest(`data/${entity}/${x._id}`, 'GET').then((response) => {
                                if (!response.message) {
                                    console.log(response.songIds)
                                }
                            })
                                .catch((response) => console.log(response.error))
                        }}>{x.title}</a>
                        {entity === 'song' && (
                            <>
                                <InputLabel id="playlist-label-id">Playlist</InputLabel>
                                <Select
                                    labelId="playlist-label-id"
                                    id="playlist"
                                    value={plist.title}
                                    onChange={(e) => setPlist(e.target.value)}
                                >
                                    {/*Map de los playlists para el dropdown*/}
                                    {/* Cómo coger todo el objeto y no solo el nombre */}
                                { playlist.map(p => (
                                    <MenuItem value={p} key={p._id} name={p.title} >{p.title}</MenuItem>
                                ))}
                                </Select>
                                <a href="#" className="nav-link"  onClick={()=>{
                                    const body ={
                                        songIds: x._id
                                    }
                                    ServerRequest(`data/playlist/5ff1e05b804a765003907fd5`, 'PUT', body)
                                }}>
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fad"
                                        // data-icon="space-station-moon-alt"
                                        role="img"
                                        // xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        // className="svg-inline--fa fa-space-station-moon-alt fa-w-16 fa-5x"
                                    >
                                        <g className="fa-group">
                                            <path
                                                fill="currentColor"
                                                d="M501.70312,224H448V160H368V96h48V66.67383A246.86934,246.86934,0,0,0,256,8C119.03125,8,8,119.0332,8,256a250.017,250.017,0,0,0,1.72656,28.26562C81.19531,306.76953,165.47656,320,256,320s174.80469-13.23047,246.27344-35.73438A250.017,250.017,0,0,0,504,256,248.44936,248.44936,0,0,0,501.70312,224ZM192,240a80,80,0,1,1,80-80A80.00021,80.00021,0,0,1,192,240ZM384,343.13867A940.33806,940.33806,0,0,1,256,352c-87.34375,0-168.71094-11.46094-239.28906-31.73633C45.05859,426.01953,141.29688,504,256,504a247.45808,247.45808,0,0,0,192-91.0918V384H384Z"
                                                className="fa-secondary"
                                            ></path>
                                            <path
                                                fill="currentColor"
                                                d="M256,320c-90.52344,0-174.80469-13.23047-246.27344-35.73438a246.11376,246.11376,0,0,0,6.98438,35.998C87.28906,340.53906,168.65625,352,256,352s168.71094-11.46094,239.28906-31.73633a246.11376,246.11376,0,0,0,6.98438-35.998C430.80469,306.76953,346.52344,320,256,320Zm-64-80a80,80,0,1,0-80-80A80.00021,80.00021,0,0,0,192,240Zm0-104a24,24,0,1,1-24,24A23.99993,23.99993,0,0,1,192,136Z"
                                                className="fa-primary"
                                            ></path>
                                        </g>
                                    </svg>
                                    <span className="link-text">Faves</span>
                                </a>
                                {plist && <button
                                    onClick={()=>{
                                        const body ={
                                            songIds: x._id
                                        }
                                        ServerRequest(`data/playlist/${plist._id}`, 'PUT', body)
                                    }}
                                >Add to {plist.title}</button>}
                            </>)}
                        {entity === 'user' && (
                            <div className='user'>
                                <a href='#' onClick={()=> setEntity('user')}>{x.name}</a>
                                <p>{x.email}</p>
                                <img src={x.image} className='profileImage' alt={x.name}/>
                                {/*Habría que poner el lenght de los arrays*/}
                                <p>Followers:</p><p>{x.followerIds}</p>
                                <p>Songs Uploaded</p><p>{x.songIds}</p>
                                <button onClick={()=>{
                                    // Need to get Logged user id
                                    const body ={
                                        following: x._id
                                    }
                                    ServerRequest(`data/user/5fc423f57afb7223f5486c9f`, 'PUT', body)
                                }}>Follow User</button>
                                <button>Unfollow User</button>
                            </div>
                        )
                        }
                        {entity === 'playlist' && (
                            <button onClick={deletePlaylist(x)}>Delete Playlist</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}