import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../Features/ToggleModeSlice";
import Card from "../Card/Card";
import styles from "./Blog.module.css";
import { Link } from "react-router-dom";
import { selectBlog } from "../../Features/BlogSlice";
import Loader from "../../loader/Loader"; // Assuming you have a Loader component
import { handleAuthCheck } from "../../utils/AuthCheck.js";

const Blog = (props) => {
  const darkMode = useSelector(selectDarkMode);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPosts, setCurrentPosts] = useState([]); // Current page posts
  const [totalPages, setTotalPages] = useState(1);
  const JWT_TOKEN = localStorage.getItem("token");

  const posts = useSelector(selectBlog);

  // Update currentPosts and totalPages whenever `posts` changes
  useEffect(() => {
    if (posts?.length > 0) {
      setTotalPages(Math.ceil(posts.length / postsPerPage));
      const startIndex = (currentPage - 1) * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      setCurrentPosts(posts.slice(startIndex, endIndex));
      setLoading(false); // Data loaded
    } else {
      setLoading(true); // No data, show loader
    }
  }, [posts, currentPage, postsPerPage]);

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
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

      {loading ? (
        <div className={styles.blogs_container}>
          <Loader />
        </div>
      ) : (
        <>
          <div className={styles.blogs_container}>
            {currentPosts.map((post) => (
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
          {/* Pagination */}
          <div className={styles.pagination}>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Blog;
