import React, { useState } from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ totalCount, pageSize, onPageChange }) => {
  const pageCount = Math.ceil(totalCount / pageSize);

  const pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
    onPageChange(currentPage + 1);
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? styles.active : styles.button}
          onClick={() => handleClick(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={styles.button}
        onClick={handleNext}
        disabled={currentPage === pageCount}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
