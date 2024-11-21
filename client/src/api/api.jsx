import axios from 'axios';

const api = axios.create({
  baseURL: 'https://darkroombackend.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  }
});

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
    console.log(response);

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
    console.log('Valid Posts:', validPosts); // Debugging
    return validPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};


// export const getPosts = async () => {
//   try {
//     const response = await api.get('/posts');
//     console.log('Fetched posts:', response.data.data);

//     return response.data.data;
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     throw error;
//   }
// };

export const getComments = async (post_id) => {
  console.log("Post ID:", post_id)
  const token = localStorage.getItem('access_token');
  // console.log("JWT Token:", token);

  try {
    const response = await api.get(`/comments/${post_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response);
    console.log("Fetched comments:", response.data.data);
    return response.data.data;
   } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};


export const createComment = async (post_id, commentData) => {
  console.log("Post ID:", post_id)
  console.log("Comment Data:", commentData);

  const token = localStorage.getItem('access_token');
  // console.log("JWT Token:", token);

  try {
    const response = await api.post(`/comments/${post_id}`,
      { content: commentData },
        {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
