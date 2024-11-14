// src/components/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5555/login', {
        email,
        password
      });

      if (response.data.status === 200) {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('user_id', response.data.user.id); // Store user ID
        navigate('/dashboard');
      } else {
        setErrorMessage(response.data.message || 'An error occurred');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Welcome Back!</h2>

        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
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
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#148f6e] font-semibold hover:text-[#107b5b]">
            Sign Up
          </Link>
        </p>

        <div className="flex items-center mt-8">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-2 text-sm text-gray-500">Or log in with</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <div className="mt-6 space-y-4">
          <button className="flex items-center justify-center w-full py-3 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition duration-300">
            <i className="fab fa-google mr-2 text-lg"></i> Continue with Google
          </button>
          <button className="flex items-center justify-center w-full py-3 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition duration-300">
            <i className="fab fa-facebook-f mr-2 text-lg"></i> Continue with Facebook
          </button>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
