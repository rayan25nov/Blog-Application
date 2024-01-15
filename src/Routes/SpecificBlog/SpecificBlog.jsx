import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../Features/ToggleModeSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./SpecificBlog.module.css";
import Comments from "../Comments/Comments";

const SpecificBlog = () => {
  const darkMode = useSelector(selectDarkMode);
  const [blog, setBlog] = useState({});
  const { postId } = useParams();
  
  const navigate = useNavigate();
  const fetchPost = async () => {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const url = `${apiUrl}/posts/${postId}`;
    const { data: res } = await axios.get(url);
    setBlog(res.post);
    // console.log(res.post);
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
      toast.error(`${error.response.data.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
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
      <div className={styles.comment_section}>
        <Comments postId={postId} />
      </div>
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default SpecificBlog;
