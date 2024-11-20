import React, { useState } from 'react';
import { followUser, unfollowUser } from '../api/api';

const FollowButton = ({ followedId, isFollowing: initialFollowing }) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(followedId);
        setIsFollowing(false);
      } else {
        await followUser(followedId);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Error toggling follow state:', error);
    }
  };

  return (
    <button onClick={handleFollow}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
