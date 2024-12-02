import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../Features/ToggleModeSlice";
import Card from "../Card/Card";
import styles from "./Blog.module.css";
import { Link } from "react-router-dom";
import Loader from "../../loader/Loader";
import axios from "axios";
import { handleAuthCheck } from "../../utils/AuthCheck.js";

// ... (imports and other code)

const Blog = (props) => {
  const darkMode = useSelector(selectDarkMode);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [postsPerPage] = useState(10);
  const [loading, setLoading] = useState(true); // Add loading state
  const JWT_TOKEN = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
      const url = `${apiUrl}/posts?page=${currentPage}&pageSize=${postsPerPage}`;
      const { data: res } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      });

      const fetchedPosts = res.posts;
      const totalPages = res.totalPages;

      setPosts(fetchedPosts);
      setTotalPages(totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <div>
      {loading && (
        <div
          className={`${styles.loading} ${
            darkMode ? styles.dark : styles.light
          }`}
        >
          <p>Loading...</p>
          <Loader />
        </div>
      )}
      <div
        className={`${styles.container} ${
          darkMode ? styles.dark : styles.light
        }`}
      >
        {!loading && (
          // Render content once data is fetched
          <>
            <hr />
            <div className={styles.hero_section}>
              <h1 className={styles.heading}>THE BLOG</h1>
              {props.user && (
                <Link to={"/profile"}>
                  <img
                    src={props.user?.image}
                    alt="Hero icon"
                    className={styles.hero}
                  />
                </Link>
              )}
            </div>
            <hr />

            <div className={styles.link_container}>
              <Link
                onClick={(e) => {
                  if (!handleAuthCheck(JWT_TOKEN)) e.preventDefault();
                }}
                to="/create-post"
                className={styles.link}
              >
                Create Blog
              </Link>
            </div>
            <p className={styles.para}>All blog posts</p>
            <div className={styles.blogs_container}>
              {posts.map((post) => (
                <div key={post._id}>
                  <Card
                    title={post.title}
                    description={post.description}
                    imageUrl={post.image}
                    date={post.createdAt}
                    postId={post._id}
                  />
                </div>
              ))}
            </div>
            <div className={styles.pagination}>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>{currentPage}</span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;

// right now i'm showing login sigin page as landing page but i want to change that to landing page Blog so that user can see all blogs but just as they try to create blog or try to comment or like on a post tell them to sigin or signup because many people don't want to give their credentials first:
