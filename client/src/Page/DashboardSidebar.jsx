// src/components/DashboardSidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSignInAlt, FaUserPlus, FaFilm, FaEye, FaUsers, FaBell } from 'react-icons/fa';

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Sidebar for larger screens */}
      <div
        className={`bg-gray-900 text-gray-200 w-72 h-screen p-6 fixed top-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out shadow-lg rounded-r-lg`}
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center">Dashboard</h2>

        <div className="space-y-4">
          <Link to="/profile" className="flex items-center p-3 hover:bg-gray-700 rounded-lg transition-colors duration-200">
            <FaUser className="mr-3 text-lg" />
            <span>View & Update Profile</span>
          </Link>
          <Link to="/login" className="flex items-center p-3 hover:bg-gray-700 rounded-lg transition-colors duration-200">
            <FaSignInAlt className="mr-3 text-lg" />
            <span>Login</span>
          </Link>
          <Link to="/signup" className="flex items-center p-3 hover:bg-gray-700 rounded-lg transition-colors duration-200">
            <FaUserPlus className="mr-3 text-lg" />
            <span>Create Account</span>
          </Link>
          <Link to="/movies-tracking" className="flex items-center p-3 hover:bg-gray-700 rounded-lg transition-colors duration-200">
            <FaFilm className="mr-3 text-lg" />
            <span>Track Movies</span>
          </Link>
          <Link to="/posts" className="flex items-center p-3 hover:bg-gray-700 rounded-lg transition-colors duration-200">
            <FaEye className="mr-3 text-lg" />
            <span>View Posts</span>
          </Link>
          <Link to="/clubs-manager" className="flex items-center p-3 hover:bg-gray-700 rounded-lg transition-colors duration-200">
            <FaUsers className="mr-3 text-lg" />
            <span>Movie Clubs</span>
          </Link>
          <Link to="/notifications" className="flex items-center p-3 hover:bg-gray-700 rounded-lg transition-colors duration-200">
            <FaBell className="mr-3 text-lg" />
            <span>Notifications</span>
          </Link>
        </div>
      </div>

      {/* Sidebar toggle button for smaller screens */}
      <button
        className="md:hidden fixed top-4 left-4 p-3 bg-gray-800 text-gray-200 rounded-full shadow-lg"
        onClick={toggleSidebar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
    </>
  );
};

export default DashboardSidebar;
