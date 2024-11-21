import React, { useState } from 'react';
import { createComment } from '../../api/api';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const profilePicture = localStorage.getItem('user_profile_picture') || '/default-avatar.jpg'; // User avatar

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createComment(postId, content);
      onCommentAdded();
      setContent('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="flex items-start space-x-4 mt-6">
      <img
        src={profilePicture}
        alt="User Avatar"
        className="w-10 h-10 rounded-full object-cover"
      />
      <form onSubmit={handleSubmit} className="flex-1">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
          required
          className="w-full p-3 text-gray-800 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows="2"
        ></textarea>
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Reply
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;


// import React, { useState } from 'react';
// import { createComment } from '../../api/api';

// const CommentForm = ({ postId, onCommentAdded }) => {
//   const [content, setContent] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createComment(postId, content);
//       onCommentAdded();
//       setContent('');
//     } catch (error) {
//       console.error('Error adding comment:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mt-6">
//       <textarea
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         placeholder="Write your comment..."
//         required
//         className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
//       ></textarea>
//       <button
//         type="submit"
//         className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         Add Comment
//       </button>
//     </form>
//   );
// };

// export default CommentForm;
