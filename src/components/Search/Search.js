import React, {useState, useEffect, useContext} from "react";
import TextField from '@material-ui/core/TextField';
import "./search.css"
import {ServerRequest} from "../../helpers/ServerRequest";
import {CoverSm} from "../CoverSm/CoverSm";


function Search( handleAddToFavourites, handleRemoveFromFavourites, handleAddToPlaylist ) {
    const [songs, setSongs] = useState([])
    useEffect(() => {
        ServerRequest('data/song', 'GET')
            .then((response) => {
                setSongs(response)
                console.log(response)
            })
    }, [])

    const mockSearch = songs.map(s => s.title)
    const [searchItem, setSearchItem] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const handleChange = (e) => {
        setSearchItem(e.target.value);
    };

    useEffect(() => {
        const results = songs.filter(art => art.title.toLowerCase().includes(searchItem));
        setSearchResults(results);
    }, [searchItem]);

    return (
        <div className='searchBar'>
            <TextField id="outlined-basic" label="Search" variant="outlined" type='text'
                       className='input'
                       placeholder='Search'
                       value={searchItem}
                       onChange={handleChange}/>
            <ul>
                {searchItem !== "" && searchResults.map((res, index) => (
                        <CoverSm
                            entity={res.id_song}
                            key={res._id}
                            title={res.title}
                            author={res.artist}
                            description={res.description}
                            categories={res.category}
                            img={res.image}
                            id={res._id}
                            entityType="song"
                            handleAddToFavourites={handleAddToFavourites}
                            handleRemoveFromFavourites={handleRemoveFromFavourites}
                            handleAddToPlaylist={handleAddToPlaylist}
                        />
                ))}
            </ul>
        </div>
    );
}

export default Search;
