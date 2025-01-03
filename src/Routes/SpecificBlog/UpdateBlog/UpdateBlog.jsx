import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { selectDarkMode } from "../../../Features/ToggleModeSlice";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./UpdateBlog.module.css";

const UpdateBlog = () => {
  const darkMode = useSelector(selectDarkMode);
  // State hooks for the post title, description, and image
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [readImg, setReadImg] = useState(null);

  const { postId } = useParams();
  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Form Data
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

      // API URL
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
      const url = `${apiUrl}/posts/${postId}`;
      const JWT_TOKEN = localStorage.getItem("token");

      // Make the POST request to the API
      const { data: res } = await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      });
      console.log(res);
      // Reset the form
      setTitle("");
      setDescription("");
      setImage(null);
      setReadImg(null);
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // Reset the form
      setTitle("");
      setDescription("");
      setImage(null);
      setReadImg(null);
    }
  };

  // Function to handle the image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setReadImg(reader.result);
    };
    reader.readAsDataURL(file);
    setImage(file);
  };

  return (
    <div
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
      <h1 className={styles.heading}>Update Post</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="id">_id</label>
          <input type="text" id="id" value={postId} disabled />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">description</label>
          <textarea
            id="description"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="image">Image</label>
          <div>
            {readImg ? (
              <img
                src={readImg}
                alt="Uploaded image"
                className={styles.image}
              />
            ) : (
              <p className={styles.text}>No image uploaded</p>
            )}
          </div>
          <input
            type="file"
            id="image"
            required
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <div className={styles.formGroup}>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </div>
      </form>
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default UpdateBlog;
