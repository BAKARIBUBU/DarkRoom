// import React, { useState } from 'react';
// import { createPostWithMovie } from '../../../api/api';

// const CreatePostForm = ({ userId, clubId }) => {
//   const [content, setContent] = useState('');
//   const [movieTitle, setMovieTitle] = useState('');
//   const [moviePosterUrl, setMoviePosterUrl] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const newPost = await createPostWithMovie(userId, clubId, content, movieTitle, moviePosterUrl);
//       console.log('Post created successfully:', newPost);
//       // Optionally redirect or clear form
//     } catch (error) {
//       console.error('Error creating post:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <textarea
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         placeholder="Write your post content"
//       />
//       <input
//         type="text"
//         value={movieTitle}
//         onChange={(e) => setMovieTitle(e.target.value)}
//         placeholder="Movie Title"
//       />
//       <input
//         type="text"
//         value={moviePosterUrl}
//         onChange={(e) => setMoviePosterUrl(e.target.value)}
//         placeholder="Movie Poster URL"
//       />
//       <button type="submit">Create Post</button>
//     </form>
//   );
// };

// export default CreatePostForm;

import React, { useState } from 'react';
import { createPostWithMovie } from '../../api/api';

const CreatePostForm = ({ userId, clubId }) => {
  const [content, setContent] = useState('');
  const [movieTitle, setMovieTitle] = useState('');
  const [moviePosterUrl, setMoviePosterUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content || !movieTitle || !moviePosterUrl) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const newPost = await createPostWithMovie(userId, clubId, content, movieTitle, moviePosterUrl);
      console.log('Post created successfully:', newPost);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="create-post-form">
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Post content"
          rows="4"
          required
        ></textarea>
        <input 
          type="text" 
          placeholder="Movie Title" 
          value={movieTitle} 
          onChange={(e) => setMovieTitle(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Movie Poster URL" 
          value={moviePosterUrl} 
          onChange={(e) => setMoviePosterUrl(e.target.value)} 
          required 
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePostForm;
