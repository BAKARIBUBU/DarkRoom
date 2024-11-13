// src/components/DashboardSidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Sidebar for larger screens (md and up) */}
      <div
        className={`bg-gray-800 text-white w-64 h-screen p-6 fixed md:block transition-all duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        <div className="menu-section mb-6">
          <h3 className="text-xl font-semibold mb-4">User Account</h3>
          <ul>
            <li>
              <Link
                to="/profile"
                className="block py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
              >
                View & Update Profile
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="block py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="block py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
              >
                Create Account
              </Link>
            </li>
          </ul>
        </div>

        <div className="menu-section mb-6">
          <h3 className="text-xl font-semibold mb-4">Movies & Posts</h3>
          <ul>
            <li>
              <Link
                to="/create-post"
                className="block py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
              >
                Create & Share Movie Posts
              </Link>
            </li>
            <li>
              <Link
                to="/posts"
                className="block py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
              >
                View & Interact with Posts
              </Link>
            </li>
            <li>
              <Link
                to="/movies-tracking"
                className="block py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
              >
                Track Movies Watched
              </Link>
            </li>
          </ul>
        </div>

        <div className="menu-section mb-6">
          <h3 className="text-xl font-semibold mb-4">Movie Clubs</h3>
          <ul>
            <li>
              <Link
                to="/clubs/join"
                className="block py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
              >
                Join Movie Clubs
              </Link>
            </li>
            <li>
              <Link
                to="/clubs/create"
                className="block py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
              >
                Create & Manage Movie Clubs
              </Link>
            </li>
            <li>
              <Link
                to="/clubs"
                className="block py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
              >
                View Clubs & Communities
              </Link>
            </li>
          </ul>
        </div>

        <div className="menu-section mb-6">
          <h3 className="text-xl font-semibold mb-4">Social & Interaction</h3>
          <ul>
            <li>
              <Link
                to="/followers"
                className="block py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
              >
                Follow/Unfollow Members
              </Link>
            </li>
            <li>
              <Link
                to="/posts/review"
                className="block py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
              >
                Rate/Comment on Posts
              </Link>
            </li>
            <li>
              <Link
                to="/posts/details"
                className="block py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
              >
                View Post Details
              </Link>
            </li>
          </ul>
        </div>

        <div className="menu-section mb-6">
          <h3 className="text-xl font-semibold mb-4">Notifications</h3>
          <ul>
            <li>
              <Link
                to="/notifications"
                className="block py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
              >
                View Notifications
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Sidebar toggle button for smaller screens */}
      <div
        className="md:hidden fixed top-4 left-4 p-3 bg-gray-800 text-white rounded-full"
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
      </div>
    </>
  );
};

export default DashboardSidebar;
