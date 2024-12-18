import React from "react";
import styles from "./ProjectCard.module.css";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../Features/ToggleModeSlice";

const ProjectCard = ({ project }) => {
  const darkMode = useSelector(selectDarkMode);
  return (
    <div
      className={`${styles.project_card} ${
        darkMode ? styles.dark : styles.light
      }`}
    >
      <img
        src={project.image}
        alt={project.title}
        className={styles.project_image}
      />
      <div className={styles.project_overlay}>
        <h3 className={styles.project_title}>{project.title}</h3>
        <p className={styles.project_description}>{project.shortDescription}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
