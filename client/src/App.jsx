// // import React, { useState, useEffect } from "react";
// // import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
// // import Navbar from "./components/Navbar";
// // import HomePage from "./components/Homepage";
// // import Footer from "./components/Footer";
// // import LoginPage from "./components/LoginPage";
// import SignupPage from "./components/SignupPage";
// import Dashboard from "./components/Dashboard"; // Import Dashboard component
// import ProfilePage from "./components/ProfilePage"; // Import ProfilePage component
// import Movie from "./components/Movie"; // Import Movie component
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./Page/Navbar";
// import Footer from "./Page/Footer";
// import HomePage from "./Page/Homepage";
// import LoginPage from "./Page/LoginPage";
// // import PostPage from "./components/post/PostPage";
// import PostList from './components/Post/PostList';
// import PostPage from './Page/PostPage';
// import CreatePostForm from './components/Post/CreatePostForm';
// // import PostList from "./components/Post/PostList"; // Ensure the file is named `PostList.js`
// // import PostPage from "./Page/PostPage"; // Ensure the file is named `PostPage.js`
// // import CreatePostForm from "./components/Post/CreatePostForm"; // Ensure the file is named `CreatePostForm.js`



// // const App = () => {
// //   return (
// //     <Router>
// //       <div>
// //         {/* <h1>Darkroom App</h1> */}
// //         <Navbar />
// //         <Routes>
// //                 <Route path="/" element={<HomePage />} />  {/* Home page route */}
// //                 <Route path="/login" element={<LoginPage />} />
// //                 <Route path="/posts" element={<PostList />} />
// //                 <Route path="/posts/:postId" element={<PostPage />} />
// //                 <Route path="/create" element={<CreatePostForm userId={1} clubId={1} />} />
// //         </Routes>

// //         {/* <Routes>
// //                     <Route path="/" element={<HomePage />} />
// //                     <Route path="/home" element={<HomePage />} />
// //                     <Route path="/login" element={<LoginPage />} />
// //                     <Route path="/posts" element={<PostPage />} />
// //                     <Route path="/post/:id" element={<PostPage />} />
// //                     <Route path="/" element={<PostList />} />


// //                     <Route path="/posts/:postId" element={<PostPage />} />


// //                     <Route path="/create" element={<CreatePostForm userId={1} clubId={1} />} />

// //         </Routes> */}
// //         < Footer/>
// //       </div>
// //     </Router>
// //   );
// // };

// // export default App;

// // import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// // import HomePage from "./Page/Homepage";
// // import LoginPage from "./Page/LoginPage";
// // import PostList from "./components/Post/PostList";
// // import PostPage from "./Page/PostPage";
// // import CreatePostForm from "./components/Post/CreatePostForm";



// const App = () => {
//   const [user, setUser ] = useState(null);

//   // Function to check if the user is authenticated (has a valid token)
//   const isAuthenticated = () => {
//     const token = localStorage.getItem("access_token"); // Adjust based on your storage method
//     return token && token !== ""; // You can also add additional validation, like checking the token expiry date.
//   };

//   // Fetch user data from local storage on initial render
//   useEffect(() => {
//     const storedUser  = {
//       id: localStorage.getItem("user_id"),
//       username: localStorage.getItem("username"),
//       profile_picture: localStorage.getItem("user_profile_picture"),
//     };
//     if (storedUser .id) {
//       setUser (storedUser );
//     }
//   }, []);

//   return (
//     <Router>
//       <AppContent
//         isAuthenticated={isAuthenticated}
//         user={user}
//         setUser ={setUser }
//       />
//     </Router>
//   );
// };

// const AppContent = ({ isAuthenticated, user, setUser  }) => {
//   const location = useLocation(); // Get the current route location

//   // Don't render footer on the /dashboard route
//   const shouldShowFooter = location.pathname !== "/dashboard";

//   return (
//     <div>
//       <Navbar user={user} setUser ={setUser } />
//       <div className="pt-20">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<LoginPage onLogin={setUser } />} />
//           <Route path="/signup" element={<SignupPage />} />

//           {/* Protected Route for Dashboard */}
//           <Route
//             path="/dashboard"
//             element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
//           />

