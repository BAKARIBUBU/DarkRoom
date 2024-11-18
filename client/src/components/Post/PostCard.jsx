import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.content}</h3>
      {post.movie && (
        <div className="movie-info mb-4">
          <img 
            src={post.movie.poster_url || '/default-image.jpg'} 
            alt={post.movie.title} 
            className="w-full h-auto rounded-lg object-cover mb-2"
          />
          <h4 className="text-lg font-medium text-gray-800">{post.movie.title}</h4>
        </div>
      )}
      <Link 
        to={`/posts/${post.id}`} 
        className="text-blue-500 hover:text-blue-700 text-sm font-semibold"
      >
        View Post
      </Link>
    </div>
  );
};

export default PostCard;

