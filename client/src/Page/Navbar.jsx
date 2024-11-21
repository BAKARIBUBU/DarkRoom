import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Fetch user data from local storage
  useEffect(() => {
    const storedUser = {
      id: localStorage.getItem("user_id"),
      username: localStorage.getItem("username"),
      profile_picture: localStorage.getItem("user_profile_picture"),
    };
    if (storedUser.id) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user_id"); // Clear user ID on logout
    localStorage.removeItem("username"); // Clear username on logout
    localStorage.removeItem("user_profile_picture"); // Clear profile picture on logout
    localStorage.removeItem("access_token"); // Remove the access token on logout
    setUser(null); // Reset user state
  };

  return (
    <nav className="bg-gradient-to-r from-[#2c3e50] to-[#34495e] fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-4xl font-extrabold text-white hover:text-[#1abc9c] transition duration-300">
          DarkRoom
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Links for homepage, movie, club, post */}
          <Link to="/" className="text-white text-lg font-semibold hover:text-[#1abc9c]">Home</Link>
          {/* <Link to="/user" className="text-white text-lg font-semibold hover:text-[#1abc9c]">User</Link> */}
          <Link to={`/user/${user?.id || 1}`} className="text-white text-lg font-semibold hover:text-[#1abc9c]">User</Link>
          <Link to="/movies" className="text-white text-lg font-semibold hover:text-[#1abc9c]">Movies</Link>
          <Link to="/clubs" className="text-white text-lg font-semibold hover:text-[#1abc9c]">Clubs</Link>
          <Link to="/posts" className="text-white text-lg font-semibold hover:text-[#1abc9c]">Posts</Link>

          {user ? (
            <>
              <span className="text-white text-lg font-semibold">Welcome, {user.username}</span>
              <img src={user.profile_picture || "/default-avatar.png"} alt="Profile" className="w-10 h-10 rounded-full" />
              <button onClick={handleLogout} className="text-white text-lg font-semibold py-2 px-4 rounded-lg hover:bg-[#e74c3c] transition duration-300 ease-in-out transform hover:scale-105">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white text-lg font-semibold py-2 px-4 rounded-lg hover:bg-[#1abc9c] transition duration-300 ease-in-out transform hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white text-lg font-semibold py-2 px-4 rounded-lg border-2 border-[#1abc9c] hover:bg-[#1abc9c] transition duration-300 ease-in-out transform hover:scale-105"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden bg-gradient-to-r from-[#2c3e50] to-[#34495e] p-4 space-y-4`}>
        {/* Links for homepage, movie, club, post */}
        <Link to="/" className="block text-white text-lg font-semibold py-2 px-4 rounded-lg hover:bg-[#1abc9c]">Home</Link>
        {/* <Link to="/user" className="block text-white text-lg font-semibold py-2 px-4 rounded-lg hover:bg-[#1abc9c]">User</Link> */}
        <Link to="/movies-tracking" className="block text-white text-lg font-semibold py-2 px-4 rounded-lg hover:bg-[#1abc9c]">Movies</Link>
        <Link to="/clubs" className="block text-white text-lg font-semibold py-2 px-4 rounded-lg hover:bg-[#1abc9c]">Clubs</Link>
        <Link to="/posts" className="block text-white text-lg font-semibold py-2 px-4 rounded-lg hover:bg-[#1abc9c]">Posts</Link>
        {user ? (
          <>
            {/* Profile Link */}
            <Link to="/profile" className="flex items-center text-white text-lg font-semibold py-2 px-4">
              <img
                src={user.profile_picture || "/default-avatar.png"}
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
              {user.username}'s Profile
            </Link>
            <button
              onClick={handleLogout}
              className="block text-white text-lg font-semibold py-2 px-4 rounded-lg hover:bg-[#e74c3c] transition duration-300 ease-in-out transform hover:scale-105"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="block text-white text-lg font-semibold py-2 px-4 rounded-lg hover:bg-[#1abc9c] transition duration-300 ease-in-out transform hover:scale-105"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block text-white text-lg font-semibold py-2 px-4 rounded-lg border-2 border-[#1abc9c] hover:bg-[#1abc9c] transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;    
{/* 
        {user ? (
          <>
            <span className="block text-white text-lg font-semibold">Welcome, {user.username}</span>
            <img src={user.profile_picture || "/default-avatar.png"} alt="Profile" className="w-10 h-10 rounded-full" />
            <button onClick={handleLogout} className="block text-white text-lg font-semibold py-2 px-4 rounded-lg hover:bg-[#e74c3c] transition duration-300 ease-in-out transform hover:scale-105">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="block text-white text-lg font-semibold py-2 px-4 rounded-lg hover:bg-[#1abc9c] transition duration-300 ease-in-out transform hover:scale-105"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block text-white text-lg font-semibold py-2 px-4 rounded-lg border-2 border-[#1abc9c] hover:bg-[#1abc9c] transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav> */}

