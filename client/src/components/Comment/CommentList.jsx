import React, { useEffect } from 'react';
import { getComments } from '../../api/api';
import { formatDistanceToNow } from 'date-fns'; // Import function from date-fns

const CommentList = ({ postId, comments, setComments }) => {
  useEffect(() => {
    if (postId) {
      getComments(postId)
        .then((fetchedComments) => {
          console.log('Fetched comments:', fetchedComments);
          setComments(fetchedComments || []);
        })
        .catch((error) => {
          console.error('Error fetching comments:', error);
          setComments([]);
        });
    }
  }, [postId, setComments]);

  return (
    <div className="comments-section mt-6 space-y-4">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-4">
            <img
              src={comment.user_avatar || '/default-avatar.jpg'}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-semibold text-gray-800">{comment.user_name || 'Anonymous'}</h4>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                </span>
              </div>
              <p className="text-gray-700 mt-2">{comment.content}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-4">No comments yet. Be the first to reply!</p>
      )}
    </div>
  );
};

export default CommentList;




// import React, { useEffect } from 'react';
// import { getComments } from '../../api/api';

// const CommentList = ({ postId, comments, setComments }) => {
//   useEffect(() => {
//     if (postId) {
//       getComments(postId)
//         .then(fetchedComments => {
//           console.log('Fetched comments:', fetchedComments);
//           setComments(fetchedComments || []);
//         })
//         .catch(error => {
//           console.error('Error fetching comments:', error);
//           setComments([]);
//         });
//     }
//   }, [postId, setComments]);
//   return (
//     <div className="comments-section mt-6">
//       <h3 className="text-xl font-semibold text-gray-800">Comments</h3>
//       {comments.length > 0 ? (
//         comments.map(comment => (
//           <div key={comment.id} className="comment mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
//             <p className="text-gray-700">{comment.content}</p>
//             {/* <small className="text-sm text-gray-500 block mt-2">Posted by: {comment.created_at}</small> */}
//             <small className="text-sm text-gray-500 block mt-2">Posted by: {comment.user_name} on {comment.created_at}</small>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-500 mt-4">No comments yet.</p>
//       )}
//     </div>
//   );
// }

// export default CommentList;

