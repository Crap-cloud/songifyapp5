import React, { useState, useEffect } from 'react';
import {api_key} from '../API_KEYS';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm.length >= 3) {

        try {
          let response = await fetch(`https://cors-anywhere.herokuapp.com/http://api.genius.com/search?q=${searchTerm}&access_token=${api_key}&text_format=plain`, {
            headers: {
              'User-Agent': 'Mozilla/5.0',
              'Content-Type': 'application/json',
            },
            mode: 'cors'
          });
          
          console.log(response);
          const data = await response.json();
          const searchResults = data.response.hits.map(hit => ({
            title: hit.result.title,
            artist: hit.result.primary_artist.name
          }));
          setSearchResults(searchResults);
          
        } catch (error) {
          console.log(error);
        }

      } else {
        setSearchResults([]);
      }
    };
    
    fetchSearchResults();
  }, [searchTerm]);


  const handleSearchResultClick = (hit) => {
    setSearchTerm(hit.title + ' - ' + hit.artist);
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="bg-white rounded-full shadow-md w-5/6 hover:shadow-neutral-600 max-w-xl">
        <div className="flex items-center pl-4 pr-8 py-4">
          <span className="text-2xl text-red-700 mx-2 pt-1">
            <ion-icon name="musical-note-outline"></ion-icon>
          </span>
          <input 
            className="search-bar w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500" 
            type="text" 
            placeholder="Recherche de titres musicaux" 
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        {searchResults.length > 0 && (
          <div className="absolute w-5/6 max-w-xl suggestions bg-white rounded-b-lg shadow-md max-h-40 overflow-y-hidden hover:overflow-y-scroll scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-800">
            {searchResults.slice(0, 10).map((hit, index) => (
              <div 
                key={index} 
                className="p-4 hover:bg-gray-100 cursor-pointer pr-10"
                onClick={() => handleSearchResultClick(hit)}
              >
                <p>{hit.title} - {hit.artist}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
