import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", profile_picture: "" });
  const [userId, setUserId] = useState(null);

  // Fetch the userId from localStorage on component mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id"); // Retrieve userId from localStorage
    if (storedUserId) {
      setUserId(storedUserId); // Store userId in state
    }
  }, []);

  // Fetch user data when userId is available
  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`https://darkroombackend.onrender.com/users/${userId}`);
          setUser(response.data.data);
          setFormData({
            username: response.data.data.username,
            email: response.data.data.email,
            profile_picture: response.data.data.profile_picture || "",
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUser();
    }
  }, [userId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle profile update
  const handleSaveChanges = async () => {
    try {
      const response = await axios.patch(`https://darkroombackend.onrender.com/users/${userId}`, formData);
      setUser(response.data.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // Cloudinary widget to upload profile picture
  const handleUploadClick = () => {
    const cloudinaryWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dfxnefnjj", // Replace with your Cloudinary cloud name
        uploadPreset: "profile_pictures", // Replace with your Cloudinary upload preset
        sources: ["local", "url", "camera"],
        showAdvancedOptions: false,
        cropping: true,
        multiple: false,
        folder: "profile_pictures", // Set a folder for profile pictures
        clientAllowedFormats: ["jpg", "jpeg", "png"],
      },
      (error, result) => {
        if (!error && result.event === "success") {
          const imageUrl = result.info.secure_url; // The URL of the uploaded image
          setFormData({ ...formData, profile_picture: imageUrl }); // Update form data with new image URL
        }
      }
    );
    cloudinaryWidget.open(); // Open the widget
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center py-16 bg-gradient-to-r from-teal-100 to-blue-200 min-h-screen">
      {/* Profile Card */}
      <div className="bg-white shadow-xl rounded-lg p-10 max-w-lg w-full">
        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <img
            src={formData.profile_picture || "/default-avatar.png"} // Default avatar if none exists
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-teal-500 cursor-pointer"
            onClick={handleUploadClick} // Open Cloudinary widget on click
          />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Your Profile</h2>

        {/* Form Fields */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-lg font-semibold text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full p-4 rounded-md border-2 ${
                isEditing ? "border-teal-600 bg-white" : "border-gray-300 bg-gray-100"
              } text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all`}
            />
          </div>

          <div>
            <label className="text-lg font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full p-4 rounded-md border-2 ${
                isEditing ? "border-teal-600 bg-white" : "border-gray-300 bg-gray-100"
              } text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all`}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          {isEditing ? (
            <button
              onClick={handleSaveChanges}
              className="bg-teal-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-teal-700 transition duration-300"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
