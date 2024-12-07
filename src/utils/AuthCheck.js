import { toast } from "react-toastify";
import axios from "axios";

// Check if the user is authenticated
const handleAuthCheck = (JWT_TOKEN) => {
  if (!JWT_TOKEN) {
    toast.error("You need to sign in to perform this action.", {
      position: "top-right",
      autoClose: 3000,
    });
    return false;
  }
  return true;
};

const AuthUser = async (postId, apiUrl) => {
  // Retrieve the JWT token from localStorage
  const JWT_TOKEN = localStorage.getItem("token");
  if (!JWT_TOKEN) {
    throw new Error("No JWT token found");
  }
  const url = `${apiUrl}/posts/user/postId`;
  try {
    // Pass the token in the Authorization header
    const { data: res } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    });
    // Check if the postId exists in the user's authorized posts
    const postIds = res.postIds || [];
    // Ensure both are strings for comparison
    const isAuthorized = postIds.includes(postId.toString());
    return isAuthorized;
  } catch (error) {
    console.error("Authorization failed:", error);
    return false; // Not authorized
  }
};

export { handleAuthCheck, AuthUser };
