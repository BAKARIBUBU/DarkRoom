// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4 w-[90%]">
        <Link to="/" className="text-2xl font-bold text-gray-800 mr-4">DarkRoom</Link>

        <div className="hidden md:flex space-x-8">
          <Link
            to="/login"
            className="bg-[#148f6e] text-white px-4 py-2 rounded-md hover:bg-[#107b5b] transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-[#148f6e] text-white px-4 py-2 rounded-md hover:bg-[#107b5b] transition duration-300"
          >
            Sign Up
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden bg-white p-4 space-y-4`}>
        <Link
          to="/login"
          className="block bg-[#148f6e] text-white px-4 py-2 rounded-md hover:bg-[#107b5b] transition duration-300"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="block bg-[#148f6e] text-white px-4 py-2 rounded-md hover:bg-[#107b5b] transition duration-300"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
