import React from "react";
import BlogCard from "./BlogCard";
import styles from "./Blog.module.css";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <div className={styles.container}>
      <hr />
      <h1 className={styles.heading}>THE BLOG</h1>
      <hr />
      <div className={styles.link_container}>
        <Link to="/create-post" className={styles.link}>
          Create Post
        </Link>
      </div>
      <p className={styles.para}>All blog posts</p>
      <BlogCard />
    </div>
  );
};

export default Blog;
