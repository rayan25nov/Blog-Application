import { toast } from "react-toastify";

const handleAuthCheck = (JWT_TOKEN) => {
  if (!JWT_TOKEN) {
    toast.error("You need to sign in to perform this action.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    return false;
  }
  return true;
};

export { handleAuthCheck };
