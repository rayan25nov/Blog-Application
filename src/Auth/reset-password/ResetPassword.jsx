import { useState } from "react";
import axios from "axios";
import Loader from "../../loader/Loader";
import { Link, useParams } from "react-router-dom";
import ResetPasswordImg from "../../assets/images/reset-password.jpg";
import styles from "./ResetPassword.module.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(null);

  const { id, token } = useParams();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      setError("Password and Confirm Password do not match");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
      const url = `${apiUrl}/users/${id}/reset-password/${token}`;

      // Send both password and confirm password in the request
      const { data: res } = await axios.post(url, {
        password,
        confirmPassword,
      });

      setMsg(res.message);
    } catch (err) {
      if (err.response && err.response.data && !err.response.data.success) {
        setError(err.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.reset_password_container}>
      <form onSubmit={handleResetPassword} className={styles.form_container}>
        <img src={ResetPasswordImg} alt="reset" className={styles.reset_img} />
        <h1>Reset Password</h1>
        <input
          type="password"
          placeholder="Enter your new password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className={styles.input}
        />
        {error && <div className={styles.error_msg}>{error}</div>}
        {msg && <div className={styles.success_msg}>{msg}</div>}
        {loading && <Loader />}
        {msg ? (
          <div className={styles.login}>
            <Link to="/login">Click here to Login</Link>
          </div>
        ) : (
          <button type="submit" className={styles.green_btn}>
            Save Password
          </button>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
