import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000', // Replace with your backend API URL
  headers: {
    'Content-Type': 'application/json',
  }
});

// Create post with movie
export const createPostWithMovie = async (user_id, club_id, content, movie_title, movie_poster_url) => {
  try {
    const response = await api.post('/posts', { user_id, club_id, content, movie_title, movie_poster_url });
    console.log(response);
    
    return response.data.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Get all posts
export const getPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// // Get comments for a specific post
// export const getComments = async (post_id) => {
//   try {
//     const response = await api.get(`/comments/${post_id}`);
//     // const response = await api.get(`/posts/${post_id}/comments`);
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching comments:', error);
//     throw error;
//   }
// };

// // Create a comment for a specific post
// export const createComment = async (post_id, commentData) => {
//   try {
//     const response = await api.post(`/comments/${post_id}`, commentData);
//     // const response = await api.post(`/posts/${post_id}/comments`, commentData);
//         console.log(response);
//     return response.data;
    
//   } catch (error) {
//     console.error('Error creating comment:', error);
//     throw error;
//   }
// };

// Fetch comments for a specific post
export const getComments = async (post_id) => {
  console.log("Post ID:", post_id)
  const token = localStorage.getItem('token');  // Assuming the token is stored in localStorage
  console.log("JWT Token:", token);
  
  try {
    const response = await api.get(`/comments/${post_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Send the JWT token in the Authorization header
      },
    });
    console.log(response);
    console.log("Fetched comments:", response.data.data);
    return response.data.data;
   } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

// Create a new comment for a specific post
export const createComment = async (post_id, commentData) => {
  console.log("Post ID:", post_id)
  console.log("Comment Data:", commentData);

  const token = localStorage.getItem('token');  // Assuming the token is stored in localStorage
  console.log("JWT Token:", token);

  try {
    const response = await api.post(`/comments/${post_id}`, commentData, {
      headers: {
        Authorization: `Bearer ${token}`,  // Send the JWT token in the Authorization header
      },
    });
    console.log(response);
    console.log("Fetched comments:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};
// export const createComment = async (post_id, commentData) => {
//   const token = localStorage.getItem('token');  // Assuming the token is stored in localStorage
//   try {
//     const response = await api.post(`/comments/${post_id}`, { content: commentData }, {
//       headers: {
//         Authorization: `Bearer ${token}`,  // Send the JWT token in the Authorization header
//       },
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error('Error creating comment:', error);
//     throw error;
//   }
// };
