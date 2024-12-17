import React from "react";
import styles from "./ProjectCard.module.css";

const ProjectCard = () => {
  return (
    <div className={styles.project_card}>
      <img src={project.image} alt={project.title} />
      <div className={styles.project_info}>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
