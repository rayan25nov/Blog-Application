import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Comments.module.css";
import deleteImage from "../../assets/images/delete.png";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../Features/ToggleModeSlice";

const Comments = ({ postId }) => {
  const darkMode = useSelector(selectDarkMode);

  const [triggerFetch, setTriggerFetch] = useState(false);
  const [allComments, SetAllComments] = useState([]);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");
  const JWT_TOKEN = localStorage.getItem("token");
  const data = {
    comment: comment,
  };
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  // Function to Post Comment on a Specific Blog
  const postComment = async () => {
    console.log("clicked");
    const url = `${apiUrl}/posts/comment/${postId}`;
    // Make the PUT request to the API
    const { data: res } = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    });
    console.log(res);
    // Trigger the effect to fetch comments again
    setTriggerFetch(!triggerFetch);
    setComment("");
  };

  // Function to Fetch All Comments
  const fetchComments = async () => {
    const url = `${apiUrl}/posts/comment/${postId}`;
    // Make the GET request to the API
    const { data: res } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    });
    // console.log(res.comments);
    SetAllComments(res.comments);
    setUserName(res.name);
  };

  // Function to Delete a Specific Comment
  const deleteComment = async (commentId) => {
    const url = `${apiUrl}/posts/comment/${postId}/${commentId}`;
    // Make the DELETE request to the API
    const { data: res } = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    });
    // Trigger the effect to fetch comments again
    setTriggerFetch(!triggerFetch);
  };

  // Calling Fetch comment
  useEffect(() => {
    fetchComments();
    // Reset the trigger after fetching comments
    setTriggerFetch(false);
  }, [triggerFetch]);

  return (
    <div
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
      <div className={styles.comment_container}>
        <h2 className={styles.heading}>Discussion ({allComments.length})</h2>
        <div className={styles.create_comment}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <button onClick={postComment}>Post comment</button>
        </div>
      </div>
      {allComments.map((comment) => (
        <div className={styles.comment} key={comment._id}>
          <p>{userName}</p>
          <p className={styles.date}>
            {comment.date ? comment.date : "25-Dec-2023"}
          </p>
          <h4>{comment.comment}</h4>
          <div
            onClick={() => deleteComment(comment._id)}
            className={styles.deleteComment}
          >
            <img src={deleteImage} alt="Freepik" width={"30px"} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
