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
// import RatingsPage from "./Page/RatingsPage"; 

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

           {/* Route for movie ratings */}
          {/* <Route path="/movies/:id/ratings" element={<RatingsPage />} /> */}

        </Routes>
      </div>
      {/* Conditionally render the footer */}
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default App;
