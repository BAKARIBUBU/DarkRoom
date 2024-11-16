// import React, { useEffect, useState } from 'react';
// import { getComments } from '../../api/api';

// const CommentList = ({ postId }) => {
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const response = await getComments(postId);
//         setComments(response.data.data);
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     };

//     fetchComments();
//   }, [postId]);

//   return (
//     <div>
//       <h3>Comments:</h3>
//       <ul>
//         {comments.map((comment) => (
//           <li key={comment.id}>
//             <p>{comment.content}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CommentList;

// CommentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`/api/comments?post_id=${postId}`)
          .then(response => {
      console.log(response); 
      setComments(response.data.data || []); 
    })
  }, [postId]);

  return (
    <div>
      <h3>Comments</h3>
      {comments.length > 0 ? (
        comments.map(comment => (
          <div key={comment.id}>
            <p>{comment.content}</p>
            <small>{comment.created_at}</small>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default CommentList;

// import React, { useEffect, useState } from 'react';
// import { getComments } from '../../api/api';

// const CommentList = ({ postId }) => {
//   const [comments, setComments] = useState([]);
//   const [page, setPage] = useState(1); // Pagination state
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const response = await getComments(postId, page);
//         setComments(response.data);
//         setTotalPages(response.totalPages);  // Assuming the API returns totalPages for pagination
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     };

//     fetchComments();
//   }, [postId, page]);

//   const handleNextPage = () => {
//     if (page < totalPages) {
//       setPage(page + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (page > 1) {
//       setPage(page - 1);
//     }
//   };

//   return (
//     <div>
//       <h3>Comments:</h3>
//       <ul>
//         {comments.map((comment) => (
//           <li key={comment.id}>
//             <p>{comment.content}</p>
//           </li>
//         ))}
//       </ul>

//       <div className="pagination">
//         <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
//         <span>Page {page} of {totalPages}</span>
//         <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
//       </div>
//     </div>
//   );
// };

// export default CommentList;
