import React, { useEffect } from 'react';
import { getComments } from '../../api/api'; 

const CommentList = ({ postId, comments, setComments }) => {
  useEffect(() => {
    if (postId) {
      getComments(postId)  
        .then(fetchedComments => {
          console.log('Fetched comments:', fetchedComments);
          setComments(fetchedComments || []); 
        })
        .catch(error => {
          console.error('Error fetching comments:', error);
          setComments([]);  
        });
    }
  }, [postId, setComments]);  
  return (
    <div className="comments-section mt-6">
      <h3 className="text-xl font-semibold text-gray-800">Comments</h3>
      {comments.length > 0 ? (
        comments.map(comment => (
          <div key={comment.id} className="comment mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <p className="text-gray-700">{comment.content}</p>
            {/* <small className="text-sm text-gray-500 block mt-2">Posted by: {comment.created_at}</small> */}
            <small className="text-sm text-gray-500 block mt-2">Posted by: {comment.user_name} on {comment.created_at}</small>
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-4">No comments yet.</p>
      )}
    </div>
  );
}

export default CommentList;

