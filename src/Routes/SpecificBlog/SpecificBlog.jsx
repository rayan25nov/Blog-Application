import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../Features/ToggleModeSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Comments from "../Comments/Comments";
import LikeButton from "../Likes/LikeButton";
import Loader from "../../loader/Loader";
import styles from "./SpecificBlog.module.css";

const SpecificBlog = () => {
  const darkMode = useSelector(selectDarkMode);
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const { postId } = useParams();

  const navigate = useNavigate();
  const fetchPost = async () => {
    try {
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
      const url = `${apiUrl}/posts/${postId}`;
      const { data: res } = await axios.get(url);
      setBlog(res.post);
    } catch (error) {
      console.error("Error fetching post:", error);
      // Handle error fetching post (e.g., redirect to an error page)
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const deletePost = async () => {
    try {
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
      const url = `${apiUrl}/posts/${postId}`;
      const JWT_TOKEN = localStorage.getItem("token");
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      });
      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error(`${error.response?.data?.message || "An error occurred"}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // Show loading indicator while data is being fetched
  if (loading) {
    return (
      <div
        className={`${styles.loading} ${darkMode ? styles.dark : styles.light}`}
      >
        <p>Loading...</p>
        <Loader />
      </div>
    );
  }

  // Render the content once data is fetched
  return (
    <div
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
      <p className={styles.date}>{blog.createdAt}</p>
      <h1 className={styles.heading}>{blog.title}</h1>
      <img src={blog.image} alt="Blog Image" className={styles.image} />
      <p className={styles.description}>{blog.description}</p>

      <div className={styles.buttons}>
        <Link className={styles.link} to={`/update-post/${postId}`}>
          Update Post
        </Link>
        <button className={styles.btn} onClick={deletePost}>
          Delete Post
        </button>
      </div>
      <LikeButton postId={postId} />
      <div className={styles.comment_section}>
        <Comments postId={postId} />
      </div>
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default SpecificBlog;
