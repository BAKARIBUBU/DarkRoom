import React, { useState } from 'react';
import axios from 'axios';


const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Only for registration
  const [error, setError] = useState('');

  // Handle login
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5555/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.access_token);
      alert("Login successful!");
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  // Handle registration
  const handleRegister = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5555/register', {
        username,
        email,
        password,
      });
      localStorage.setItem('token', response.data.access_token);
      alert("Registration successful! You are now logged in.");
      setIsRegistering(false); // Go back to login view after registration
    } catch (error) {
      setError("Error registering. Please try again.");
    }
  };

  return (
    <div className="login-page bg-[url('src/images/login.jpeg')] bg-no-repeat bg-cover bg-center bg-fixed flex items-center justify-center h-screen w-[200vh]">
      {isRegistering ? (
        <div className="bg-black bg-opacity-70 p-5 rounded text-center text-white w-[300px] mx-auto">
          <h2>Sign Up</h2>
          <input
            type="text"
            className=' w-full p-2.5 my-2 border-none rounded bg-white'
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            className=' w-full p-2.5 my-2 border-none rounded bg-white'
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className=' w-full p-2.5 my-2 border-none rounded bg-white'
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-[#a5e100] text-black p-2.5 rounded cursor-pointer font-bold hover:bg-[#89c700]" onClick={handleRegister}>
            Register
          </button>
          <p onClick={() => setIsRegistering(false)}>Already have an account? <span className="text-[#a5e100] cursor-pointer">Login</span></p>
        </div>
      ) : (
        <div className="bg-black bg-opacity-70 p-5 rounded text-center text-white w-[300px] mx-auto">
          <h2 mb-5 text-white>Login</h2>
          <input
            type="email"
            className=' w-full p-2.5 my-2 border-none rounded bg-white'
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className=' w-full p-2.5 my-2 border-none rounded bg-white'
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-[#a5e100] text-black p-2.5 rounded cursor-pointer font-bold hover:bg-[#89c700]" onClick={handleLogin}>
            Login
          </button>
          <p onClick={() => setIsRegistering(true)}>Need an Account? <span className="text-[#a5e100] cursor-pointer">Sign Up</span></p>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginPage;