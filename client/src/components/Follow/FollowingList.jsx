import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFollowings, UnFollowUser } from '../../api/api'; // Import the UnFollowUser function

const FollowingList = () => {
  const { userId } = useParams();
  const [following, setFollowing] = useState([]);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const data = await getFollowings(userId);
        console.log(data);
        setFollowing(data);
      } catch (error) {
        console.error('Error fetching following:', error);
        setError('Failed to fetch following users.'); // Set error message
      }
    };

    fetchFollowing();
  }, [userId]);

  const handleUnfollow = async (followedId) => {
    try {
      await UnFollowUser(followedId); // Call the unfollow function
      setFollowing((prevFollowing) => 
        prevFollowing.filter(user => user.id !== followedId) // Remove the unfollowed user from the state
      );
    } catch (error) {
      console.error('Error unfollowing user:', error);
      setError('Failed to unfollow user.'); // Set error message
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6">Following</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>} {/* Display error message if any */}
      <ul className="space-y-4">
        {following.map((user) => (
          <li key={user.id} className="flex items-center justify-between bg-white shadow-lg p-4 rounded-lg hover:bg-gray-100 transition duration-200">
            <div className="flex items-center">
              <img 
                src={user.profile_picture || 'https://via.placeholder.com/40'} 
                alt={user.username} 
                className="w-10 h-10 rounded-full mr-4" 
              />
              <span className="font-medium">{user.username}</span>
            </div>
            <button 
              onClick={() => handleUnfollow(user.id)} 
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Unfollow
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowingList;
