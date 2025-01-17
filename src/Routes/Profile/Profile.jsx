import React from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../Features/ToggleModeSlice";
import styles from "./Profile.module.css";
import { Link } from "react-router-dom";

const Profile = (props) => {
  const darkMode = useSelector(selectDarkMode);
  if (!props.user) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`${styles.profile} ${darkMode ? styles.dark : styles.light}`}
    >
      <div className={styles.user_description}>
        <img
          src={props.user.image}
          alt={props.user.name}
          className={styles.profile_image}
        />
        <h1 className={styles.profile_name}>{props.user.name}</h1>
        <p className={styles.profile_email}>Email: {props.user.email}</p>
        <p className={styles.profile_role}>Role: {props.user.role}</p>
        <p className={styles.profile_verified}>
          {props.user.verified ? "Verified" : "Not verified"}
        </p>
        <Link to={"/profile-edit"} className={styles.btn}>
          Update Profile
        </Link>
      </div>
      <div className={styles.profile_posts}>
        <h2 className={styles.profile_posts_title}>Posts</h2>
        {props.user.posts &&
          props.user.posts.map((post) => (
            <div key={post._id}>
              <Card
                title={post.title}
                description={post.description}
                imageUrl={post.image}
                date={post.createdAt.split("T")[0]}
                postId={post._id}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
