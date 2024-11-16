import React, { useState } from 'react'; // Import React and useState hook
import { createPostWithMovie } from '../../api/api'; // Import createPostWithMovie from your API module


const CreatePostForm = ({ userId, clubId, onPostCreated }) => {
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
      await createPostWithMovie(userId, clubId, content, movieTitle, moviePosterUrl);
      alert('Post created successfully!');
      setContent('');
      setMovieTitle('');
      setMoviePosterUrl('');
      onPostCreated(); // Notify parent to refresh the post list
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post.');
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

// const CreatePostForm = ({ userId, clubId, onPostCreated }) => {
//   const [content, setContent] = useState('');
//   const [movieTitle, setMovieTitle] = useState('');
//   const [moviePosterUrl, setMoviePosterUrl] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!content || !movieTitle || !moviePosterUrl) {
//       alert("Please fill in all fields.");
//       return;
//     }
//     try {
//       await createPostWithMovie(userId, clubId, content, movieTitle, moviePosterUrl);
//       alert('Post created successfully!');
//       setContent('');
//       setMovieTitle('');
//       setMoviePosterUrl('');
//       onPostCreated(); // Notify parent to refresh the post list
//     } catch (error) {
//       console.error('Error creating post:', error);
//       alert('Failed to create post.');
//     }
//   };

//   return (
//     <div className="create-post-form">
//       <h2>Create a Post</h2>
//       <form onSubmit={handleSubmit}>
//         <textarea 
//           value={content} 
//           onChange={(e) => setContent(e.target.value)} 
//           placeholder="Post content"
//           rows="4"
//           required
//         ></textarea>
//         <input 
//           type="text" 
//           placeholder="Movie Title" 
//           value={movieTitle} 
//           onChange={(e) => setMovieTitle(e.target.value)} 
//           required 
//         />
//         <input 
//           type="text" 
//           placeholder="Movie Poster URL" 
//           value={moviePosterUrl} 
//           onChange={(e) => setMoviePosterUrl(e.target.value)} 
//           required 
//         />
//         <button type="submit">Create Post</button>
//       </form>
//     </div>
//   );
// };

export default CreatePostForm;
