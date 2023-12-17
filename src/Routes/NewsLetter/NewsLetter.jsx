import React, { useState } from "react";
import styles from "./NewsLetter.module.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    // Implement your subscription logic here
    console.log(`Subscribed with email: ${email}`);
    // Clear the input field after subscribing
    setEmail("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.subscribeContainer}>
        <h2 className={styles.heading}>Subscribe to Our Newsletter</h2>
        <p className={styles.text}>
          Get the latest updates and blog posts delivered to your inbox.
        </p>
        <div className={styles.inputContainer}>
          <input
            type="email"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSubscribe} className={styles.button}>
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
