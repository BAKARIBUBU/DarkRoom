import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <h3>{post.content}</h3>
      {post.movie && (
        <div className="movie-info">
          <img src={post.movie.poster_url || '/default-image.jpg'} alt={post.movie.title} />
          <h4>{post.movie.title}</h4>
        </div>
      )}
      <Link to={`/posts/${post.id}`}>View Post</Link>
    </div>
  );
};

export default PostCard;
