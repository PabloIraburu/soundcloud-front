import React, {useState} from "react";
import {ServerRequest} from "../../helpers/ServerRequest";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {setJWT} from "../../utils/LocalStorage.utils";
import {DISCOVER} from "../../routes/routes";

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
                        value={entity}
                        onChange={handleChange}
                    >
                        <MenuItem value='song'>Songs</MenuItem>
                        <MenuItem value='playlist'>Playlists</MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
    }

    const [list, setList] = useState([])

    ServerRequest(`data/${entity}` ,'GET')
        .then((response) => {
            debugger;
            const list = response.filter((entity) => {

            })

        })
        .catch((response) => console.log(response.error))
    return(
        <div>
            <SimpleSelect/>
        </div>
    )
}