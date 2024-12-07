
// import axios from 'axios';
// import qs from 'qs';

// // Create an Axios instance with base configuration
// const api = axios.create({
//   baseURL: 'https://darkroombackend.onrender.com', 
//   headers: {
//     'Content-Type': 'application/json',
//   }
// });

// // import axios from 'axios';
// export const CheckFollowStatus = async (userId) => {
//     const token = localStorage.getItem('access_token'); // Get the token from local storage

//     const response = await axios.get(`/follow/status/${userId}`, {
//         headers: {
//             Authorization: `Bearer ${token}`, // Include the token in the headers
//         },
//     });

//     return response.data.isFollowing; // Assuming the response contains an isFollowing field
// };


// // export const CheckFollowStatus = async (userId) => {
// //     const token = localStorage.getItem('access_token'); // Get the token from local storage

// //     try {
// //         const response = await axios.get(`/follow/status/${userId}`, {
// //             headers: {
// //                 Authorization: `Bearer ${token}`, // Include the token in the headers
// //             },
// //         });
// //         return response.data.isFollowing; // Assuming the response contains an isFollowing field
// //     } catch (error) {
// //         throw error; // Rethrow the error to handle it in the calling function
// //     }
// // };

// // Function to get the token from localStorage
// const getAuthHeader = () => {
//   const token = localStorage.getItem('access_token');
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// // Post-related API calls
// export const createPostWithMovie = async (user_id, club_id, content, movie_title, movie_poster_url) => {
//   try {

//     const token = localStorage.getItem('access_token');

//     if (!token) {
//       throw new Error('Authorization token is missing');
//     }

//     const response = await api.post('/posts', 
//       { 
//         user_id, 
//         club_id, 
//         content, 
//         movie_title, 
//         movie_poster_url 
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     // const response = await api.post('/posts', 
//     //   { 
//     //     user_id, 
//     //     club_id, 
//     //     content, 
//     //     movie_title, 
//     //     movie_poster_url 
//     //   },
//     //   {
//     //     headers: {
//     //       Authorization: `Bearer ${token}`, // Add Authorization header
//     //     },
//     //   }
//     // );
//     // // console.log(response);

//   //   const response = await api.post('/posts', { user_id, club_id, content, movie_title, movie_poster_url });
//   //   return response.data.data;
//   // } catch (error) {
//   //   console.error('Error creating post:', error);
//   //   throw error;
//   // }
// // };

// // export const getPosts = async (userId) => {
// //   try {
// //     // If userId is provided, fetch posts for that user; otherwise, fetch all posts
// //     const endpoint = userId ? `/users/${userId}/posts` : '/posts';
// //     const response = await api.get(endpoint);
    
// //     const validPosts = response.data.data.filter(Boolean); // Remove null values
// //     console.log('Valid Posts:', validPosts); // Debugging
// //     return validPosts;
// //   } catch (error) {
// //     console.error('Error fetching posts:', error);
// //     throw error;
// //   }
// // };

// export const getPosts = async () => {
//   try {
//     const response = await api.get('/posts');
//     const validPosts = response.data.data.filter(Boolean); // Remove null values
//     // console.log('Valid Posts:', validPosts); // Debugging
//     return validPosts;
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     throw error;
//   }
// };

// // Comment-related API calls
// export const getComments = async (post_id) => {
//   // console.log("Post ID:", post_id)
//   const token = localStorage.getItem('access_token');  
//   // console.log("JWT Token:", token);
  
//   try {
//     const response = await api.get(`/comments/${post_id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,  
//       },
//       headers: getAuthHeader(), // Automatically include the Authorization header
//     });
//     // console.log(response);
//     console.log("Fetched comments:", response.data.data);
//     return response.data.data;
//   } catch (error) {
//     console.error('Error fetching comments:', error);
//     throw error;
//   }
// };

// export const createComment = async (post_id, commentData) => {
//   try {
//     const response = await api.post(`/comments/${post_id}`, commentData, {
//       headers: getAuthHeader(), // Automatically include the Authorization header
//     });
//     console.log("Payload Sent:", { text: commentData });

//     console.log(response);
//     console.log("Fetched comments:", response.data.data);
//     return response.data.data;
//   } catch (error) {
//     console.error('Error getting followers:', error);
//     throw error; // Rethrow the error to handle it in the calling function
//   }
// };

// export const getFollowers = async (userId) => {
//   // console.log("Fetching followers for user_id:", userId);
//   const token = localStorage.getItem('access_token');
//   const url = `https://darkroombackend.onrender.com/users/${userId}/followers`;

//   try {
//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     console.log(response);
//     return response.data.data; // Adjust this based on your actual API response structure
//   } catch (error) {
//     console.error('Error getting followers:', error);
//     throw error; // Rethrow the error to handle it in the calling function
//   }
// };

