import React, { useState } from "react";
import Cropper from "react-easy-crop";
import styles from "./EditProfile.module.css";
import Email from "../../assets/images/email.png";
import Camera from "../../assets/images/camera.svg";

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
            <button className={styles.editButton}>Edit</button>
          </div>
          <div className={styles.profileDetails}>
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input type="text" placeholder="Your First Name" />
            </div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input type="text" placeholder="Your Email" />
            </div>
            <div className={styles.formGroup}>
              <label>Gender</label>
              <input type="text" placeholder="Your Gender" />
            </div>
            <div className={styles.formGroup}>
              <label>Country</label>
              <input type="text" placeholder="Country" />
            </div>
            <div className={styles.formGroup}>
              <label>Language</label>
              <input type="text" placeholder="Language" />
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
