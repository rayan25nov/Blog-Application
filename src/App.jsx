import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setBlogs, selectBlog } from "./Features/BlogSlice";
import axios from "axios";
import Navbar from "./Navbar/Navbar";
import Blog from "./Routes/Blog/Blog";
import CreateBlog from "./Routes/CreateBlog/CreateBlog";
import Project from "./Routes/Projects/Project";
import About from "./Routes/About/About";
import Login from "./Auth/login/Login";
import Signup from "./Auth/signup/Signup";
import EmailVerify from "./Auth/emailverify/EmailVerify";
import Profile from "./Routes/Profile/Profile";
import SpecificBlog from "./Routes/SpecificBlog/SpecificBlog";
import UpdateBlog from "./Routes/SpecificBlog/UpdateBlog/UpdateBlog";
import NewsLetter from "./Routes/NewsLetter/NewsLetter";
import ForgotPassword from "./Auth/forgot-password/ForgotPassword";
import ResetPassword from "./Auth/reset-password/ResetPassword";
import Styles from "./App.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectDarkMode } from "./Features/ToggleModeSlice";

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
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const blogs = useSelector(selectBlog); // Access blogs from Redux state
  const [shouldFetchBlogs, setShouldFetchBlogs] = useState(true); // Track if blogs need to be fetched

  const fetchUserData = async () => {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    try {
      const { data: res } = await axios.get(`${apiUrl}/users/profile`, {
        headers: { Authorization: `Bearer ${JWT_TOKEN}` },
      });
      setUser(res.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchAllBlogs = async () => {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    try {
      const { data: res } = await axios.get(`${apiUrl}/posts`);
      if (JSON.stringify(blogs) !== JSON.stringify(res.posts)) {
        // Update blogs only if they have changed
        dispatch(setBlogs(res.posts));
        setShouldFetchBlogs(false); // Mark fetch as done
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  useEffect(() => {
    if (JWT_TOKEN) fetchUserData();
    if (shouldFetchBlogs) fetchAllBlogs();
  }, [JWT_TOKEN, shouldFetchBlogs]);

  return (
    <Router>
      <div
        className={`${Styles.container} ${
          darkMode ? Styles.dark : Styles.light
        }`}
      >
        <Navbar user={user} />
        <Wrapper>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Blog />} />
            <Route path="/projects" element={<Project />} />
            <Route path="/about" element={<About />} />
            <Route path="/specific-blog/:postId" element={<SpecificBlog />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
            <Route
              path="/users/:id/reset-password/:token"
              element={<ResetPassword />}
            />

            {/* Protected Routes */}
            {JWT_TOKEN ? (
              <>
                <Route path="/create-post" element={<CreateBlog />} />
                <Route path="/profile" element={<Profile user={user} />} />
                <Route path="/update-post/:postId" element={<UpdateBlog />} />
                <Route path="/newsletter" element={<NewsLetter />} />
              </>
            ) : (
              <Route path="*" element={<Navigate replace to="/login" />} />
            )}
          </Routes>
        </Wrapper>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
