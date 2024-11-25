import React, { useState, useEffect } from "react";
import axios from "axios";
import RatingComponent from "../components/RatingComponent";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // Track selected movie
  const [form, setForm] = useState({
    title: "",
    genre: "",
    description: "",
    release_year: "",
    poster_url: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        // "https://darkroombackend.onrender.com/movies",
        'http://127.0.0.1:5000/movies',
         {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMovies(response.data.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "movies");

    setUploading(true);

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfxnefnjj/image/upload",
        formData
      );
      setForm({ ...form, poster_url: response.data.secure_url });
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      await axios.post(
        // "https://darkroombackend.onrender.com/movies", 
        'http://127.0.0.1:5000/movies',
        form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setForm({
        title: "",
        genre: "",
        description: "",
        release_year: "",
        poster_url: "",
      });
      fetchMovies(); // Refresh the list of movies
      setShowForm(false);
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  // Close the movie detail modal
  const closeModal = () => {
    setSelectedMovie(null);
  };

  // Close modal when clicking outside of the modal content
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="movie-container">
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('data:image/jpeg;base64,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')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-center text-white z-10">
          <div>
            <h1 className="text-4xl font-bold">Welcome to Movie Library</h1>
            <p className="text-xl">Explore the world of movies</p>
          </div>
        </div>
      </div>

      <div className="movies-wrapper py-8 px-4">
        <h2 className="text-2xl font-bold text-white mb-4">Trending Now</h2>
        <div className="flex overflow-x-scroll gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => setSelectedMovie(movie)}
              className="relative w-64 cursor-pointer transform transition-all hover:scale-105"
            >
              <img
                src={movie.poster_url}
                alt={movie.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold">{movie.title}</h3>
                <p className="text-sm">{movie.genre}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="bg-pink-600 text-white px-6 py-3 rounded-full mt-8 mx-auto block"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Close Form" : "Add New Movie"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 mt-8 mx-auto max-w-md rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg mt-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="genre" className="block font-medium text-gray-700">Genre</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={form.genre}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg mt-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg mt-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="release_year" className="block font-medium text-gray-700">Release Year</label>
            <input
              type="number"
              id="release_year"
              name="release_year"
              value={form.release_year}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg mt-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="poster" className="block font-medium text-gray-700">Poster</label>
            <input
              type="file"
              onChange={handleFileUpload}
              className="w-full p-3 border rounded-lg mt-2"
            />
            {uploading && <p className="text-blue-600">Uploading...</p>}
            {form.poster_url && (
              <img src={form.poster_url} alt="Uploaded Poster" className="w-32 h-32 object-cover mt-2" />
            )}
          </div>
          <button type="submit" className="bg-teal-600 text-white px-6 py-3 rounded-full mt-4 w-full">
            Add Movie
          </button>
        </form>
      )}

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          onClick={handleClickOutside} // Close when clicking outside modal
        >
          <div className="bg-white p-8 rounded-lg w-11/12 sm:w-1/2 md:w-1/3 relative">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-700 text-2xl"
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              <img
                src={selectedMovie.poster_url}
                alt={selectedMovie.title}
                className="w-64 h-96 object-cover rounded-lg shadow-lg mb-6"
              />
              <h2 className="text-2xl font-bold mb-4">{selectedMovie.title}</h2>
              <p className="text-xl text-gray-700 mb-2">Genre: {selectedMovie.genre}</p>
              <p className="text-lg text-gray-700 mb-2">Release Year: {selectedMovie.release_year}</p>
              <p className="text-gray-600">{selectedMovie.description}</p>
              {/* Embed Ratings Component */}
              <RatingComponent movieId={selectedMovie.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;



// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Movie = () => {
//   const [movies, setMovies] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     genre: "",
//     description: "",
//     release_year: "",
//     poster_url: "",
//   });
//   const [showForm, setShowForm] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   // Fetch movies when component mounts
//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   const fetchMovies = async () => {
//     try {
//       const token = localStorage.getItem("access_token"); // Get token from localStorage
//       const response = await axios.get("http://127.0.0.1:5555/movies", {
//         headers: {
//           Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//         },
//       });
//       setMovies(response.data.data);
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//       // Handle specific error, e.g., redirect to login if unauthorized
//       if (error.response && error.response.status === 401) {
//         console.error("Unauthorized! Please log in.");
//         // Optionally redirect to login page
//       }
//     }
//   };

//   const handleInputChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "movies"); // Replace with your Cloudinary preset

//     setUploading(true);

//     try {
//       const response = await axios.post(
//         "https://api.cloudinary.com/v1_1/dfxnefnjj/image/upload",
//         formData
//       );
//       setForm({ ...form, poster_url: response.data.secure_url });
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("access_token"); // Get token from localStorage
//       await axios.post("http://127.0.0.1:5555/movies", form, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//         },
//       });
//       setForm({
//         title: "",
//         genre: "",
//         description: "",
//         release_year: "",
//         poster_url: "",
//       });
//       fetchMovies(); // Refresh the list of movies
//       setShowForm(false);
//     } catch (error) {
//       console.error("Error creating movie:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-4xl font-bold text-center mb-8">Movie Library</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {movies.map((movie) => (
//           <div
//             key={movie.id}
//             className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
//           >
//             <img
//               src={movie.poster_url}
//               alt={movie.title}
//               className="w-full h-56 object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
//               <p className="text-gray-600">{movie.genre}</p>
//               <p className="text-gray-700 mt-2">{movie.description}</p>
//               <p className="text-gray-500 mt-2">Released: {movie.release_year}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <button
//         className="mt-8 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
//         onClick={() => setShowForm(!showForm)}
//       >
//         {showForm ? "Close Form" : "Add New Movie"}
//       </button>

//       {showForm && (
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-6 rounded shadow-md mt-6"
//         >
//           <div className="mb-4">
//             <label className="block text-gray-700 font-bold mb-2">Title</label>
//             <input
//               type="text"
//               name="title"
//               value={form.title}
//               onChange={handleInputChange}
//               className="w-full border rounded px-3 py-2"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-bold mb-2">Genre</label>
//             <input
//               type="text"
//               name="genre"
//               value={form.genre}
//               onChange={handleInputChange}
//               className="w-full border rounded px-3 py-2"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-bold mb-2">
//               Description
//             </label>
//             <textarea
//               name="description"
//               value={form.description}
//               onChange={handleInputChange}
//               className="w-full border rounded px-3 py-2"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-bold mb-2">
//               Release Year
//             </label>
//             <input
//               type="number"
//               name="release_year"
//               value={form.release_year}
//               onChange={handleInputChange}
//               className="w-full border rounded px-3 py-2"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-bold mb-2">Poster</label>
//             <input
//               type="file"
//               onChange={handleFileUpload}
//               className="w-full border rounded px-3 py-2"
//             />
//             {uploading && <p className="text-blue-500">Uploading...</p>}
//             {form.poster_url && (
//               <img
//                 src={form.poster_url}
//                 alt="Uploaded Poster"
//                 className="mt-4 w-32 h-32 object-cover rounded"
//               />
//             )}
//           </div>
//           <button
//             type="submit"
//             className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
//           >
//             Add Movie
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default Movie;

