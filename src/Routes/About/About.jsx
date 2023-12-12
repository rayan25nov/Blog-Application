import React from "react";
import styles from "./About.module.css";
import Github from "../../assets/images/github.png";
import LinkedIn from "../../assets/images/linkedin.png";
import Email from "../../assets/images/email.png";

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.blog_container}>
        <hr />
        <h1 className={styles.heading}>Rayan Ahmad</h1>
        <hr />
        <div className={styles.image}></div>
        <h2 className={styles.caption}>About me</h2>
        <p className={styles.para}>
          I am a Full Stack web developer and a B.Tech student at the University
          of Kalyani. I have learned various technologies like HTML, CSS,
          JavaScript, React, MongoDB, Express.js, Node.js, Git, GitHub, Postman,
          Java, and C/C++. I am working on a web application that I will deploy
          on Vercel and share the code on GitHub soon. I have a strong academic
          background with 78.6% marks in senior secondary and 9.0 CGPA in
          secondary. I am eager to learn new skills and apply them in real-world
          projects
        </p>
        <div>
          <h2 className={styles.caption}>Skills</h2>
          <ul className={styles.list}>
            <li>Front-end Development: HTML, CSS JavaScript, React.js</li>
            <li>Back-end Development: Node.js Express.js</li>
            <li>Database: MongoDB, MySQL, SQL</li>
            <li>
              API Development and Consumption: Experience with creating RESTful
              APIs
            </li>
            <li>Version Control: Git & GitHub</li>
            <li>Development Tools: Postman for API testing</li>
            <li>Programming Languages: Java, C/C++</li>
            <li>
              Project Management: Developed applications like a URL Shortener,
              Weather Application, and Movie Overview App
            </li>
            <li>
              Collaboration and Communication: Experience working with
              cross-functional teams Strong communication and collaboration
              skills
            </li>
          </ul>
        </div>
        <h2 className={styles.caption}>Education</h2>
        <ul className={styles.list}>
          <li>
            Bachelor's Degree from University of Kalyani Expected Jun 2024
          </li>
          <li>
            Higher Secondary Education from Krishnanand Memorial Academy with
            78.6%
          </li>
          <li>Secondary Education from New Era Public School with 9.0 CGPA</li>
        </ul>

        <div className={styles.link_section}>
          <a href="https://github.com/rayan25nov/" target="_blank">
            <img src={Github} alt="GitHub" className={styles.link_icon} />
          </a>
          <a
            href="https://www.linkedin.com/in/rayan-ahmad-25nov/"
            target="_blank"
          >
            <img src={LinkedIn} alt="LinkedIn" className={styles.link_icon} />
          </a>
          <a href="mailto:rayanku24@gmail.com">
            <img src={Email} alt="Email" className={styles.link_icon} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
