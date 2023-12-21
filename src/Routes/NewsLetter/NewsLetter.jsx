import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import axios from "axios";
import { selectDarkMode } from "../../Features/ToggleModeSlice";
import { useSelector } from "react-redux";
import styles from "./NewsLetter.module.css";

const Newsletter = () => {
  const darkMode = useSelector(selectDarkMode);
  const [articles, setArticles] = useState([]);
  const apiKey = import.meta.env.VITE_REACT_APP_NEWS_API;
  const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
  const fetchData = async () => {
    const { data: res } = await axios.get(url);
    console.log(res.articles);
    setArticles(res.articles);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    // Implement your subscription logic here
    console.log(`Subscribed with email: ${email}`);
    // Clear the input field after subscribing
    setEmail("");
  };

  return (
    <div
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
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
        <p></p>
      </div>
      <div className={styles.newscards}>
        {articles.map((article) => (
          <NewsCard
            key={article.url}
            name={article.source.name}
            author={article.author}
            title={article.title}
            description={article.description}
            image={article.urlToImage}
            url={article.url}
          />
        ))}
      </div>
    </div>
  );
};

export default Newsletter;
