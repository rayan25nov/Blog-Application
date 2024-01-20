import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../loader/Loader";
import ForgotPasswordImg from "../../assets/images/forgot-password.jpg";
import styles from "./ForgotPassword.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(null);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setMsg("");
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
      const url = `${apiUrl}/users/forgot-password`;
      const { data: res } = await axios.post(url, { email });
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
    <div className={styles.forgot_password_container}>
      <form onSubmit={handleForgotPassword} className={styles.form_container}>
        <img src={ForgotPasswordImg} alt="reset" className={styles.reset_img} />
        <h1>Forgot Password</h1>
        <p>Don't worry, it happens to the best of us.</p>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <div className={styles.msg}>
          {error && <div className={styles.error_msg}>{error}</div>}
          {msg && <div className={styles.success_msg}>{msg}</div>}
          {loading && <Loader />}
        </div>
        <button type="submit" className={styles.green_btn}>
          Reset Password
        </button>
        <div className={styles.login}>
          <Link to="/login">Back to Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
