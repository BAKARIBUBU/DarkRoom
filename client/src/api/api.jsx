import axios from 'axios';

// Create an Axios instance with base configuration
const api = axios.create({
  baseURL: 'http://127.0.0.1:5555', // Replace with your backend API URL
  headers: {
    'Content-Type': 'application/json',
  }
});

// Function to get the token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Post-related API calls
export const createPostWithMovie = async (user_id, club_id, content, movie_title, movie_poster_url) => {
  try {
    const token = localStorage.getItem('access_token');

    if (!token) {
      throw new Error('Authorization token is missing');
    }

    const response = await api.post('/posts', 
      { 
        user_id, 
        club_id, 
        content, 
        movie_title, 
        movie_poster_url 
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const response = await api.get('/posts');
    const validPosts = response.data.data.filter(Boolean); // Remove null values
    return validPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Comment-related API calls
export const getComments = async (post_id) => {
  const token = localStorage.getItem('access_token');  
  
  try {
    const response = await api.get(`/comments/${post_id}`, {
      headers: getAuthHeader(), // Automatically include the Authorization header
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const createComment = async (post_id, commentData) => {
  const token = localStorage.getItem('access_token');  

  try {
    const response = await api.post(`/comments/${post_id}`,
      { content: commentData },
        {
      headers: {
        Authorization: `Bearer ${token}`,  
      },
    const response = await api.post(`/comments/${post_id}`, commentData, {
      headers: getAuthHeader(), // Automatically include the Authorization header
    });
    console.log("Payload Sent:", { text: commentData });

    console.log(response);
    console.log("Fetched comments:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};
export const followUser = async (followedId) => {
  return axios.post(`${api}/follow`, { followed_id: followedId }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, 
    },
  });
};

export const unfollowUser = async (followedId) => {
  return axios.delete(`${api}/follow`, {
    data: { followed_id: followedId },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const getFollowers = async (user_id) => {
  return axios.get(`${api}/users/${user_id}/followers`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const getFollowings = async (user_id) => {
  return axios.get(`${api}/users/${user_id}/following`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

// Rating-related API calls
export const getRatings = async (movieId) => {
  try {
    const response = await api.get(`/ratings?movie_id=${movieId}`, {
      headers: getAuthHeader(), // Automatically include the Authorization header
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching ratings:', error);
    throw error;
  }
};