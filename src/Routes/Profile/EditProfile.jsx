import React from "react";
import styles from "./EditProfile.module.css";
import Email from "../../assets/images/email.png";

const EditProfile = ({ user }) => {
  if (!user) {
    return <div>Loading...</div>;
  }
  console.log(user);

  const date = new Date(Date.now()).toDateString();
  const createdAt = new Date(user.createdAt).toDateString();
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <header className={styles.header}>
          <h1>Welcome, {user.name}</h1>
          <p>{date}</p>
        </header>
        <div className={styles.border}></div>
        <main className={styles.main}>
          <div className={styles.profileHeader}>
            <img
              src={user.image}
              alt="Profile"
              className={styles.profileImage}
            />
            <div>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
            <button className={styles.editButton}>Edit</button>
          </div>
          <div className={styles.profileDetails}>
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input type="text" placeholder="Your First Name" />
            </div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input type="text" placeholder="Your Email" />
            </div>
            <div className={styles.formGroup}>
              <label>Gender</label>
              <input type="text" placeholder="Your Gender" />
            </div>
            <div className={styles.formGroup}>
              <label>Country</label>
              <input type="text" placeholder="Country" />
            </div>
            <div className={styles.formGroup}>
              <label>Language</label>
              <input type="text" placeholder="Language" />
            </div>
          </div>
          <div className={styles.emailSection}>
            <h3>My Email Address</h3>
            <div className={styles.emailDetails}>
              <div className={styles.emailIcon}>
                <img
                  src={Email}
                  alt="Profile"
                  className={styles.profileImage}
                />
              </div>
              <div>
                <p>{user.email}</p>
                <p>{createdAt}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditProfile;
