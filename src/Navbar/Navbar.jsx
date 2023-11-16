import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDarkMode, toggleDarkMode } from "../Features/ToggleModeSlice";
import Styles from "./Navbar.module.css";
import Sun from "../assets/images/sun.png";
import Moon from "../assets/images/moon.png";
import Cross from "../assets/images/cross.png";
import Bars from "../assets/images/bars.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleTheme = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div
      className={`${Styles.navbar_container} ${
        darkMode ? Styles.dark : Styles.light
      }`}
    >
      <div className={Styles.heading}>
        <h1>Rayan Ahmad</h1>
      </div>
      <div className={`${Styles.navbar_links} ${menuOpen ? Styles.open : ""}`}>
        <a href="/">Blog</a>
        <a href="/">Projects</a>
        <a href="/">About</a>
        <a href="/">NewsLetter</a>
      </div>
      <div className={Styles.theme_switcher}>
        <button onClick={toggleTheme}>
          {darkMode ? (
            <div className={Styles.theme}>
              <p>Light Mode</p>
              <img src={Sun} alt="sun" />
            </div>
          ) : (
            <div className={Styles.theme}>
              <p>Dark Mode</p>
              <img src={Moon} alt="moon" />
            </div>
          )}
        </button>
      </div>
      <div className={Styles.navbar_toggle} onClick={toggleMenu}>
        {menuOpen ? (
          <img src={Cross} alt="close menu" />
        ) : (
          <img src={Bars} alt="open menu" />
        )}
      </div>
    </div>
  );
};

export default Navbar;