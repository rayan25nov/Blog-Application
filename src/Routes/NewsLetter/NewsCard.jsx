import React, { useEffect } from "react";
import styles from "./NewsCard.module.css";
import { selectDarkMode } from "../../Features/ToggleModeSlice";
import { useSelector } from "react-redux";

const NewsCard = (props) => {
  const { name, author, title, description, image, url } = props;
  const darkMode = useSelector(selectDarkMode);
  if (image === null) return;
  return (
    <div
      className={`${styles.newsCard} ${darkMode ? styles.dark : styles.light}`}
    >
      <img src={image} alt="image" />
      <div className={styles.newsCardText}>
        <p className={styles.text}>{author}</p>
        <p className={styles.text}>{name}</p>
        <h2 className={styles.heading}>{title}</h2>
        <p className={styles.text}>{description}</p>
        <a href={url} target="_blank" className={styles.link}>
          Read on official website
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
