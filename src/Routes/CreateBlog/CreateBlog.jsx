import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../UpdateBlog/UpdateBlog.module.css";

const CreateBlog = () => {
  
  // State hooks for the post title, description, and image
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Form Data
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);
      // Generate the current date in the desired format
      const createdAt = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "short",
        day: "2-digit",
      });

      // Append the createdAt field to the form data
      formData.append("createdAt", createdAt);
      // API URL
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
      const url = `${apiUrl}/posts/create`;
      const JWT_TOKEN = localStorage.getItem("token");

      // Make the POST request to the API
      const { data: res } = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      });
      // console.log(res);
      // Reset the form
      setTitle("");
      setDescription("");
      setImage(null);

      // Display success notification
      toast.success("Post created successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.log(error);
      // Display error notification
      toast.error("Error creating post", {
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
    }
  };

  // Function to handle the image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }
    setImage(file);
  };

  return (
    <div className={styles.container}>
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
            {image ? (
              <img src={image} alt="Uploaded image" className={styles.image} />
            ) : (
              <p>No image uploaded</p>
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

export default CreateBlog;
