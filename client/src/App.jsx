import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Page/Navbar";
import Footer from "./Page/Footer";
import HomePage from "./Page/Homepage";
import LoginPage from "./Page/LoginPage";
import SignupPage from "./Page/SignupPage";
import Dashboard from "./Page/Dashboard";
import ProfilePage from "./Page/ProfilePage";
import PostPage from "./Page/PostPage";
import Movie from "./Page/Movie";
import PostList from "./components/Post/PostList";
import CreatePostForm from "./components/Post/CreatePostForm";
import UserProfile from "./Page/UserProfile";
import { createPostWithMovie } from './api/api';  

const App = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

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

  const handleCreatePost = async (content, movieTitle, moviePosterUrl) => {
  try {
    const userId = user ? user.id : null; 
    const clubId = 1; 
    const newPost = await createPostWithMovie(userId, clubId, content, movieTitle, moviePosterUrl);

    setPosts((prevPosts) => [...(Array.isArray(prevPosts) ? prevPosts : []), newPost]);


    localStorage.setItem("posts", JSON.stringify([...posts, newPost]));
  } catch (error) {
    console.error("Failed to create post:", error);
  }
};




  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} setUser={setUser} />
        <div className="flex-grow pt-20 bg-gray-50">
          <AppRoutes
            isAuthenticated={isAuthenticated}
            user={user}
            setUser={setUser}
            posts={posts}
            handleCreatePost={handleCreatePost}
          />
        </div>
        <Footer />
      </div>
    </Router>
  );
};

const AppRoutes = ({ isAuthenticated, user, setUser, posts, handleCreatePost }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage onLogin={setUser} />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/profile" element={isAuthenticated() ? <ProfilePage userId={user?.id || 1} /> : <Navigate to="/login" />} />
      <Route path="/user/:id" element={<UserProfile userId={user?.id} />} />
      <Route path="/movies-tracking" element={isAuthenticated() ? <Movie /> : <Navigate to="/login" />} />
      <Route
        path="/posts"
        element={
          <div className="container mx-auto px-4">
            <CreatePostForm onSubmit={handleCreatePost} />
            <PostList posts={posts} />
          </div>
        }
      />
      <Route path="/posts/:postId" element={<PostPage />} />
    </Routes>
  );
};

export default App;

