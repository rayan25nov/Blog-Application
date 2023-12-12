import React, { useState } from "react";
import styles from "./CreatePost.module.css";

const CreatePost = () => {
  // State hooks for the post title, content, and image
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the input fields
    if (!title || !content || !image) {
      alert("Please fill in all the fields");
      return;
    }
    // Create a new post object
    const newPost = {
      title,
      content,
      image,
    };
    // Send the post object to the backend using fetch API
    fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => {
        // Display a success message
        alert("Post created successfully");
        // Clear the input fields
        setTitle("");
        setContent("");
        setImage(null);
      })
      .catch((error) => {
        // Display an error message
        alert("Something went wrong");
        console.error(error);
      });
  };

  // Function to handle the image upload
  const handleImageUpload = (e) => {
    // Get the selected file from the input element
    const file = e.target.files[0];
    // Validate the file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }
    // Create a new FileReader object
    const reader = new FileReader();
    // Set the onload event handler
    reader.onload = (e) => {
      // Set the image state to the base64 encoded data URL
      setImage(e.target.result);
    };
    // Read the file as a data URL
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
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
    </div>
  );
};

export default CreatePost;
