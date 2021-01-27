import React, {useState, useEffect, useContext} from "react";
import TextField from '@material-ui/core/TextField';
import "./search.css"
import {ServerRequest} from "../../helpers/ServerRequest";
import {CoverSm} from "../CoverSm/CoverSm";


function Search() {
  const [songs,setSongs] = useState([])
  useEffect(()=>{
    ServerRequest('data/song', 'GET')
        .then((response)=> {
          setSongs(response)
          console.log(response)
        } )
  },[])

  const mockSearch = songs.map(s=>s.title)
  const [searchItem, setSearchItem] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (e) => {
    setSearchItem(e.target.value);
  };

  useEffect(() => {
    console.log(mockSearch)
    const results =
      mockSearch &&
      mockSearch.filter((art) => art.toLowerCase().includes(searchItem));
    setSearchResults(results);
  }, [searchItem]);

  return (
    <div className='searchBar'>
        <TextField id="outlined-basic" label="Search" variant="outlined" type='text'
                   className='input'
                   placeholder='Search'
                   value={searchItem}
                   onChange={handleChange} />
      <ul>
        {searchItem !== "" && searchResults.map((res, index) => (
            <>
                <li key={index}>{res}</li>
                <CoverSm/>
            </>
        ))}
      </ul>
    </div>
  );
}

export default Search;
