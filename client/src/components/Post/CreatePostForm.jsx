import React, { useState } from "react";

const CreatePostForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [moviePosterUrl, setMoviePosterUrl] = useState("");

  // Function to open the Cloudinary widget
  const openCloudinaryWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dfxnefnjj", // Replace with your Cloudinary cloud name
        uploadPreset: "posts_url", // Replace with your upload preset
        sources: ["local", "url", "camera"], // Allow uploads from these sources
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setMoviePosterUrl(result.info.secure_url); // Set the uploaded image URL
        }
      }
    );
    widget.open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content || !movieTitle || !moviePosterUrl) {
      console.error("All fields are required!");
      return;
    }

    onSubmit(content, movieTitle, moviePosterUrl);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="content"
        >
          Content
        </label>
        <input
          id="content"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="movieTitle"
        >
          Movie Title
        </label>
        <input
          id="movieTitle"
          type="text"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="moviePosterUrl"
        >
          Movie Poster
        </label>
        <button
          type="button"
          onClick={openCloudinaryWidget}
          className="mt-1 w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Upload Movie Poster
        </button>
        {moviePosterUrl && (
          <div className="mt-2">
            <p>Uploaded Poster:</p>
            <img src={moviePosterUrl} alt="Uploaded Movie Poster" className="mt-1 rounded-lg" />
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit Post
      </button>
    </form>
  );
};

export default CreatePostForm;



// import React, { useState } from 'react';

// const CreatePostForm = ({ onSubmit }) => {
//   const [content, setContent] = useState("");
//   const [movieTitle, setMovieTitle] = useState("");
//   const [moviePosterUrl, setMoviePosterUrl] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!content || !movieTitle || !moviePosterUrl) {
//       console.error("All fields are required!");
//       return;
//     }

//     onSubmit(content, movieTitle, moviePosterUrl);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700" htmlFor="content">Content</label>
//         <input
//           id="content"
//           type="text"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           required
//           className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700" htmlFor="movieTitle">Movie Title</label>
//         <input
//           id="movieTitle"
//           type="text"
//           value={movieTitle}
//           onChange={(e) => setMovieTitle(e.target.value)}
//           required
//           className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700" htmlFor="moviePosterUrl">Movie Poster URL</label>
//         <input
//           id="moviePosterUrl"
//           type="text"
//           value={moviePosterUrl}
//           onChange={(e) => setMoviePosterUrl(e.target.value)}
//           required
//           className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         Submit Post
//       </button>
//     </form>
//   );
// };

// export default CreatePostForm;
