import React from "react";
import { Link } from "react-router-dom";
import mountain from "../../assets/images/mountain.jpg";
import wireframe from "../../assets/images/wireframe.png";
import meeting from "../../assets/images/meeting.png";
import styles from "./BlogCard.module.css";

const BlogCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.blog}>
        <Link to={"/"}>
          <img src={mountain} alt="Mountain Image" className={styles.img} />
          <p className={styles.date}>07/12/2023</p>
          <h2 className={styles.blogHeading}>Mountain are very big Rocks</h2>
          <p className={styles.blogDescription}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum
            quaerat consectetur autem dolorum doloremque! Velit repudiandae
            necessitatibus nobis. Ad, ea!
          </p>
        </Link>
      </div>
      <div className={styles.blog}>
        <Link to={"/"}>
          <img src={wireframe} alt="wireframe" className={styles.img} />
          <p className={styles.date}>01/12/2023</p>
          <h2 className={styles.blogHeading}>Wireframe are Essential.</h2>
          <p className={styles.blogDescription}>
            Wireframe is a design tool for creating wireframes for websites,
            apps, and other digital products. It is a popular tool for creating
            mockups and prototypes for websites, apps, and other digital
            products. Wireframe is a design tool for creating wireframes for
            websites, apps, and other digital products.
          </p>
        </Link>
      </div>
      <div className={styles.blog}>
        <Link to={"/"}>
          <img src={meeting} alt="Meeting Image" className={styles.img} />
          <p className={styles.date}>05/09/2023</p>
          <h2 className={styles.blogHeading}>
            Meeting is a way of Communication.
          </h2>
          <p className={styles.blogDescription}>
            They allow people to share information, ideas, opinions, and
            feedback in a timely and effective manner. They foster
            collaboration, teamwork, and creativity among participants, and help
            them solve problems and make decisions together. They enhance
            communication, trust, and rapport among people, and help them build
            relationships and networks.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
