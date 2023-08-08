import React, { useEffect, useState } from "react";
import "./NavBar.css";

const NavBar = () => {
  let storedUser = localStorage.getItem("user");
  storedUser = JSON.parse(storedUser);
  const defaultImageUrl =
    "https://png.pngtree.com/png-clipart/20200224/original/pngtree-businessman-avatar-icon-flat-style-png-image_5230185.jpg";
  const storedAvatarUrl = localStorage.getItem("avatarUrl") || defaultImageUrl;
  const [profileImageUrl, setProfileImageUrl] = useState(storedAvatarUrl);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const sampleImages = [
    "https://png.pngtree.com/png-clipart/20200224/original/pngtree-businessman-avatar-icon-flat-style-png-image_5230185.jpg",
    "https://thumbs.dreamstime.com/b/avatar-man-shirt-avatar-face-single-icon-flat-style-vector-symbol-stock-illustration-web-90375122.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA6pr0d0DRieAtveKxFv4MmiHRbExgjk3XLQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0nM3f4ZgqEgtxVSfAmqwY1RRNkFC6VRdtWg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhmiy_Jm8SGHUyb8MdiVb9HcSgajVubK9FGw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvsnKCI3xvHs7IGk64hxKK32NEoufK_1btVg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSse9udjlvt08nf9ReyJi7_LOihnfUUiOZNQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTECRNVfClmHYW7Z-sfkTPChJl-WF6RJf5Wvg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd9MO1yPkiQeIVJMIMId-5D2aE291dRbiUZLWAGLzK0oC9pfdpbTk0JGCVgsN-0V1s2Mk&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDqo7jdu_0KG5jL4JxIdjoKy1KsJbCJ9tHPw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBba0js-FmmQZDKqlMWoxKtzoT5Fg_mpdeMw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Xv9tbCq_y14B6tiE2h7Qa_TAZvhIwn9_37gkREwhWP8Vj5jc1OyhQ3FR-QAmUxPTBu0&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThmPGD8ab5RaFMf823JZnLZpiBY8S1fur1Vw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHBlWLtCC9xqnXGHK-IS3U_4mKVAupAAlZn3xdDknqcmNy6OdO115qjfWfQO0S9mmpsHM&usqp=CAU",
  ];
  const handleImageSelect = (imgUrl) => {
    setProfileImageUrl(imgUrl);
    localStorage.setItem("avatarUrl", imgUrl);
    setShowImagePicker(false);
  };
  return (
    <nav>
      <div className="nav-content">
        <div className="profile-info">
          <img
            src={profileImageUrl}
            alt="Profile"
            onClick={() => setShowImagePicker(true)}
          />
          <p className="profile-text">Welcome, {storedUser.username}</p>
        </div>
        <img
          src="https://thumbs.dreamstime.com/z/mentor-icon-vector-illustration-white-background-vector-illustration-mentor-icon-vector-illustration-119860865.jpg?w=768"
          alt="logo"
          className="logo"
        />
        {showImagePicker && (
          <div className="image-picker-modal">
            {sampleImages.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt="Selectable Profile"
                onClick={() => handleImageSelect(imgUrl)}
              />
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
