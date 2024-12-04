import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../Features/ToggleModeSlice";
import styles from "./Card.module.css";

const truncate = (str) => {
  const limit = 400;
  if (str.length > limit) {
    return str.slice(0, limit) + "...";
  }
  return str;
};

const BlogCard = (props) => {
  const darkMode = useSelector(selectDarkMode);
  const { title, description, imageUrl, date, postId, github, vercel } =
    props;
  return (
    <div
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
      {postId && (
        <div className={styles.blog}>
          <Link to={`/specific-blog/${postId}`}>
            <img src={imageUrl} alt="Blog Image" className={styles.img} />
            {date ? <p className={styles.date}>{date}</p> : null}
            <h2 className={styles.blogHeading}>{title}</h2>
            <p className={styles.blogDescription}>{truncate(description)}</p>
          </Link>
        </div>
      )}
      {github && vercel && (
        <div className={styles.blog}>
          <img src={imageUrl} alt="Blog Image" className={styles.img} />
          {date ? <p className={styles.date}>{date}</p> : null}
          <h2 className={styles.blogHeading}>{title}</h2>
          <p className={styles.blogDescription}>{truncate(description)}</p>
          <div className={styles.links}>
            <a className={styles.link} href={github} target="_blank">
              Github Code
            </a>
            <a className={styles.link} href={vercel} target="_blank">
              Live
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
