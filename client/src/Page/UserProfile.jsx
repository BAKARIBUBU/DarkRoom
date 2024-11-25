import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getFollowers, getFollowings, getPosts } from '../api/api'; // Adjust the import based on your file structure
import { Link } from 'react-router-dom';

const UserProfile = ({ userId }) => {
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user details
        const userResponse = await axios.get(`http://127.0.0.1:5000/users/${userId}`);
        const userData = userResponse.data.data;
        setUsername(userData.username);
        setProfilePicture(userData.profile_picture);

        // Fetch followers and following count
        const followers = await getFollowers(userId);
        setFollowersCount(followers.length);
        const followings = await getFollowings(userId);
        setFollowingCount(followings.length);

        // Fetch user posts
        const userPosts = await getPosts(userId);
        setPosts(userPosts);
      } catch (error) {
        console.error('Error fetching user profile data:', error);
        setError('Failed to fetch user profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-center mb-6">
        {profilePicture ? (
          <img
            src={profilePicture}
            alt={`${username}'s profile`}
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Profile Picture
          </div>
        )}
      </div>
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">{username}'s Profile</h1>
      <div className="text-center mb-4">
      <Link to={`/profile`}>
        <button className="mt-4 bg-blue-500 text-white p-2 rounded-md">
          Edit Profile
        </button>
      </Link>
        <div className="text-lg text-gray-600">
          <Link to={`/following/${userId}`} className="text-blue-500 hover:text-blue-600 mr-4">
            Following: {followingCount}
          </Link>
          <Link to={`/followers/${userId}`} className="text-blue-500 hover:text-blue-600">
            Followers: {followersCount}
          </Link>
        </div>
      </div>

      {/* Display User's Posts */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Posts</h2>
        {posts.length === 0 ? (
          <div className="text-gray-600">No posts available.</div>
        ) : (
          posts.map(post => (
            <div key={post.id} className="border p-4 mb-4 rounded-lg shadow">
                        {post.movie && (
            <div className="movie-info mt-3">
              <img
                src={post.movie.poster_url || "/default-image.jpg"}
                alt={post.movie.title}
                className="w-full h-48 rounded-lg object-cover" 
              />
              <h4 className="text-sm font-medium text-gray-800 mt-2"><b>{post.movie.title}</b></h4>
            </div>
          )}
              <p className="text-gray-800">{post.content}</p>
              <div className="text-gray-500 text-sm mt-2">Posted on {new Date(post.created_at).toLocaleDateString()}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfile;