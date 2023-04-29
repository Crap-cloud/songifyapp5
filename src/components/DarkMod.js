import { useState, useEffect } from "react";

function DarkMod() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        if (theme === "dark") {
        document.documentElement.classList.add("dark");
        } else {
        document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const handleSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <button onClick={handleSwitch}>
            <ion-icon name="moon-outline"></ion-icon>
        </button>
    );
}

export default DarkMod;