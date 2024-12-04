import { toast } from "react-toastify";

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

// Check if the authenticated user is authorized to perform the action
const AuthUser = (blog) => {
  console.log( blog);
  if (loggedInUserId !== blog.userId._id) {
    toast.error("You are not authorized to perform this action.", {
      position: "top-right",
      autoClose: 3000,
    });
    return false;
  }
  return true;
};

export { handleAuthCheck, AuthUser };
