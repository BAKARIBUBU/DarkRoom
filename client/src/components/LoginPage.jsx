// import React, { useState } from 'react';
// import axios from 'axios';


// const LoginPage = () => {
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState(''); // Only for registration
//   const [error, setError] = useState('');

//   // Handle login
//   // const handleLogin = async () => {
//   //   try {
//   //     const response = await axios.post('http://127.0.0.1:5555/login', {
//   //       email,
//   //       password,
//   //     });
//   //     localStorage.setItem('token', response.data.access_token);
//   //     localStorege.setItem('user_id',response.data.user.id) // Add user id to local storage 
//   //     alert("Login successful!");
//   //   } catch (error) {
//   //     setError("Invalid credentials");
//   //   }
//   // };

//   // Handle registration
//   const handleRegister = async () => {
//     try {
//       const response = await axios.post('http://127.0.0.1:5555/register', {
//         username,
//         email,
//         password,
//       });
//       localStorage.setItem('token', response.data.access_token);
//       alert("Registration successful! You are now logged in.");
//       setIsRegistering(false); // Go back to login view after registration
//     } catch (error) {
//       setError("Error registering. Please try again.");
//     }
//   };

//   return (
//     <div className="login-page bg-[url('src/images/login.jpeg')] bg-no-repeat bg-cover bg-center bg-fixed flex items-center justify-center h-screen w-[200vh]">
//       {isRegistering ? (
//         <div className="bg-black bg-opacity-70 p-5 rounded text-center text-white w-[300px] mx-auto">
//           <h2>Sign Up</h2>
//           <input
//             type="text"
//             className=' text-black w-full p-2.5 my-2 border-none rounded bg-white'
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input
//             type="email"
//             className=' text-black w-full p-2.5 my-2 border-none rounded bg-white'
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             className=' text-black w-full p-2.5 my-2 border-none rounded bg-white'
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button className="bg-[#a5e100] text-black p-2.5 rounded cursor-pointer font-bold hover:bg-[#89c700]" onClick={handleRegister}>
//             Register
//           </button>
//           <p onClick={() => setIsRegistering(false)}>Already have an account? <span className="text-[#a5e100] cursor-pointer">Login</span></p>
//         </div>
//       ) : (
//         <div className="bg-black bg-opacity-70 p-5 rounded text-center text-white w-[300px] mx-auto">
//           <h2 mb-5 text-white>Login</h2>
//           <input
//             type="email"
//             className=' text-black w-full p-2.5 my-2 border-none rounded bg-white'
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             className=' text-black w-full p-2.5 my-2 border-none rounded bg-white'
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button className="bg-[#a5e100] text-black p-2.5 rounded cursor-pointer font-bold hover:bg-[#89c700]" onClick={handleLogin}>
//             Login
//           </button>
//           <p onClick={() => setIsRegistering(true)}>Need an Account? <span className="text-[#a5e100] cursor-pointer">Sign Up</span></p>
//         </div>
//       )}
//       {error && <p className="error-message">{error}</p>}
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        email,
        password
      });

      if (response.data.status === 200) {
        // Store user data in local storage
        const user = {
          id: response.data.user.id,
          username: response.data.user.username,
          profile_picture: response.data.user.profile_picture,
        };
        localStorage.setItem('user_id', user.id);
        localStorage.setItem('username', user.username);
        localStorage.setItem('user_profile_picture', user.profile_picture);
        localStorage.setItem('access_token', response.data.access_token);

        // Call the onLogin callback to update the user state in the parent component
        onLogin(user);

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
      </div>
    </section>
  );
};

export default LoginPage;