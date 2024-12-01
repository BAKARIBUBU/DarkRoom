import React from "react";
import { Link } from "react-router-dom";
import { timeAgo } from "../utilis/time";

const PostCard = ({ post }) => {
  const profilePicture = post.user?.profile_picture || "/default-avatar.jpg";
  console.log("profile pic", profilePicture);
  
  const username = post.user?.username || "Anonymous"; 
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition duration-200">
      <div className="flex items-start space-x-4">
        <img
          src={profilePicture}
          alt="Avatar"
          className="w-14 h-14 rounded-full object-cover"  
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-900">{username}</h3>
            <span className="text-xs text-gray-500">{timeAgo(post.created_at)}</span>
          </div>
          <p className="text-gray-700 text-sm mt-1">{post.content}</p>
          {post.movie && (
            <div className="movie-info mt-3">
              <img
                src={post.movie.poster_url || "/default-image.jpg"}
                alt={post.movie.title}
                className="w-full h-48 rounded-lg object-cover"  
              />
              <h4 className="text-sm font-medium text-gray-800 mt-2">{post.movie.title}</h4>
            </div>
          )}
          <div className="flex items-center space-x-6 mt-3 text-gray-500 text-sm">
            <Link
              to={`/posts/${post.id}`}
              className="flex items-center space-x-1 hover:text-blue-500"
            >
              <i className="far fa-comment"></i>
              <span>Comment</span>
            </Link>
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <i className="far fa-heart"></i>
              <span>Like</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <i className="fas fa-share"></i>
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;