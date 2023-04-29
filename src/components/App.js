import React from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import bgImg from '../images/bg-img-7.jpg';
import DarkMod from "./DarkMod";


function App() {
  const bgStyle = {
    backgroundImage: `url(${bgImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div>
      <NavBar />
      <div className="mt-16 w-full h-screen" style={bgStyle}>
        <SearchBar />
        <div className="bg-slate-950 dark:text-slate-950 dark:bg-white text-white w-10 h-10 rounded-r-lg text-2xl fixed left-0 top-60 flex items-center justify-center font-bold"><DarkMod /></div>
      </div>
    </div>
  );
}

export default App;
