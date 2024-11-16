import React, { useState, useEffect } from 'react';
import { getPosts } from '../../api/api';
import PostCard from './PostCard';

// const PostList = () => {
//   const [posts, setPosts] = useState([]);

//   // Fetch posts data when the component mounts
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const postsData = await getPosts();
//         console.log(postsData);
//         setPosts(postsData.data); // Assuming your API returns posts in `data`
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <div className="post-list">
//       {posts.length > 0 ? (
//         posts.map((post) => (
//           // Render each post using the PostCard component
//           <PostCard key={post.id} post={post} />
//         ))
//       ) : (
//         <p>No posts to display.</p>
//       )}
//     </div>
//   );
// };
const PostList = ({ posts = [] }) => {
  return (
    <div className="post-list">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.content}</h3>
            {post.movie && (
              <div className="movie-info">
                <img 
                  src={post.movie.poster_url || '/default-image.jpg'} 
                  alt={post.movie.title} 
                />
                <h4>{post.movie.title}</h4>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No posts to display.</p>
      )}
    </div>
  );
};

export default PostList;
