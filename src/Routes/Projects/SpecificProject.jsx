import React from "react";
import styles from "./SpecificProject.module.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import projects from "./ProjectData.json";
import rightArrow from "../../assets/images/right-arrow.svg";
import { selectDarkMode } from "../../Features/ToggleModeSlice";
import { useSelector } from "react-redux";

const SpecificProject = () => {
  const darkMode = useSelector(selectDarkMode);
  const { id } = useParams();
  const project = projects.find((project) => project.id === id);
  return (
    <div
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
      <h2 className={styles.h2}>{project.title}</h2>
      <p className={styles.sd}>{project.shortDescription}</p>
      <img src={project.brand} alt="Project" className={styles.image} />
      <div className={styles.left}>
        <h2 className={styles.h2}>Description</h2>
        <p className={styles.p}>{project.description}</p>

        <h3>🔑 Key Features</h3>
        <ul>
          {project.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>

        <h3>⚙️ Tech Stack</h3>
        <ul>
          {project.techStack.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>

        <h3>✏️ Things I learned</h3>
        <ul>
          {project.learnings.map((learning, index) => (
            <li key={index}>{learning}</li>
          ))}
        </ul>
      </div>
      <div className={styles.right}>
        <h2 className={styles.h2}>Links</h2>
        <a
          href={project.vercel}
          target="_blank"
          rel="Vercel"
          className={styles.link}
        >
          <span>Demo</span>
          <img src={rightArrow} alt="rightArrow" />
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="github"
          className={styles.link}
        >
          <span>Code</span>
          <img src={rightArrow} alt="rightArrow" />
        </a>
        <h2 className={styles.h2}>Tools</h2>
        <div>
          {project.tools.map((tool, index) => (
            <span key={index} className={styles.tool}>
              <img src={tool.image} alt="Tools" />
              <p className={styles.p}>{tool.name}</p>
            </span>
          ))}
        </div>
        {project.videoId && (
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${project.videoId}`}
            title={project.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.video}
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default SpecificProject;
