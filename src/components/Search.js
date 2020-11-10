import React, { useState, useEffect } from "react";
import { propTypes } from "react-bootstrap/esm/Image";

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
    setSearchResults(results);
  }, [searchItem]);

  return (
    <div className='searchBar'>
      <label htmlFor='search'>Search Artist</label>
      <input
        type='text'
        placeholder='Search'
        value={searchItem}
        onChange={handleChange}
      />
      <ul>
        {searchResults.map((res) => (
          <li>{res}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
