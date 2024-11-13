import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='bg-black flex justify-between items-center h-20 max-w-[100%] mx-auto px-4  text-white sticky top-0 z-50'>    
        <h1 className='text-3xl font-bold text-[#fff]'>DarkRoom</h1>
      <ul className="hidden md:flex">
        <li className='p-4 cursor-pointer'><Link to="/home">Home</Link></li>
        <li className='p-4 cursor-pointer' ><Link to="/login">Login</Link></li>
        <li className='p-4 cursor-pointer'><Link to="/login">Register</Link></li>
        <li className='p-4 cursor-pointer'><Link to="/clubs">Clubs</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;