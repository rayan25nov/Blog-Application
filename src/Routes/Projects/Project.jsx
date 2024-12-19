import React from "react";
import { useSelector } from "react-redux";
import { selectDarkMode } from "d:/Coding/Blog/blog-frontend/src/Features/ToggleModeSlice";
import styles from "./Project.module.css";
import projects from "d:/Coding/Blog/blog-frontend/src/Routes/Projects/ProjectData.json";

const Project = () => {
  const darkMode = useSelector(selectDarkMode);
  return (
    <div
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
      <hr />
      <h1 className={styles.heading}>PROJECTS</h1>
      <hr />
      <p className={styles.text}>List Project</p>
      <div className={styles.card_container}>
        {projects.map((project) => (
          <div key={project.id} className={styles.card}>
            <img src={project.brand} alt="Project Brand" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
