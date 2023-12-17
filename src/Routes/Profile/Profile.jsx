import React from "react";
import BlogCard from "../Card/BlogCard";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../Features/ToggleModeSlice";
import styles from "./Profile.module.css";

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
        <h1 className={styles.profile_name}>{props.user.name}</h1>
        <p className={styles.profile_email}>Email: {props.user.email}</p>
        <p className={styles.profile_role}>Role: {props.user.role}</p>
        <p className={styles.profile_verified}>
          {props.user.verified ? "Verified" : "Not verified"}
        </p>
        <img
          src={props.user.image}
          alt={props.user.name}
          className={styles.profile_image}
        />
      </div>
      <div className={styles.profile_posts}>
        <h2 className={styles.profile_posts_title}>Posts</h2>
        {props.user.posts &&
          props.user.posts.map((post) => (
            <div key={post._id}>
              <BlogCard
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
