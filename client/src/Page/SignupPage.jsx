import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
  
    try {
      const response = await axios.post('https://darkroombackend.onrender.com/register', {
        username,
        email,
        password
      });
  
      if (response.data.status === 201) {
        setSuccessMessage('Registration successful! Redirecting to login...');
  
        // Redirect to login page after a short delay
        setTimeout(() => navigate('/login'), 2000);
      } else {
        // Show the specific error message from the server if available
        setErrorMessage(response.data.message || 'An error occurred');
      }
    } catch (error) {
      // In case the server returns a response with specific error message
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Registration failed due to an unknown error');
      } else {
        setErrorMessage('Registration failed. Please try again later.');
      }
    }
  };
  
  // const handleSignup = async (e) => {
  //   e.preventDefault();
  //   setErrorMessage('');
  //   setSuccessMessage('');

  //   try {
  //     const response = await axios.post('http://127.0.0.1:5555/register', {
  //       username,
  //       email,
  //       password
  //     });

  //     if (response.data.status === 201) {
  //       setSuccessMessage('Registration successful! Redirecting to login...');

  //       // Redirect to login page after a short delay
  //       setTimeout(() => navigate('/login'), 2000);
  //     } else {
  //       setErrorMessage(response.data.message || 'An error occurred');
  //     }
  //   } catch (error) {
  //     setErrorMessage(error.response?.data?.message || 'Registration failed');
  //   }
  // };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Create Your Account</h2>

        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="username" className="text-sm font-semibold text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 mt-2 text-gray-800 border rounded-md focus:outline-none focus:ring focus:ring-[#107b5b]"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-gray-600">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mt-2 text-gray-800 border rounded-md focus:outline-none focus:ring focus:ring-[#107b5b]"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-semibold text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mt-2 text-gray-800 border rounded-md focus:outline-none focus:ring focus:ring-[#107b5b]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-6 font-semibold text-white bg-[#148f6e] rounded-md hover:bg-[#107b5b] transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-[#148f6e] font-semibold hover:text-[#107b5b]">
            Log In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignupPage;
