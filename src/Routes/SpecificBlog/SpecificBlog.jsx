import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../Features/ToggleModeSlice";
import { selectBlog } from "../../Features/BlogSlice";
import { toast } from "react-toastify";
import Comments from "../Comments/Comments";
import LikeButton from "../Likes/LikeButton";
import styles from "./SpecificBlog.module.css";
import { handleAuthCheck, AuthUser } from "../../utils/AuthCheck";
import axios from "axios";

const SpecificBlog = () => {
  const darkMode = useSelector(selectDarkMode);
  const posts = useSelector(selectBlog);
  const { postId } = useParams();
  const navigate = useNavigate();
  const JWT_TOKEN = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  // Ensure posts are available before trying to find the blog
  if (!posts) {
    return <div>Loading...</div>; // Show a loading message while posts are being fetched
  }

  const blog = posts?.find((post) => post._id === postId);

  const deletePost = async () => {
    if (!handleAuthCheck(JWT_TOKEN)) return;
    if (!AuthUser(blog)) return;

    try {
      const url = `${apiUrl}/posts/${postId}`;
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      });
      toast.success("Post deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "You're not Authorized to delete this post",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      console.error("Error deleting post:", error);
    }
  };

  const handleUpdateClick = async (e) => {
    if (!handleAuthCheck(JWT_TOKEN)) return;
    // Check authorization
    const isAuthorized = await AuthUser(postId, apiUrl);

    if (!isAuthorized) {
      toast.error("You are not authorized to perform this action.", {
        position: "top-right",
        autoClose: 3000,
      });
      return; // Don't navigate if not authorized
    }

    // Proceed with navigation if authorized
    navigate(`/update-post/${postId}`);
  };

  // If the blog is not found, navigate to home or show an error
  useEffect(() => {
    if (!blog) {
      toast.error("Blog not found.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/");
    }
  }, [blog, navigate]);

  if (!blog) {
    return null; // Prevent rendering if the blog is not found
  }

  return (
    <div
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
      <p className={styles.date}>{blog.createdAt}</p>
      <h1 className={styles.heading}>{blog.title}</h1>
      <img src={blog.image} alt="Blog" className={styles.image} />
      <p className={styles.description}>{blog.description}</p>

      <div className={styles.buttons}>
        <div className={styles.link} onClick={handleUpdateClick}>
          Update Post
        </div>
        <button className={styles.btn} onClick={deletePost}>
          Delete Post
        </button>
      </div>
      <LikeButton postId={postId} />
      <div className={styles.comment_section}>
        <Comments postId={postId} />
      </div>
    </div>
  );
};

export default SpecificBlog;
