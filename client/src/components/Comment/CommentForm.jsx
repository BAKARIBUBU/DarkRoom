import React, { useState } from 'react';
import { createComment } from '../../api/api';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createComment(postId, content);
      onCommentAdded();  // Trigger the parent component to refresh comments
      setContent('');  // Clear input after submission
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment..."
        required
      ></textarea>
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CommentForm;