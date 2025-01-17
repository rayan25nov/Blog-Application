import React, { useMemo, useState } from "react";
import Cropper from "react-easy-crop";
import styles from "./EditProfile.module.css";
import Email from "../../assets/images/email.png";
import Camera from "../../assets/images/camera.svg";
import Eye from "../../assets/images/eye.svg";
import EyeOff from "../../assets/images/eye-off.svg";
import axios from "axios";
import countryList from "react-select-country-list";
import { toast } from "react-toastify";

const EditProfile = ({ user }) => {
  if (!user) {
    return <div>Loading...</div>;
  }
  const [profileImage, setProfileImage] = useState(user.image); // Current profile image
  const [selectedImage, setSelectedImage] = useState(null); // Image selected for cropping
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null); // Cropping area
  const [crop, setCrop] = useState({ x: 0, y: 0 }); // Crop position
  const [zoom, setZoom] = useState(1); // Zoom level
  const [isCropping, setIsCropping] = useState(false); // Toggle crop modal
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  const [gender, setGender] = useState(user.gender ? user.gender : "");
  const [country, setCountry] = useState(user.country ? user.country : "");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const uploadImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result); // Set selected image for cropping
          setIsCropping(true); // Open cropping modal
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels); // Save cropping area details
  };

  const cropImage = async () => {
    if (!selectedImage || !croppedAreaPixels) return;

    const image = await createCroppedImage(selectedImage, croppedAreaPixels);
    setProfileImage(image); // Update profile image
    setIsCropping(false); // Close cropping modal
    setSelectedImage(null); // Clear selected image
  };

  const createCroppedImage = (imageSrc, croppedAreaPixels) => {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );

        resolve(canvas.toDataURL("image/jpeg")); // Return cropped image as base64
      };
    });
  };

  const cancelCropping = () => {
    setIsCropping(false); // Close cropping modal without saving changes
    setSelectedImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const date = new Date(Date.now()).toDateString();
  const createdAt = new Date(user.createdAt).toDateString();
  const options = useMemo(() => countryList().getData(), []);
  const handleCountryInput = (e) => {
    const userInput = e.target.value;
    setCountry(userInput);

    if (userInput.trim() === "") {
      setFilteredCountries([]);
      return;
    }

    // Filter city names based on user input
    const suggestions = options.filter((name) =>
      name.label.toLowerCase().startsWith(userInput.toLowerCase())
    );

    setFilteredCountries(suggestions);
  };

  const base64ToFile = (base64, filename) => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const updateProfileHandler = async () => {
    console.log(name, email, password, gender, country);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const JWT_TOKEN = localStorage.getItem("token");
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("country", country);
      formData.append("gender", gender);
      if (
        password.trim() === "" ||
        name.trim() === "" ||
        email.trim() === "" ||
        country.trim() === "" ||
        gender.trim() === ""
      ) {
        toast.error("All Fields are required");
        return;
      }
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }

      // Convert profileImage (base64) to File
      if (profileImage.startsWith("data:image")) {
        const file = base64ToFile(profileImage, "profile.jpg");
        formData.append("image", file);
      }

      const { data: res } = await axios.put(
        `${apiUrl}/users/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Error updating profile");
      console.error("Error while updating user data:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <header className={styles.header}>
          <h1>Welcome, {user.name}</h1>
          <p>{date}</p>
        </header>
        <div className={styles.border}></div>
        <main className={styles.main}>
          <div className={styles.profileHeader}>
            <div className={styles.profileIcon}>
              <img
                src={profileImage}
                alt="Profile"
                className={styles.profileImage}
              />
              <img
                src={Camera}
                alt="Camera"
                className={styles.camera}
                onClick={uploadImage}
              />
            </div>
            <div>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
            <button
              className={styles.editButton}
              onClick={updateProfileHandler}
            >
              Edit
            </button>
          </div>
          <div className={styles.profileDetails}>
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Your First Name"
                value={name}
                onChange={(e) => setName(e.target.value)} // Fix here
                required={true}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="text"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Fix here
                required={true}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Password</label>
              <div className={styles.passwordInput}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={true}
                />
                <img
                  src={showPassword ? EyeOff : Eye}
                  alt="toggle password visibility"
                  onClick={togglePasswordVisibility}
                  className={styles.togglePassword}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Gender</label>
              <div className={styles.customSelect}>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)} // Update gender state
                  required={true}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Country</label>
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={handleCountryInput}
                required={true}
              />
              {filteredCountries.length > 0 && (
                <ul className={styles.suggestionsList}>
                  {filteredCountries.map((name, index) => (
                    <li
                      key={index}
                      className={styles.suggestionItem}
                      // Update country state on click also reset suggestions
                      onClick={() => {
                        setCountry(name.label);
                        setFilteredCountries([]);
                      }}
                    >
                      {name.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className={styles.emailSection}>
            <h3>My Email Address</h3>
            <div className={styles.emailDetails}>
              <div className={styles.emailIcon}>
                <img
                  src={Email}
                  alt="Profile"
                  className={styles.profileImage}
                />
              </div>
              <div>
                <p>{user.email}</p>
                <p>{createdAt}</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Crop Modal */}
      {isCropping && (
        <div className={styles.cropModal}>
          <div className={styles.cropContainer}>
            <div className={styles.cropArea}>
              <Cropper
                image={selectedImage}
                crop={crop}
                zoom={zoom}
                aspect={1} // Square aspect ratio
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className={styles.cropActions}>
              <button onClick={cancelCropping} className={styles.cancelButton}>
                Cancel
              </button>
              <button onClick={cropImage} className={styles.saveButton}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
