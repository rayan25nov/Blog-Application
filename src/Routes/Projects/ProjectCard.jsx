import React from "react";
import styles from "./ProjectCard.module.css";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../Features/ToggleModeSlice";

const ProjectCard = (props) => {
  const darkMode = useSelector(selectDarkMode);
  return (
    <div
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
      <img className={styles.cardimg} src={props.cardimg} alt="project image" />
      <h2 className={styles.title}>{props.title}</h2>
      <p className={styles.description}>{props.description}</p>
      <div className={styles.links}>
        <a className={styles.link} href={props.github} target="_blank">
          Github Code
        </a>
        <a className={styles.link} href={props.vercel} target="_blank">
          Live
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
