import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Page/Navbar";
import Footer from "./Page/Footer";
import HomePage from "./Page/Homepage";
import LoginPage from "./Page/LoginPage";
import SignupPage from "./Page/SignupPage";
import Dashboard from "./Page/Dashboard";
import ProfilePage from "./Page/ProfilePage";
import PostPage from "./Page/PostPage";
import Movie from "./Page/Movie";
import ClubsManager from "./Page/ClubManager"; 
import PostList from "./components/Post/PostList"; 
import CreatePostForm from "./components/Post/CreatePostForm"; 
import UserProfile from "./Page/UserProfile"; 
import { createPostWithMovie,getPosts } from './api/api';
import FollowingList from './components/Follow/FollowingList';
import FollowersList from './components/Follow/FollowersList';

const App = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [formVisible, setFormVisible] = useState(false); // State to track form visibility

  const isAuthenticated = () => {
    const token = localStorage.getItem("access_token");
    return token && token !== "";
  };

  useEffect(() => {
    const storedUser = {
      id: localStorage.getItem("user_id"),
      username: localStorage.getItem("username"),
      profile_picture: localStorage.getItem("user_profile_picture"),
    };
    if (storedUser.id) setUser(storedUser);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const storedPosts = JSON.parse(localStorage.getItem("posts"));
      if (storedPosts) {
        setPosts(storedPosts);
      } else {
        try {
          const response = await fetch("http://localhost:5000/posts");
          const fetchedPosts = await response.json();
          setPosts(fetchedPosts);
          localStorage.setItem("posts", JSON.stringify(fetchedPosts));
        } catch (error) {
          console.error("Failed to fetch posts:", error);
        }
      }
    };
    fetchPosts();
  }, []);

    // Fetch posts again when the posts array is updated (e.g., after adding a post)
  useEffect(() => {
      console.log(posts);
      
      getPosts()
  }, [posts]); 

  const handleCreatePost = async (content, movieTitle, moviePosterUrl) => {
    try {
      const userId = user ? user.id : null;
      const clubId = 1; 
      const newPost = await createPostWithMovie(userId, clubId, content, movieTitle, moviePosterUrl);

      setPosts((prevPosts) => [...(Array.isArray(prevPosts) ? prevPosts : []), newPost]);
      localStorage.setItem("posts", JSON.stringify([...posts, newPost]));
      
      setFormVisible(false); // Hide the form after submit
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <Router>
      <AppContent
        isAuthenticated={isAuthenticated}
        user={user}
        setUser={setUser}
        posts={posts}
        handleCreatePost={handleCreatePost}
        formVisible={formVisible}
        setFormVisible={setFormVisible} // Pass down setter to toggle form visibility
      />
    </Router>
  );
};

const AppContent = ({ isAuthenticated, user, setUser, posts, handleCreatePost, formVisible, setFormVisible }) => {
  const location = useLocation(); 

  const shouldShowFooter = location.pathname !== "/dashboard";

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage onLogin={setUser} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/following/:userId" element={<FollowingList />} />
          <Route path="/followers/:userId" element={<FollowersList />} />

          {/* Protected Route for Dashboard */}
          <Route
            path="/dashboard"
            element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
          />

          {/* Protected Route for Profile Page */}
          <Route
            path="/profile"
            element={isAuthenticated() ? <ProfilePage userId={user?.id || 1} /> : <Navigate to="/login" />}
          />

          {/* Protected Route for Track Movies */}
          <Route
            path="/movies-tracking"
            element={isAuthenticated() ? <Movie /> : <Navigate to="/login" />}
          />

          {/* Protected Route for Clubs Manager */}
          <Route
            path="/clubs-manager"
            element={isAuthenticated() ? <ClubsManager /> : <Navigate to="/login" />}
          />

          {/* User Profile Route */}
          <Route
            path="/user/:id"
            element={isAuthenticated() ? <UserProfile userId={user?.id || 1} /> : <Navigate to="/login" />}
          />

          {/* Posts Route */}
          <Route
            path="/posts"
            element={
              <div className="container mx-auto px-4">
                <button
                  onClick={() => setFormVisible(prev => !prev)} // Toggle form visibility
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4"
                >
                  {formVisible ? "Close Form" : "Submit Post"}
                </button>
                {formVisible && <CreatePostForm onSubmit={handleCreatePost} />}
                <PostList posts={posts} />
              </div>
            }
          />

          <Route path="/posts/:postId" element={<PostPage />} />
        </Routes>
      </div>

      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default App;

