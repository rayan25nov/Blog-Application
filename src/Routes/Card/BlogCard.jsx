import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../Features/ToggleModeSlice";
import styles from "./BlogCard.module.css";

const truncate = (str) => {
  const limit = 400;
  if (str.length > limit) {
    return str.slice(0, limit) + "...";
  }
  return str;
};

const BlogCard = (props) => {
  const darkMode = useSelector(selectDarkMode);
  const { title, description, imageUrl, date, postId } = props;
  return (
    <div
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
      <div className={styles.blog}>
        <Link to={`/specific-blog/${postId}`}>
          <img src={imageUrl} alt="Blog Image" className={styles.img} />
          <p className={styles.date}>{date ? date : Date.now()}</p>
          <h2 className={styles.blogHeading}>{title}</h2>
          <p className={styles.blogDescription}>{truncate(description)}</p>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
