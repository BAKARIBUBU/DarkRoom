import React, { useEffect, useState } from 'react';
import { getFollowers } from '../../api/api';


const FollowerList = ({ user_id }) => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await getFollowers(user_id);
        setFollowers(response.data.data);
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    };

    fetchFollowers();
  }, [user_id]);

  return (
    <div>
      <h3>Followers:</h3>
      <ul>
                {/* Example data */}
        <li>Follower 1</li>
        <li>Follower 2</li>
        {followers.map((follower) => (
          <li key={follower.id}>
            <p>{follower.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowerList;
