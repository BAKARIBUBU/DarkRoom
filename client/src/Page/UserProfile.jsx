import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getFollowers, getFollowings } from '../api/api'; // Adjust the import based on your file structure
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

        const followers = await getFollowers(userId);
        setFollowersCount(followers.length);

        const followings = await getFollowings(userId);
        setFollowingCount(followings.length);
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
        <div className="text-lg text-gray-600">
          <Link to={`/following/${userId}`} className="text-blue-500 hover:text-blue-600 mr-4">
            Following: {followingCount}
          </Link>
          <Link to={`/followers/${userId}`} className="text-blue-500 hover:text-blue-600">
            Followers: {followersCount}
          </Link>
        </div>
      </div>
    </div>
  );
};


export default UserProfile;
