import React, { useRef, useState } from "react";
import axios from "axios";
import LocalSeeOutlinedIcon from "@mui/icons-material/LocalSeeOutlined";
import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from '../redux/authSlice';

const UpdateProfilePhoto = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadProfilePhoto(file);
    }
  };

  const uploadProfilePhoto = async (file) => {
    const formData = new FormData();
    formData.append("profilePhoto", file);

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await axios.post(
        "http://localhost:8000/api/v1/users/updateProfileImg",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedUser = { ...user, profilePhoto: res.data.profilePhoto };
        dispatch(setUser(updatedUser));
        setSuccess("Profile photo updated successfully!");
      }
    } catch (err) {
      setError("Error uploading the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center cursor-pointer group"
        onClick={handleClick}
      >
        {user?.profilePhoto ? (
          <img
            className="w-20 h-20 rounded-full"
            src={user.profilePhoto}
            alt="profile-img"
          />
        ) : (
          <p className="text-center text-blue-500 font-semibold text-3xl">
            <Avatar src="/broken-image.jpg" />
          </p>
        )}

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />

        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <LocalSeeOutlinedIcon className="w-6 h-6 text-white mt-1" />
        </div>
      </div>

      {/* Messages container */}
      <div className="mt-2 text-center">
        {loading && <p className="text-blue-500">Uploading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </div>
    </div>
  );
};

export default UpdateProfilePhoto;
