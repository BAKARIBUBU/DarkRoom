import React from 'react';
import FollowerList from '../components//Follow/FollowerList';
import FollowingList from '../components/Follow/FollowingList';

const UserProfile = ({ user_id }) => {
  return (
    <div>
      <h1>User Profile</h1>
      <FollowerList userId={user_id} />
      <FollowingList userId={user_id} />
    </div>
  );
};

export default UserProfile;
