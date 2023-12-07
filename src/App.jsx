import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDarkMode } from "./Features/ToggleModeSlice";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Styles from "./App.module.css";
import Navbar from "./Navbar/Navbar.jsx";
import Blog from "./Routes/Blog/Blog.jsx";
import Project from "./Routes/Projects/Project.jsx";
import About from "./Routes/About/About.jsx";
import NewsLetter from "./Routes/NewsLetter/NewsLetter.jsx";
import Login from "./Auth/login/Login.jsx";
import Signup from "./Auth/signup/Signup.jsx";
import EmailVerify from "./Auth/emailverify/EmailVerify.jsx";


const App = () => {
  const darkMode = useSelector(selectDarkMode);
  const user = localStorage.getItem("token");

  return (
    <Router>
      <div className={`${Styles.container} ${darkMode ? Styles.dark : Styles.light}`}>
        {user && <Navbar />}
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Blog />} />
              <Route path="/projects" element={<Project />} />
              <Route path="/about" element={<About />} />
              <Route path="/newsletter" element={<NewsLetter />} />
            </>
          ) : (
            <>
              <Route path="/signup" exact element={<Signup />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/" element={<Navigate replace to="/login" />} />
              <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

