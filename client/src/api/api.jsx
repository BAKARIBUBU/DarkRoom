import axios from 'axios';
import qs from 'qs';

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
    const response = await api.post('/posts', { user_id, club_id, content, movie_title, movie_poster_url });
    return response.data.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Comment-related API calls
export const getComments = async (post_id) => {
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
  try {
    const response = await api.post(`/comments/${post_id}`, commentData, {
      headers: getAuthHeader(), // Automatically include the Authorization header
    });
    return response.data.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
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