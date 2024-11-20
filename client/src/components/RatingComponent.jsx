// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const RatingComponent = ({ movieId, currentUser }) => {
//   const [ratings, setRatings] = useState([]);
//   const [form, setForm] = useState({ score: "", review: "" });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     fetchRatings();
//   }, [movieId]);

//   const fetchRatings = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:5555/ratings", {
//         params: { movie_id: movieId },
//       });
//       setRatings(response.data.data);
//     } catch (error) {
//       console.error("Error fetching ratings:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       const token = localStorage.getItem("access_token");
//       await axios.post(
//         "http://127.0.0.1:5555/ratings",
//         { ...form, movie_id: movieId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       fetchRatings(); // Refresh ratings list
//       setForm({ score: "", review: "" }); // Reset form
//     } catch (error) {
//       console.error("Error submitting rating:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDelete = async (ratingId) => {
//     try {
//       const token = localStorage.getItem("access_token");
//       await axios.delete(`http://127.0.0.1:5555/ratings/${ratingId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       fetchRatings(); // Refresh ratings list
//     } catch (error) {
//       console.error("Error deleting rating:", error);
//     }
//   };

//   return (
//     <div className="rating-component bg-white p-4 rounded shadow-md">
//       <h3 className="text-lg font-bold mb-4">Ratings</h3>

//       {/* Display Ratings */}
//       <ul className="space-y-4">
//         {ratings.map((rating) => (
//           <li key={rating.id} className="p-4 bg-gray-100 rounded shadow">
//             <p>
//               <strong>Score:</strong> {rating.score}/10
//             </p>
//             <p>
//               <strong>Review:</strong> {rating.review}
//             </p>
//             <p>
//               <strong>By:</strong> {rating.user_name || "Anonymous"}
//             </p>
//             {rating.user_id === currentUser.id && (
//               <button
//                 onClick={() => handleDelete(rating.id)}
//                 className="text-red-600 mt-2"
//               >
//                 Delete
//               </button>
//             )}
//           </li>
//         ))}
//       </ul>

//       {/* Submit Rating Form */}
//       <form onSubmit={handleSubmit} className="mt-6">
//         <div className="mb-4">
//           <label className="block font-medium text-gray-700">Score</label>
//           <input
//             type="number"
//             name="score"
//             value={form.score}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             min="1"
//             max="10"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block font-medium text-gray-700">Review</label>
//           <textarea
//             name="review"
//             value={form.review}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             required
//           ></textarea>
//         </div>
//         <button
//           type="submit"
//           className="bg-teal-600 text-white px-4 py-2 rounded"
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? "Submitting..." : "Submit Rating"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RatingComponent;
import React, { useState, useEffect } from "react";
import axios from "axios";

const RatingComponent = ({ movieId }) => {
  const [ratings, setRatings] = useState([]);
  const [userRating, setUserRating] = useState(null); // Current user's rating
  const [form, setForm] = useState({ score: "", review: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

  useEffect(() => {
    fetchRatings();
  }, [movieId]);

  const fetchRatings = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5555/ratings", {
        params: { movie_id: movieId },
      });
      setRatings(response.data.data);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("access_token");
      await axios.post(
        "http://127.0.0.1:5555/ratings",
        { ...form, movie_id: movieId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchRatings(); // Refresh the ratings list
      setForm({ score: "", review: "" }); // Reset form
      setShowForm(false); // Hide form after submission
    } catch (error) {
      console.error("Error submitting rating:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (ratingId) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://127.0.0.1:5555/ratings/${ratingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchRatings(); // Refresh the ratings list
    } catch (error) {
      console.error("Error deleting rating:", error);
    }
  };

  return (
    <div className="rating-component bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-bold mb-4">Ratings</h3>

      {/* Display Ratings */}
      {ratings.length > 0 ? (
        <ul className="space-y-4">
          {ratings.map((rating) => (
            <li key={rating.id} className="p-4 bg-gray-100 rounded shadow">
              <p>
                <strong>Score:</strong> {rating.score}/10
              </p>
              <p>
                <strong>Review:</strong> {rating.review}
              </p>
              <button
                onClick={() => handleDelete(rating.id)}
                className="text-red-600 mt-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No ratings available.</p>
      )}

      {/* Button to Toggle Rating Form */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-teal-600 text-white px-4 py-2 rounded mt-4"
      >
        {showForm ? "Cancel" : "Submit Rating"}
      </button>

      {/* Rating Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Score</label>
            <input
              type="number"
              name="score"
              value={form.score}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              min="1"
              max="10"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Review</label>
            <textarea
              name="review"
              value={form.review}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-teal-600 text-white px-4 py-2 rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Rating"}
          </button>
        </form>
      )}
    </div>
  );
};

export default RatingComponent;