// // Follow user function
// export const FollowUser  = async (followedId) => {
//   const token = localStorage.getItem('access_token'); // Get the token from local storage

//   try {
//     const response = await api.post(`/follow`, {followed_id: followedId}, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Include the token in the headers
//       },
//     });
//     console.log(response);
    
//     return response.data; // Return the response data
//   } catch (error) {
//     console.error('Error following user:', error);
//     throw error; // Rethrow the error for further handling
//   }
// };

// export const UnFollowUser = async (followedId) => {
//   console.log("Unfollow user ID:", followedId);

//   const token = localStorage.getItem('access_token');  
//   console.log("JWT Token:", token);

//   try {
//     const response = await axios.delete(`https://darkroombackend.onrender.com/follow`, {
//       data: { followed_id: followedId }, // Payload for the unfollow action
//       headers: {
//         Authorization: `Bearer ${token}`, // JWT for authorization
//       },
//     });

//     // console.log("Unfollow Response:", response);
//     return response.data; // Adjust based on your API's response structure
//   } catch (error) {
//     console.error("Error unfollowing user:", error);
//     throw error;
//   }
// };

// export const getFollowings = async (user_id) => {
//   // console.log("Fetching followings for user_id:", user_id);

//   try {
//     const response = await axios.get(`https://darkroombackend.onrender.com/users/${user_id}/following`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('access_token')}`,
//       },
//     });
//     console.log('Followings response:', response); // Log the full response
//     return response.data.data; // Adjust based on your API response structure
//   } catch (error) {
//     console.error('Error getting followings:', error);
//     throw error;
//   }
// };


// // Rating-related API calls
// export const getRatings = async (movieId) => {
//   try {
//     const response = await api.get(`/ratings?movie_id=${movieId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error('Error fetching ratings:', error);
//     throw error;
//   }
import axios from 'axios';

// Create an Axios instance with base configuration
const api = axios.create({
  baseURL: 'https://darkroombackend.onrender.com', 
  headers: {
    'Content-Type': 'application/json',
  }
});

// Function to get the token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Check follow status
export const CheckFollowStatus = async (userId) => {
  const token = localStorage.getItem('access_token'); // Get the token from local storage

  const response = await axios.get(`/follow/status/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the headers
    },
  });

  return response.data.isFollowing; // Assuming the response contains an isFollowing field
};

// Create a post with movie
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
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // Return the response data after the post is created
  } catch (error) {
    console.error('Error creating post:', error);
    throw error; // Rethrow the error to be handled in the calling function
  }
};

// Get posts
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

// Get comments for a post
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

// Create a comment on a post
export const createComment = async (post_id, commentData) => {
  try {
    const response = await api.post(`/comments/${post_id}`, commentData, {
      headers: getAuthHeader(), // Automatically include the Authorization header
    });

    return response.data.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error; // Rethrow the error for further handling
  }
};

// Get followers of a user
export const getFollowers = async (userId) => {
  const token = localStorage.getItem('access_token');
  const url = `https://darkroombackend.onrender.com/users/${userId}/followers`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data; // Adjust based on your actual API response structure
  } catch (error) {
    console.error('Error getting followers:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

// Follow a user
export const FollowUser = async (followedId) => {
  const token = localStorage.getItem('access_token'); // Get the token from local storage

  try {
    const response = await api.post(`/follow`, { followed_id: followedId }, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
    });

    return response.data; // Return the response data
  } catch (error) {
    console.error('Error following user:', error);
    throw error; // Rethrow the error for further handling
  }
};

// Unfollow a user
export const UnFollowUser = async (followedId) => {
  const token = localStorage.getItem('access_token');  

  try {
    const response = await axios.delete(`https://darkroombackend.onrender.com/follow`, {
      data: { followed_id: followedId }, // Payload for the unfollow action
      headers: {
        Authorization: `Bearer ${token}`, // JWT for authorization
      },
    });

    return response.data; // Adjust based on your API's response structure
  } catch (error) {
    console.error('Error unfollowing user:', error);
    throw error;
  }
};

// Get followings of a user
export const getFollowings = async (user_id) => {
  try {
    const response = await axios.get(`https://darkroombackend.onrender.com/users/${user_id}/following`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    return response.data.data; // Adjust based on your API response structure
  } catch (error) {
    console.error('Error getting followings:', error);
    throw error;
  }
};

// Get ratings for a movie
export const getRatings = async (movieId) => {
  try {
    const response = await api.get(`/ratings?movie_id=${movieId}`, {
      headers: getAuthHeader(),
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching ratings:', error);
    throw error;
  }
};

