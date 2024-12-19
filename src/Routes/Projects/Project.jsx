import React from "react";
import styles from "./Project.module.css";
import projects from "./ProjectData.json";

const Project = () => {
  return (
    <div className={`${styles.container}`}>
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
