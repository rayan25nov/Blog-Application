import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../Features/ToggleModeSlice";
import BlogCard from "../Card/BlogCard";
import styles from "./Blog.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Blog = (props) => {
  const darkMode = useSelector(selectDarkMode);
  const [posts, setPosts] = useState([]);
  // fetch blog related data
  const fetchData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
      const url = `${apiUrl}/posts`;
      const JWT_TOKEN = localStorage.getItem("token");
      // Correct the typo in the header name from "Authorisation" to "Authorization"
      const { data: res } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      });
      const posts = res.posts;
      console.log(posts);
      setPosts(posts);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
      <hr />
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>THE BLOG</h1>
        <Link to={"/profile"}>
          <img src={props.user.image} alt="Hero icon" className={styles.hero} />
        </Link>
      </div>
      <hr />
      <div className={styles.link_container}>
        <Link to="/create-post" className={styles.link}>
          Create Blog
        </Link>
      </div>
      <p className={styles.para}>All blog posts</p>
      <div className={styles.blogs_container}>
        {posts.map((post) => (
          <div key={post._id}>
            <BlogCard
              title={post.title}
              description={post.description}
              imageUrl={post.image}
              date={post.createdAt}
              postId={post._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
