import React, { useState, useEffect } from "react";
import axios from "axios";
import Like from "../../assets/images/like.png";
import Dislike from "../../assets/images/dislike.png";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../Features/ToggleModeSlice";
import styles from "./LikeButton.module.css";

const LikeButton = ({ postId }) => {
  const [likes, setLikes] = useState(0);
  const darkMode = useSelector(selectDarkMode);

  const JWT_TOKEN = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const getAllLikesUrl = `${apiUrl}/posts/likes/${postId}`;
  const likeUrl = `${apiUrl}/posts/like/${postId}`;
  const unlikeUrl = `${apiUrl}/posts/unlike/${postId}`;

  // Function to Fetch Likes from the API
  const fetchLikes = async () => {
    try {
      const { data: response } = await axios.get(getAllLikesUrl, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      });
      // console.log(response);
      setLikes(response.likes.length);
      // console.log(likes);
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };
  // Calling Fetch Likes Inside UseEffect Hook
  useEffect(() => {
    fetchLikes();
  }, [postId]);

  const handleLike = async () => {
    try {
      await axios.put(likeUrl, null, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      });
      setLikes((prevLikes) => prevLikes + 1);
    } catch (error) {
      console.error("Error liking post:", error);
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

  const handleUnlike = async () => {
    try {
      await axios.put(unlikeUrl, null, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      });
      setLikes((prevLikes) => prevLikes - 1);
    } catch (error) {
      console.error("Error unliking post:", error);
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
      <button onClick={handleLike} className={styles.button}>
        <img src={Like} alt="Md Tanvirul Haque" />
      </button>
      <span className={styles.likes}>
        {likes} {likes === 1 ? "like" : "likes"}
      </span>
      <button onClick={handleUnlike} className={styles.button}>
        <img src={Dislike} alt="Md Tanvirul Haque" />
      </button>
      <ToastContainer />
    </div>
  );
};

export default LikeButton;
