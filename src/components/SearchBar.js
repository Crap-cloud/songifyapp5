import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const GENIUS_API_URL = "https://api.genius.com";
const TOKEN = process.env.REACT_APP_GENIUS_TOKEN;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const REQUESTED_SCOPE = "me";

// Récupérer le code à partir de l'URL de redirection
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");
if (!code) {
  // Rediriger l'utilisateur vers la page d'autorisation de Genius
  const authParams = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: REQUESTED_SCOPE,
    state: uuidv4(),
    response_type: "code",
  });

  window.location.href = `https://api.genius.com/oauth/authorize?${authParams}`;
}

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  useEffect(() => {
    const fetchToken = async () => {
      if (code) {
        try {
          const tokenParams = new URLSearchParams({
            code: code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: REDIRECT_URI,
            grant_type: "authorization_code",
          });
          const response = await axios.post("https://api.genius.com/oauth/token", tokenParams, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            }
          });
          const myToken = response.data.access_token;
          localStorage.setItem("accessToken", myToken);
          setToken(myToken);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm.length >= 3) {
        try {
          const response = await axios.get(
            `${GENIUS_API_URL}/search?q=${searchTerm}&access_token=${token}`,
          );
          const searchResults = response.data.response.hits.map((hit) => ({
            title: hit.result.title,
            artist: hit.result.primary_artist.name,
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
