import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import "./search.css"

const mockSearch = [
  "Robert Glasper",
  "Chris Dave",
  "Hiatus kaiyote",
  "Bantamweight",
  "Funk yo mamma",
];

function Search() {
  const [searchItem, setSearchItem] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (e) => {
    setSearchItem(e.target.value);
  };
  useEffect(() => {
    const results =
      mockSearch &&
      mockSearch.filter((art) => art.toLowerCase().includes(searchItem));
    console.log(results);
    setSearchResults(results);
  }, [searchItem]);

  return (
    <div className='searchBar'>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
        <input id="outlined-basic" label="Search any music you want" type='text'
                   placeholder=" Search"
                   ClassName='input'
                   value={searchItem}
                   onChange={handleChange} />
      <ul>
        {searchResults.map((res) => (
          <li>{res}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
