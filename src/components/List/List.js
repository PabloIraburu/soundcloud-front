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
            setEntity(event.target.value);
        };

        return (
            <div>
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
                    </Select>
                </FormControl>
            </div>
        );
    }

    const [list, setList] = useState()
     const body ={}
    const handleAddToFavourites = (x) =>{
    let body = {
           SongIds:x._id
         }
         ServerRequest(`data/${entity}` ,'PUT', body)
    }
    useEffect(()=>{
        ServerRequest(`data/${entity}` ,'GET')
            .then((response) => {
                if (!response.message) {
                    setList(response)
                }
            })
            .catch((response) => console.log(response.error))
    },[entity])

    const [playlist, setPlaylist] = useState()

    useEffect(()=>{
        ServerRequest(`data/playlist` ,'GET')
            .then((response) => {
                if (!response.message) {
                    setPlaylist(response)
                }
            })
            .catch((response) => console.log(response.error))
    },[entity])
    const [plist, setPlist] = useState('');

        const handleChangePlaylist = (event) => {
            setPlist(event.target.value);
            console.log(plist)
        }

    return(
        <div>
            <SimpleSelect/>
            <ul className='list'>
                {list && list.map((x) => (
                    <li key={x._id}>
                        <a href="#">{x.title}</a>
                        {entity === 'song' && (
                            <>
                                <InputLabel id="playlist-label-id">Playlist</InputLabel>
                                <Select
                                labelId="playlist-label-id"
                                id="playlist"
                                value={plist}
                                onChange={handleChangePlaylist}
                                >
                                { playlist.map(p => (
                                    <MenuItem value={plist.title} key={p._id}>{p.title}</MenuItem>
                                ))}
                            </Select>
                            <button onClick={handleAddToFavourites}>Add to {plist}</button></>)}
                    </li>
                ))}
            </ul>
        </div>
    )
}