import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDarkMode, toggleDarkMode } from "../Features/ToggleModeSlice";
import Sun from "../assets/images/sun.png";
import Moon from "../assets/images/moon.png";
import Cross from "../assets/images/cross.png";
import Bars from "../assets/images/bars.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Styles from "./Navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleTheme = () => {
    dispatch(toggleDarkMode());
  };

  const location = useLocation();
  const JWT_TOKEN = localStorage.getItem("token");

  const handleLogout = async () => {
    try {
      if (!JWT_TOKEN) {
        return;
      }
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
      const url = `${apiUrl}/users/logout`;
      await axios.post(url, null, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      });
      localStorage.removeItem("token");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`${Styles.navbar_container} ${
        darkMode ? Styles.dark : Styles.light
      }`}
    >
      <div className={Styles.heading}>
        <h1>Blog App</h1>
      </div>
      <div className={`${Styles.navbar_links} ${menuOpen ? Styles.open : ""}`}>
        <Link
          to={"/"}
          className={location.pathname === "/" ? Styles.active : ""}
          onClick={toggleMenu}
        >
          Blog
        </Link>

        <Link
          to={"/projects"}
          className={location.pathname === "/projects" ? Styles.active : ""}
          onClick={toggleMenu}
        >
          Projects
        </Link>
        <Link
          to={"/about"}
          className={location.pathname === "/about" ? Styles.active : ""}
          onClick={toggleMenu}
        >
          About
        </Link>
        {JWT_TOKEN && (
          <>
            <Link
              to={"/newsletter"}
              className={
                location.pathname === "/newsletter" ? Styles.active : ""
              }
              onClick={toggleMenu}
            >
              NewsLetter
            </Link>

            <Link
              to={"/profile-edit"}
              className={
                location.pathname === "/profile-edit" ? Styles.active : ""
              }
              onClick={toggleMenu}
            >
              Edit Profile
            </Link>

            <button className={Styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
        {!JWT_TOKEN && (
          <Link
            to={"/login"}
            className={location.pathname === "/login" ? Styles.active : ""}
            onClick={toggleMenu}
          >
            Login
          </Link>
        )}
      </div>
      <div className={Styles.theme_switcher}>
        <button onClick={toggleTheme} className={Styles.theme_switcher_button}>
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
