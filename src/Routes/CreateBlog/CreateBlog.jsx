import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectDarkMode } from "../../Features/ToggleModeSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "../SpecificBlog/UpdateBlog/UpdateBlog.module.css";
import Loader from "../../loader/Loader"; // Assuming you have a Loader component
import { setBlogs, selectBlog } from "../../Features/BlogSlice.js";

const CreateBlog = () => {
  const darkMode = useSelector(selectDarkMode);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false); // Set initial loading state to false
  const [image, setImage] = useState(null);
  const [readImg, setReadImg] = useState(null);
  const navigate = useNavigate();
  const blogs = useSelector(selectBlog);
  const dispatch = useDispatch();

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader while post is being created

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

      const createdAt = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
      formData.append("createdAt", createdAt);

      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
      const url = `${apiUrl}/posts/create`;
      const JWT_TOKEN = localStorage.getItem("token");

      const { data: res } = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      });

      // Reset form fields
      setTitle("");
      setDescription("");
      setImage(null);
      setReadImg(null);

      // Display success notification
      toast.success("Post created successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // Dispatch directly after creating the blog
      dispatch(setBlogs([res.newPost, ...blogs]));
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Error creating post", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Reset form in case of an error
      setTitle("");
      setDescription("");
      setImage(null);
      setReadImg(null);
    } finally {
      setLoading(false); // Hide loader after the process completes (either success or failure)
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
      {loading && (
        <div>
          <p className={styles.text}>Creating Post...</p>
          <Loader />
        </div>
      )}
      {/* Show loader if loading is true */}
      {!loading && (
        <>
          <h1 className={styles.heading}>Create Blog</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
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
              <label htmlFor="description">Description</label>
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
        </>
      )}
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default CreateBlog;
