import React, { useEffect, useState } from 'react';
import { getFollowings } from '../../api/api';

const FollowingList = ({ user_id }) => {
  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    const fetchFollowings = async () => {
      try {
        const response = await getFollowings(user_id);
        setFollowings(response.data.data);
      } catch (error) {
        console.error('Error fetching followings:', error);
      }
    };

    fetchFollowings();
  }, [user_id]);

  return (
    <div>
      <h3>Following:</h3>
      <ul>
                {/* Example data */}
        <li>Follower 1</li>
        <li>Follower 2</li>
        {followings.map((following) => (
          <li key={following.id}>
            <p>{following.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowingList;
