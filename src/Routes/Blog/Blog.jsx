import React from "react";
import BlogCard from "./BlogCard";
import styles from "./Blog.module.css";

const Blog = () => {
  return (
    <div className={styles.container}>
      <hr />
      <h1 className={styles.heading}>THE BLOG</h1>
      <hr />
      <p className={styles.para}>All blog posts</p>
      <BlogCard />
    </div>
  );
};

export default Blog;
