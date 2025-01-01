import React from "react";
import styles from "./Project.module.css";
import projects from "./ProjectData.json";
import {Link} from "react-router-dom";

const Project = () => {
  return (
    <div className={`${styles.container}`}>
      <hr />
      <h1 className={styles.heading}>PROJECTS</h1>
      <hr />
      <p className={styles.text}>List Project</p>
      <div className={styles.card_container}>
        {projects.map((project) => (
          <Link
            to={`/specific-project/${project.id}`}
            key={project.id}
            className={styles.card}
          >
            <img src={project.brand} alt="Project Brand" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Project;
