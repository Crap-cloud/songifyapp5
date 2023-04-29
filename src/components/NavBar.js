import React from "react";

function NavBar() {
  return (
    <nav className="shadow fixed top-0 left-0 w-full">
        <div className="block md:flex justify-between bg-white dark:bg-slate-950 dark:text-white py-3 md:px-10 px-7">
            <div className="font-bold text-2xl cursor-pointer flex items center py-2">
                <span className="text-3xl text-red-700 mx-2 pt-1">
                    <ion-icon name="musical-notes-outline"></ion-icon>
                </span>
                SongifyApp
            </div>
            <ul className="flex font-bold text-xl cursor-pointer">
                <li className="p-4 hover:text-red-500 duration-500">Favorites</li>
                <li className="p-4 hover:text-red-500 duration-500">Log In</li>
            </ul>
        </div>
    </nav>
  );
}

export default NavBar;
