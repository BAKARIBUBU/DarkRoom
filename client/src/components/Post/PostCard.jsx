import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  // Retrieve the profile picture and username from local storage
  const profilePicture = localStorage.getItem("user_profile_picture") || "/default-avatar.jpg";
  const username = localStorage.getItem("username") || "Anonymous";  // Fallback to "Anonymous" if no username is found

  return (
    <div className="bg-white border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition duration-200">
      <div className="flex items-start space-x-4">
        <img
          src={profilePicture}
          alt="User Avatar"
          className="w-14 h-14 rounded-full object-cover"  // Increased size from w-10 h-10 to w-14 h-14
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-900">{post.author || username}</h3>
            <span className="text-xs text-gray-500">2h ago</span> {/* Replace with dynamic time */}
          </div>
          <p className="text-gray-700 text-sm mt-1">{post.content}</p>
          {post.movie && (
            <div className="movie-info mt-3">
              <img
                src={post.movie.poster_url || "/default-image.jpg"}
                alt={post.movie.title}
                className="w-full h-48 rounded-lg object-cover"  // Increased height from h-40 to h-48 for the movie image
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



// import React from 'react';
// import { Link } from 'react-router-dom';

// const PostCard = ({ post }) => {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
//       <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.content}</h3>
//       {post.movie && (
//         <div className="movie-info mb-4">
//           <img
//             src={post.movie.poster_url || '/default-image.jpg'}
//             alt={post.movie.title}
//             className="w-full h-auto rounded-lg object-cover mb-2"
//           />
//           <h4 className="text-lg font-medium text-gray-800">{post.movie.title}</h4>
//         </div>
//       )}
//       <Link
//         to={`/posts/${post.id}`}
//         className="text-blue-500 hover:text-blue-700 text-sm font-semibold"
//       >
//         View Post
//       </Link>
//     </div>
//   );
// };

// export default PostCard;

