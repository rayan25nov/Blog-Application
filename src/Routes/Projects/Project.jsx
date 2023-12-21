import React from "react";
import ProjectCard from "./ProjectCard";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../Features/ToggleModeSlice";
import styles from "./Project.module.css";
import projects from "./ProjectData.json";

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
          <div key={project.id}>
            <ProjectCard
              cardimg={project.image}
              title={project.title}
              description={project.description}
              github={project.github}
              vercel={project.vercel}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;