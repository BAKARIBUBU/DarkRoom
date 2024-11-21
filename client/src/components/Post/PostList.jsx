import React, { useState, useEffect } from 'react';
import { getPosts } from '../../api/api';
import PostCard from './PostCard';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts whenever the component mounts or when a post is added
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getPosts();
        setPosts(postsData); // Update state when posts are fetched
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []); // Fetch posts when the component mounts

  // Fetch posts again when the posts array is updated (e.g., after adding a post)
  useEffect(() => {
    if (posts.length === 0) {
      getPosts()
        .then((data) => setPosts(data))
        .catch((error) => console.error("Error fetching posts:", error));
    }
  }, [posts]); // Dependency on posts state

  return (
    <div className="post-list">
      {posts.length > 0 ? (
        posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default PostList;
