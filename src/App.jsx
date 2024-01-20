import React, { useEffect, useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { selectDarkMode } from "./Features/ToggleModeSlice";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar/Navbar.jsx";
import Blog from "./Routes/Blog/Blog.jsx";
import CreateBlog from "./Routes/CreateBlog/CreateBlog.jsx";
import Project from "./Routes/Projects/Project.jsx";
import About from "./Routes/About/About.jsx";
import Login from "./Auth/login/Login.jsx";
import Signup from "./Auth/signup/Signup.jsx";
import EmailVerify from "./Auth/emailverify/EmailVerify.jsx";
import Profile from "./Routes/Profile/Profile.jsx";
import SpecificBlog from "./Routes/SpecificBlog/SpecificBlog.jsx";
import UpdateBlog from "./Routes/UpdateBlog/UpdateBlog.jsx";
import NewsLetter from "./Routes/NewsLetter/NewsLetter.jsx";
import ForgotPassword from "./Auth/forgot-password/ForgotPassword.jsx";
import ResetPassword from "./Auth/reset-password/ResetPassword.jsx";
import Styles from "./App.module.css";

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const App = () => {
  const darkMode = useSelector(selectDarkMode);
  const JWT_TOKEN = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const fetchData = async () => {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const url = `${apiUrl}/users/profile`;
    // Make the GET request to the API
    const { data: res } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    });
    setUser(res.user);
    // console.log(res.user.image);
  };
  JWT_TOKEN &&
    useEffect(() => {
      fetchData();
    }, []);

  return (
    <Router>
      <div
        className={`${Styles.container} ${
          darkMode ? Styles.dark : Styles.light
        }`}
      >
        {JWT_TOKEN && <Navbar />}
        <Wrapper>
          <Routes>
            {JWT_TOKEN ? (
              <>
                <Route path="/" element={<Blog user={user} />} />
                <Route path="/projects" element={<Project />} />
                <Route path="/about" element={<About />} />
                <Route path="/create-post" element={<CreateBlog />} />
                <Route path="/profile" element={<Profile user={user} />} />
                <Route
                  path="/specific-blog/:postId"
                  element={<SpecificBlog />}
                />
                <Route path="/update-post/:postId" element={<UpdateBlog />} />
                <Route path="/newsletter" element={<NewsLetter />} />
              </>
            ) : (
              <>
                <Route path="/signup" exact element={<Signup />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/" element={<Navigate replace to="/login" />} />
                <Route
                  path="/users/:id/verify/:token"
                  element={<EmailVerify />}
                />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  path="/users/:id/reset-password/:token"
                  element={<ResetPassword />}
                />
              </>
            )}
          </Routes>
        </Wrapper>
      </div>
    </Router>
  );
};

export default App;
