import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFollowers, UnFollowUser } from '../../api/api'; // Adjust the import based on your file structure

const FollowersList = () => {
  const { userId } = useParams();
  const [followings, setFollowings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowings = async () => {
      try {
        const followingsData = await getFollowers(userId);
        setFollowings(followingsData);
      } catch (error) {
        console.log("fetching following:", error);
        setError('Failed to fetch followings.');
      }
    };

    fetchFollowings();
  }, [userId]);

  const handleUnfollow = async (followerId) => {
    try {
      await UnFollowUser(followerId, userId);
      setFollowings((prevFollowings) => prevFollowings.filter(following => following.id !== followerId));
    } catch (error) {
      console.log("unfollow", error);
      setError('Failed to unfollow user.');
    }
  };

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Followers</h1>
      <ul className="space-y-4">
        {followings.map(following => (
          <li key={following.id} className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg hover:bg-gray-100 transition duration-200">
            <div className="flex items-center">
              <img 
                src={following.profile_picture || 'https://via.placeholder.com/40'} 
                alt={following.username} 
                className="w-10 h-10 rounded-full mr-4" 
              />
              <span className="font-medium">{following.username}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowersList;
