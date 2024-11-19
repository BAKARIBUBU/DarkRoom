import React, { useState, useEffect } from 'react';
import { getPosts } from '../../api/api';
import PostCard from './PostCard';

const PostList = ({ posts = [] }) => {
  const [fetchedPosts, setFetchedPosts] = useState([]);

  useEffect(() => {
    if (posts.length === 0) {
      getPosts()
        .then((data) => setFetchedPosts(data))
        .catch((error) => console.error("Error fetching posts:", error));
    }
  }, [posts]);

  console.log(posts); 


  const displayPosts = posts.length > 0 ? posts : fetchedPosts;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {displayPosts.filter(Boolean).length > 0 ? ( 
        displayPosts
          .filter(Boolean) 
          .map((post) => (
            <PostCard key={post.id} post={post} /> 
          ))
      ) : (
        <p className="text-center text-gray-500">No posts to display.</p>
      )}
    </div>
  );
};

export default PostList;
