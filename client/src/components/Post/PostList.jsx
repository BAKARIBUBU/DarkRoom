import React, { useState, useEffect } from 'react';
import { getPosts } from '../../api/api';
import PostCard from './PostCard';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
   // This effect runs whenever posts change
  useEffect(() => {
    // Any side effects you want to run when posts change can be placed here
    console.log('Posts updated:', posts);
  }, [posts]); 

  // Fetch posts whenever the component mounts
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
  

  const filteredPosts = posts.filter(post =>
    (post.movie && post.movie.title && post.movie.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (post.content && post.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="post-list">
      
      <div className="flex items-center space-x-4 mb-4">
        <input 
          type="text" 
          placeholder="Search by name or content..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {filteredPosts.length > 0 ? (
        filteredPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default PostList;