//           {/* Protected Route for Profile Page */}
//           <Route
//             path="/profile"
//             element={isAuthenticated() ? <ProfilePage userId={1} /> : <Navigate to="/login" />}
//           />

//           {/* Protected Route for Track Movies */}
//           <Route
//             path="/movies-tracking"
//             element={isAuthenticated() ? <Movie /> : <Navigate to="/login" />}
//           />
//         </Routes>
//       </div>
//       {/* Conditionally render the footer */}
//       {shouldShowFooter && <Footer />}
//     </div>
//   );
// };

// export default App;

// // // src/App.jsx
// // import React from "react";
// // import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
// // import Navbar from "./components/Navbar";
// // import HomePage from "./components/Homepage";
// // import Footer from "./components/Footer";
// // import LoginPage from "./components/LoginPage";
// // import SignupPage from "./components/SignupPage";
// // import Dashboard from "./components/Dashboard"; // Import Dashboard component

// // const App = () => {
// //   // Function to check if the user is authenticated (has a valid token)
// //   const isAuthenticated = () => {
// //     const token = localStorage.getItem("access_token"); // Adjust based on your storage method
// //     return token && token !== ""; // You can also add additional validation, like checking the token expiry date.
// //   };

// //   return (
// //     <Router>
// //       <AppContent isAuthenticated={isAuthenticated} />
// //     </Router>
// //   );
// // };

// // const AppContent = ({ isAuthenticated }) => {
// //   const location = useLocation(); // Get the current route location

// //   // Don't render footer on the /dashboard route
// //   const shouldShowFooter = location.pathname !== "/dashboard";

// //   return (
// //     <div>
// //       <Navbar />
// //       <div className="pt-20">
// //         <Routes>
// //           <Route path="/" element={<HomePage />} />
// //           <Route path="/login" element={<LoginPage />} />
// //           <Route path="/signup" element={<SignupPage />} />

// //           {/* Protected Route for Dashboard */}
// //           <Route
// //             path="/dashboard"
// //             element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
// //           />
// //         </Routes>
// //       </div>
// //       {/* Conditionally render the footer */}
// //       {shouldShowFooter && <Footer />}
// //     </div>
// //   );
// // };

// // export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Page/Navbar";
import Footer from "./Page/Footer";
import HomePage from "./Page/Homepage";
import LoginPage from "./Page/LoginPage";
import SignupPage from "./Page/SignupPage";
import Dashboard from "./Page/Dashboard";
import ProfilePage from "./Page/ProfilePage";
import Movie from "./Page/Movie";
import PostList from "./components/Post/PostList";
import PostPage from "./Page/PostPage";
import CreatePostForm from "./components/Post/CreatePostForm";

const App = () => {
  const [user, setUser] = useState(null);

  // Function to check if the user is authenticated (has a valid token)
  const isAuthenticated = () => {
    const token = localStorage.getItem("access_token"); // Adjust based on your storage method
    return token && token !== ""; // You can also add additional validation, like checking the token expiry date.
  };

  // Fetch user data from local storage on initial render
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

  return (
    <Router>
      <AppContent isAuthenticated={isAuthenticated} user={user} setUser={setUser} />
    </Router>
  );
};

const AppContent = ({ isAuthenticated, user, setUser }) => {
  const location = useLocation(); // Get the current route location

  // Don't render footer on the /dashboard route
  const shouldShowFooter = location.pathname !== "/dashboard";

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage onLogin={setUser} />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Route for Dashboard */}
          <Route
            path="/dashboard"
            element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
          />

          {/* Protected Route for Profile Page */}
          <Route
            path="/profile"
            element={isAuthenticated() ? <ProfilePage userId={user ? user.id : 1} /> : <Navigate to="/login" />}
          />

          {/* Protected Route for Track Movies */}
          <Route
            path="/movies-tracking"
            element={isAuthenticated() ? <Movie /> : <Navigate to="/login" />}
          />

          {/* Public routes for Posts */}
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:postId" element={<PostPage />} />

          {/* Create Post route */}
          <Route path="/create" element={<CreatePostForm userId={user ? user.id : 1} />} />
        </Routes>
      </div>
      {/* Conditionally render the footer */}
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default App;
