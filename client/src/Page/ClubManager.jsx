
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ClubManager = () => {
//   const [clubs, setClubs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [userClubs, setUserClubs] = useState([]);
//   const [userId, setUserId] = useState(localStorage.getItem("user_id"));
//   const accessToken = localStorage.getItem("access_token");

//   useEffect(() => {
//     // Fetch all clubs and user-specific clubs
//     fetchClubs();
//     if (userId) {
//       fetchUserClubs(userId);
//     }
//   }, [userId]);

//   // Fetch all clubs
//   const fetchClubs = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://127.0.0.1:5555/clubs', {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       if (response.data && Array.isArray(response.data.data)) {
//         setClubs(response.data.data);
//       } else {
//         setClubs([]); // Fallback in case the API response isn't in expected format
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to load clubs.");
//       setClubs([]); // Fallback if the API call fails
//       setLoading(false);
//     }
//   };

//   // Fetch clubs a user is part of
//   const fetchUserClubs = async (userId) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://127.0.0.1:5555/users/${userId}/clubs`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       if (response.data && Array.isArray(response.data.data)) {
//         setUserClubs(response.data.data);
//       } else {
//         setUserClubs([]); // Fallback in case the API response isn't in expected format
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to load your clubs.");
//       setUserClubs([]); // Fallback if the API call fails
//       setLoading(false);
//     }
//   };

//   // Handle joining a club
//   const handleJoinClub = async (clubId) => {
//     setLoading(true);
//     try {
//       const response = await axios.post('http://127.0.0.1:5555/clubs/join', {
//         user_id: userId,
//         club_id: clubId,
//       }, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       setMessage(response.data.message);
//       fetchUserClubs(userId); // Refresh user clubs list
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to join the club.");
//       setLoading(false);
//     }
//   };

//   // Handle leaving a club
//   const handleLeaveClub = async (clubId) => {
//     setLoading(true);
//     try {
//       const response = await axios.delete(`http://127.0.0.1:5555/clubs/leave/${userId}/${clubId}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       setMessage(response.data.message);
//       fetchUserClubs(userId); // Refresh user clubs list
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to leave the club.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {loading && <p className="text-center text-lg font-semibold text-blue-500">Loading...</p>}
//       {message && <p className="text-center text-lg font-semibold text-red-500">{message}</p>}

//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-700">All Clubs</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
//           {Array.isArray(clubs) && clubs.length > 0 ? (
//             clubs.map((club) => (
//               <div key={club.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
//                 <h3 className="text-xl font-semibold text-gray-800">{club.name}</h3>
//                 <p className="text-gray-600 mt-2">{club.description}</p>
//                 <button
//                   onClick={() => handleJoinClub(club.id)}
//                   className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
//                 >
//                   Join Club
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-600 col-span-full">No clubs available.</p>
//           )}
//         </div>
//       </div>

//       <div>
//         <h2 className="text-2xl font-bold text-gray-700">Your Clubs</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
//           {Array.isArray(userClubs) && userClubs.length > 0 ? (
//             userClubs.map((club) => (
//               <div key={club.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
//                 <h3 className="text-xl font-semibold text-gray-800">{club.name}</h3>
//                 <button
//                   onClick={() => handleLeaveClub(club.id)}
//                   className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
//                 >
//                   Leave Club
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-600 col-span-full">You are not a member of any clubs.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClubManager;

// Do not delete 162-401
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ClubManager = () => {
//   const [clubs, setClubs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [userClubs, setUserClubs] = useState([]);
//   const [userId, setUserId] = useState(localStorage.getItem("user_id"));
//   const accessToken = localStorage.getItem("access_token");
//   const [selectedImage, setSelectedImage] = useState(null); // Store the uploaded image URL
//   const [currentClubId, setCurrentClubId] = useState(null); // To track the club being uploaded for

//   useEffect(() => {
//     // Fetch all clubs and user-specific clubs
//     fetchClubs();
//     if (userId) {
//       fetchUserClubs(userId);
//     }
//   }, [userId]);

//   // Fetch all clubs
//   const fetchClubs = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://127.0.0.1:5555/clubs', {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       if (response.data && Array.isArray(response.data.data)) {
//         setClubs(response.data.data);
//       } else {
//         setClubs([]); // Fallback in case the API response isn't in expected format
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to load clubs.");
//       setClubs([]); // Fallback if the API call fails
//       setLoading(false);
//     }
//   };

//   // Fetch clubs a user is part of
//   const fetchUserClubs = async (userId) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://127.0.0.1:5555/users/${userId}/clubs`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       if (response.data && Array.isArray(response.data.data)) {
//         setUserClubs(response.data.data);
//       } else {
//         setUserClubs([]); // Fallback in case the API response isn't in expected format
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to load your clubs.");
//       setUserClubs([]); // Fallback if the API call fails
//       setLoading(false);
//     }
//   };

//   // Handle joining a club
//   const handleJoinClub = async (clubId) => {
//     setLoading(true);
//     try {
//       const response = await axios.post('http://127.0.0.1:5555/clubs/join', {
//         user_id: userId,
//         club_id: clubId,
//       }, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       setMessage(response.data.message);
//       fetchUserClubs(userId); // Refresh user clubs list
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to join the club.");
//       setLoading(false);
//     }
//   };

//   // Handle leaving a club
//   const handleLeaveClub = async (clubId) => {
//     setLoading(true);
//     try {
//       const response = await axios.delete(`http://127.0.0.1:5555/clubs/leave/${userId}/${clubId}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       setMessage(response.data.message);
//       fetchUserClubs(userId); // Refresh user clubs list
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to leave the club.");
//       setLoading(false);
//     }
//   };

//   // Handle image upload (Cloudinary widget)
//   const handleImageUpload = (clubId) => {
//     setCurrentClubId(clubId); // Set the current club ID for which the image is being uploaded
//     window.cloudinary.openUploadWidget(
//       {
//         cloudName: 'dfxnefnjj', // replace with your Cloudinary cloud name
//         uploadPreset: 'profile_pictures', // replace with your upload preset
//         sources: ['local', 'url', 'camera'],
//         showAdvancedOptions: false,
//         cropping: true,
//         multiple: false,
//         maxFileSize: 10000000, // 10 MB max
//         clientAllowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
//       },
//       (error, result) => {
//         if (error) {
//           console.log("Error uploading image:", error);
//         } else {
//           const uploadedImageUrl = result.info.secure_url;
//           setSelectedImage(uploadedImageUrl);
//           console.log("Image uploaded to Cloudinary:", uploadedImageUrl);

//           // Send the uploaded image URL to the server to update the club's profile picture
//           updateClubProfileImage(clubId, uploadedImageUrl);
//         }
//       }
//     );
//   };

//   // Send the uploaded image URL to the server
//   const updateClubProfileImage = async (clubId, imageUrl) => {
//     try {
//       const response = await axios.put(
//         `http://127.0.0.1:5555/clubs/${clubId}/updateProfileImage`,
//         { profileImage: imageUrl },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       setMessage("Profile image updated successfully!");
//       fetchClubs(); // Reload the clubs to reflect the updated profile image
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to update profile image.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {loading && <p className="text-center text-lg font-semibold text-blue-500">Loading...</p>}
//       {message && <p className="text-center text-lg font-semibold text-red-500">{message}</p>}

//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-700">All Clubs</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
//           {Array.isArray(clubs) && clubs.length > 0 ? (
//             clubs.map((club) => (
//               <div key={club.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
//                 {/* Display the club's profile image above the club's name */}
//                 {club.profile_image && (
//                   <div className="mb-4">
//                     <img
//                       src={club.profile_image}
//                       alt={`${club.name} Profile`}
//                       className="w-full h-40 object-cover rounded-lg"
//                     />
//                   </div>
//                 )}

//                 <h3 className="text-xl font-semibold text-gray-800">{club.name}</h3>
//                 <p className="text-gray-600 mt-2">{club.description}</p>

//                 {/* Image upload button for the specific club */}
//                 <button
//                   onClick={() => handleImageUpload(club.id)}
//                   className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
//                 >
//                   Upload Profile Image
//                 </button>

//                 <button
//                   onClick={() => handleJoinClub(club.id)}
//                   className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
//                 >
//                   Join Club
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-600 col-span-full">No clubs available.</p>
//           )}
//         </div>
//       </div>

//       <div>
//         <h2 className="text-2xl font-bold text-gray-700">Your Clubs</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
//           {Array.isArray(userClubs) && userClubs.length > 0 ? (
//             userClubs.map((club) => (
//               <div key={club.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
//                 {/* Display the club's profile image above the club's name */}
//                 {club.profileImage && (
//                   <div className="mb-4">
//                     <img
//                       src={club.profileImage}
//                       alt={`${club.name} Profile`}
//                       className="w-full h-40 object-cover rounded-lg"
//                     />
//                   </div>
//                 )}

//                 <h3 className="text-xl font-semibold text-gray-800">{club.name}</h3>
//                 <button
//                   onClick={() => handleLeaveClub(club.id)}
//                   className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
//                 >
//                   Leave Club
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-600 col-span-full">You are not a member of any clubs.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClubManager;




// The code below works allowing joining and leaving clubs and updating profile pictures lines 406 - 646
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ClubManager = () => {
//   const [clubs, setClubs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [userClubs, setUserClubs] = useState([]);
//   const [userId, setUserId] = useState(localStorage.getItem("user_id"));
//   const accessToken = localStorage.getItem("access_token");
//   const [selectedImage, setSelectedImage] = useState(null); // Store the uploaded image URL
//   const [currentClubId, setCurrentClubId] = useState(null); // To track the club being uploaded for

//   useEffect(() => {
//     // Fetch all clubs and user-specific clubs
//     fetchClubs();
//     if (userId) {
//       fetchUserClubs(userId);
//     }
//   }, [userId]);

//   // Fetch all clubs
//   const fetchClubs = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://127.0.0.1:5555/clubs', {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       if (response.data && Array.isArray(response.data.data)) {
//         setClubs(response.data.data);
//       } else {
//         setClubs([]); // Fallback in case the API response isn't in expected format
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to load clubs.");
//       setClubs([]); // Fallback if the API call fails
//       setLoading(false);
//     }
//   };

//   // Fetch clubs a user is part of
//   const fetchUserClubs = async (userId) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://127.0.0.1:5555/users/${userId}/clubs`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       if (response.data && Array.isArray(response.data.data)) {
//         setUserClubs(response.data.data);
//       } else {
//         setUserClubs([]); // Fallback in case the API response isn't in expected format
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to load your clubs.");
//       setUserClubs([]); // Fallback if the API call fails
//       setLoading(false);
//     }
//   };

//   // Handle joining a club
//   const handleJoinClub = async (clubId) => {
//     setLoading(true);
//     try {
//       const response = await axios.post('http://127.0.0.1:5555/clubs/join', {
//         user_id: userId,
//         club_id: clubId,
//       }, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       setMessage(response.data.message);
//       fetchUserClubs(userId); // Refresh user clubs list
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to join the club.");
//       setLoading(false);
//     }
//   };

//   // Handle leaving a club
//   const handleLeaveClub = async (clubId) => {
//     setLoading(true);
//     try {
//       const response = await axios.delete(`http://127.0.0.1:5555/clubs/leave/${userId}/${clubId}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       setMessage(response.data.message);
//       fetchUserClubs(userId); // Refresh user clubs list
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to leave the club.");
//       setLoading(false);
//     }
//   };

//   // Handle image upload (Cloudinary widget)
//   const handleImageUpload = (clubId) => {
//     setCurrentClubId(clubId); // Set the current club ID for which the image is being uploaded
//     window.cloudinary.openUploadWidget(
//       {
//         cloudName: 'dfxnefnjj', // replace with your Cloudinary cloud name
//         uploadPreset: 'profile_pictures', // replace with your upload preset
//         sources: ['local', 'url', 'camera'],
//         showAdvancedOptions: false,
//         cropping: true,
//         multiple: false,
//         maxFileSize: 10000000, // 10 MB max
//         clientAllowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
//       },
//       (error, result) => {
//         if (error) {
//           console.log("Error uploading image:", error);
//         } else {
//           const uploadedImageUrl = result.info.secure_url;
//           setSelectedImage(uploadedImageUrl);
//           console.log("Image uploaded to Cloudinary:", uploadedImageUrl);

//           // Send the uploaded image URL to the server to update the club's profile picture
//           updateClubProfileImage(clubId, uploadedImageUrl);
//         }
//       }
//     );
//   };

//   // Send the uploaded image URL to the server
//   const updateClubProfileImage = async (clubId, imageUrl) => {
//     try {
//       const response = await axios.put(
//         `http://127.0.0.1:5555/clubs/${clubId}/updateProfileImage`,
//         { profileImage: imageUrl },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       setMessage("Profile image updated successfully!");
//       fetchClubs(); // Reload the clubs to reflect the updated profile image
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to update profile image.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 p-6">
//       {loading && <p className="text-center text-lg font-semibold text-blue-400">Loading...</p>}
//       {message && <p className="text-center text-lg font-semibold text-red-400">{message}</p>}

//       <div className="mb-6">
//         <h2 className="text-xl font-bold text-white">All Clubs</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
//           {Array.isArray(clubs) && clubs.length > 0 ? (
//             clubs.map((club) => (
//               <div key={club.id} className="bg-white text-white p-4 rounded-md shadow hover:shadow-lg transition-all">
//                 {/* Display the club's profile image above the club's name */}
//                 {club.profile_image && (
//                   <div className="mb-4">
//                     <img
//                       src={club.profile_image}
//                       alt={`${club.name} Profile`}
//                       className="w-full h-40 object-cover rounded-lg"
//                     />
//                   </div>
//                 )}

//                 <h3 className="text-xl font-semibold text-gray-800">{club.name}</h3>
//                 <p className="text-gray-600 mt-2">{club.description}</p>

//                 {/* Image upload button for the specific club */}
//                 <button
//                   onClick={() => handleImageUpload(club.id)}
//                   className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
//                 >
//                   Upload Profile Image
//                 </button>

//                 <button
//                   onClick={() => handleJoinClub(club.id)}
//                   className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
//                 >
//                   Join Club
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-xl font-bold text-white">No clubs available.</p>
//           )}
//         </div>
//       </div>

//       <div>
//         <h2 className="text-xl font-bold text-white">Your Clubs</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
//           {Array.isArray(userClubs) && userClubs.length > 0 ? (
//             userClubs.map((club) => (
//               <div key={club.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
//                 {/* Display the club's profile image above the club's name */}
//                 {club.profileImage && (
//                   <div className="mb-3">
//                     <img
//                       src={club.profile_image}
//                       alt={`${club.name} Profile`}
//                       className="w-full h-24 object-cover rounded-md"
//                     />
//                   </div>
//                 )}

//                 <h3 className="text-lg font-semibold text-black">{club.name}</h3>
//                 <button
//                   onClick={() => handleLeaveClub(club.id)}
//                   className="mt-3 w-full bg-red-600 text-white py-1.5 px-4 rounded hover:bg-red-700"
//                 >
//                   Leave Club
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-400 col-span-full">You are not a member of any clubs.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClubManager;



//I want the code below to allow users create clubs,see the number of members in each club, and see the members of clubs they are a member of
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ClubManager = () => {
//   const [clubs, setClubs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [userClubs, setUserClubs] = useState([]);
//   const [userId, setUserId] = useState(localStorage.getItem("user_id"));
//   const accessToken = localStorage.getItem("access_token");
//   const [selectedImage, setSelectedImage] = useState(null); // Store the uploaded image URL
//   const [currentClubId, setCurrentClubId] = useState(null); // To track the club being uploaded for
//   const [newClubName, setNewClubName] = useState('');
//   const [newClubDescription, setNewClubDescription] = useState('');

//   useEffect(() => {
//     fetchClubs();
//     if (userId) {
//       fetchUserClubs(userId);
//     }
//   }, [userId]);

//   // Fetch all clubs
//   const fetchClubs = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://127.0.0.1:5555/clubs', {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       if (response.data && Array.isArray(response.data.data)) {
//         setClubs(response.data.data);
//       } else {
//         setClubs([]); // Fallback in case the API response isn't in expected format
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to load clubs.");
//       setClubs([]); // Fallback if the API call fails
//       setLoading(false);
//     }
//   };

//   // Fetch clubs a user is part of
//   const fetchUserClubs = async (userId) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://127.0.0.1:5555/users/${userId}/clubs`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       if (response.data && Array.isArray(response.data.data)) {
//         setUserClubs(response.data.data);
//       } else {
//         setUserClubs([]); // Fallback in case the API response isn't in expected format
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to load your clubs.");
//       setUserClubs([]); // Fallback if the API call fails
//       setLoading(false);
//     }
//   };

//   // Handle joining a club
//   const handleJoinClub = async (clubId) => {
//     setLoading(true);
//     try {
//       const response = await axios.post('http://127.0.0.1:5555/clubs/join', {
//         user_id: userId,
//         club_id: clubId,
//       }, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       setMessage(response.data.message);
//       fetchUserClubs(userId); // Refresh user clubs list
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to join the club.");
//       setLoading(false);
//     }
//   };

//   // Handle leaving a club
//   const handleLeaveClub = async (clubId) => {
//     setLoading(true);
//     try {
//       const response = await axios.delete(`http://127.0.0.1:5555/clubs/leave/${userId}/${clubId}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       setMessage(response.data.message);
//       fetchUserClubs(userId); // Refresh user clubs list
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to leave the club.");
//       setLoading(false);
//     }
//   };

//   // Handle image upload (Cloudinary widget)
//   const handleImageUpload = (clubId) => {
//     setCurrentClubId(clubId); // Set the current club ID for which the image is being uploaded
//     window.cloudinary.openUploadWidget(
//       {
//         cloudName: 'dfxnefnjj', // replace with your Cloudinary cloud name
//         uploadPreset: 'profile_pictures', // replace with your upload preset
//         sources: ['local', 'url', 'camera'],
//         showAdvancedOptions: false,
//         cropping: true,
//         multiple: false,
//         maxFileSize: 10000000, // 10 MB max
//         clientAllowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
//       },
//       (error, result) => {
//         if (error) {
//           console.log("Error uploading image:", error);
//         } else {
//           const uploadedImageUrl = result.info.secure_url;
//           setSelectedImage(uploadedImageUrl);
//           console.log("Image uploaded to Cloudinary:", uploadedImageUrl);

//           // Send the uploaded image URL to the server to update the club's profile picture
//           updateClubProfileImage(clubId, uploadedImageUrl);
//         }
//       }
//     );
//   };

//   // Send the uploaded image URL to the server
//   const updateClubProfileImage = async (clubId, imageUrl) => {
//     try {
//       const response = await axios.put(
//         `http://127.0.0.1:5555/clubs/${clubId}/updateProfileImage`,
//         { profileImage: imageUrl },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       setMessage("Profile image updated successfully!");
//       fetchClubs(); // Reload the clubs to reflect the updated profile image
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to update profile image.");
//     }
//   };

//   // Handle creating a new club
//   const handleCreateClub = async () => {
//     if (!newClubName || !newClubDescription) {
//       setMessage("Please provide both a club name and description.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.post('http://127.0.0.1:5555/clubs', {
//         name: newClubName,
//         description: newClubDescription,
//       }, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       setMessage("Club created successfully!");
//       fetchClubs(); // Refresh the list of clubs
//       setNewClubName('');
//       setNewClubDescription('');
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to create the club.");
//       setLoading(false);
//     }
//   };

//   // Handle viewing club members
//   const handleViewMembers = async (clubId) => {
//     try {
//       const response = await axios.get(`http://127.0.0.1:5555/clubs/${clubId}/members`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       alert(`Members of ${response.data.club.name}: \n${response.data.members.join(', ')}`);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to load club members.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 p-6">
//       {loading && <p className="text-center text-lg font-semibold text-blue-400">Loading...</p>}
//       {message && <p className="text-center text-lg font-semibold text-red-400">{message}</p>}

//       {/* Create a new club form */}
//       <div className="mb-6">
//         <h2 className="text-xl font-bold text-white">Create a New Club</h2>
//         <div className="mt-4">
//           <input
//             type="text"
//             placeholder="Club Name"
//             className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-white"
//             value={newClubName}
//             onChange={(e) => setNewClubName(e.target.value)}
//           />
//           <textarea
//             placeholder="Club Description"
//             className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-white"
//             value={newClubDescription}
//             onChange={(e) => setNewClubDescription(e.target.value)}
//           />
//           <button
//             onClick={handleCreateClub}
//             className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
//           >
//             Create Club
//           </button>
//         </div>
//       </div>

//       {/* Display all clubs */}
//       <div className="mb-6">
//         <h2 className="text-xl font-bold text-white">All Clubs</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
//           {Array.isArray(clubs) && clubs.length > 0 ? (
//             clubs.map((club) => (
//               <div key={club.id} className="bg-white text-white p-4 rounded-md shadow hover:shadow-lg transition-all">
//                 {/* Display club profile image */}
//                 {club.profile_image && (
//                   <div className="mb-4">
//                     <img
//                       src={club.profile_image}
//                       alt={`${club.name} Profile`}
//                       className="w-full h-40 object-cover rounded-lg"
//                     />
//                   </div>
//                 )}

//                 <h3 className="text-xl font-semibold text-gray-800">{club.name}</h3>
//                 <p className="text-gray-600 mt-2">{club.description}</p>
//                 <p className="text-gray-500 mt-2">Members: {club.members_count}</p>

//                 {/* View members button */}
//                 <button
//                   onClick={() => handleViewMembers(club.id)}
//                   className="mt-2 w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600"
//                 >
//                   View Members
//                 </button>
//                 {/* Always show the button for uploading a profile image */}
//                 <button
//                   onClick={() => handleImageUpload(club.id)}
//                   className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
//                 >
//                   Upload Profile Image
//                 </button>

//                 {/* Join Club button */}
//                 <button
//                   onClick={() => handleJoinClub(club.id)}
//                   className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//                 >
//                   Join Club
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-xl font-bold text-white">No clubs available.</p>
//           )}
//         </div>
//       </div>

//       {/* Display user's clubs */}
//       <div>
//         <h2 className="text-xl font-bold text-white">Your Clubs</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
//           {Array.isArray(userClubs) && userClubs.length > 0 ? (
//             userClubs.map((club) => (
//               <div key={club.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
//                 {/* Display user's club profile image */}
//                 {club.profile_image && (
//                   <div className="mb-3">
//                     <img
//                       src={club.profile_image}
//                       alt={`${club.name} Profile`}
//                       className="w-full h-24 object-cover rounded-md"
//                     />
//                   </div>
//                 )}

//                 <h3 className="text-lg font-semibold text-black">{club.name}</h3>
//                 <button
//                   onClick={() => handleLeaveClub(club.id)}
//                   className="mt-3 w-full bg-red-600 text-white py-1.5 px-4 rounded hover:bg-red-700"
//                 >
//                   Leave Club
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-400 col-span-full">You are not a member of any clubs.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClubManager;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ClubManager = () => {
//   const [clubs, setClubs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [userClubs, setUserClubs] = useState([]);
//   const [userId, setUserId] = useState(localStorage.getItem("user_id"));
//   const accessToken = localStorage.getItem("access_token");
//   const [selectedImage, setSelectedImage] = useState(null); // Store the uploaded image URL
//   const [currentClubId, setCurrentClubId] = useState(null); // To track the club being uploaded for
//   const [newClubName, setNewClubName] = useState('');
//   const [newClubDescription, setNewClubDescription] = useState('');
//   const [expandedClubId, setExpandedClubId] = useState(null); // Track which club's details are expanded

//   useEffect(() => {
//     fetchClubs();
//     if (userId) {
//       fetchUserClubs(userId);
//     }
//   }, [userId]);

//   // Fetch all clubs
//   const fetchClubs = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://127.0.0.1:5555/clubs', {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       if (response.data && Array.isArray(response.data.data)) {
//         setClubs(response.data.data);
//       } else {
//         setClubs([]); // Fallback in case the API response isn't in expected format
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to load clubs.");
//       setClubs([]); // Fallback if the API call fails
//       setLoading(false);
//     }
//   };

//   // Fetch clubs a user is part of
//   const fetchUserClubs = async (userId) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://127.0.0.1:5555/users/${userId}/clubs`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       if (response.data && Array.isArray(response.data.data)) {
//         setUserClubs(response.data.data);
//       } else {
//         setUserClubs([]); // Fallback in case the API response isn't in expected format
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to load your clubs.");
//       setUserClubs([]); // Fallback if the API call fails
//       setLoading(false);
//     }
//   };

//   // Handle joining a club
//   const handleJoinClub = async (clubId) => {
//     setLoading(true);
//     try {
//       const response = await axios.post('http://127.0.0.1:5555/clubs/join', {
//         user_id: userId,
//         club_id: clubId,
//       }, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       setMessage(response.data.message);
//       fetchUserClubs(userId); // Refresh user clubs list
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to join the club.");
//       setLoading(false);
//     }
//   };

//   // Handle leaving a club
//   const handleLeaveClub = async (clubId) => {
//     setLoading(true);
//     try {
//       const response = await axios.delete(`http://127.0.0.1:5555/clubs/leave/${userId}/${clubId}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       setMessage(response.data.message);
//       fetchUserClubs(userId); // Refresh user clubs list
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to leave the club.");
//       setLoading(false);
//     }
//   };

//   // Handle image upload (Cloudinary widget)
//   const handleImageUpload = (clubId) => {
//     setCurrentClubId(clubId); // Set the current club ID for which the image is being uploaded
//     window.cloudinary.openUploadWidget(
//       {
//         cloudName: 'dfxnefnjj', // replace with your Cloudinary cloud name
//         uploadPreset: 'profile_pictures', // replace with your upload preset
//         sources: ['local', 'url', 'camera'],
//         showAdvancedOptions: false,
//         cropping: true,
//         multiple: false,
//         maxFileSize: 10000000, // 10 MB max
//         clientAllowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
//       },
//       (error, result) => {
//         if (error) {
//           console.log("Error uploading image:", error);
//         } else {
//           const uploadedImageUrl = result.info.secure_url;
//           setSelectedImage(uploadedImageUrl);
//           console.log("Image uploaded to Cloudinary:", uploadedImageUrl);

//           // Send the uploaded image URL to the server to update the club's profile picture
//           updateClubProfileImage(clubId, uploadedImageUrl);
//         }
//       }
//     );
//   };

//   // Send the uploaded image URL to the server
//   const updateClubProfileImage = async (clubId, imageUrl) => {
//     try {
//       const response = await axios.put(
//         `http://127.0.0.1:5555/clubs/${clubId}/updateProfileImage`,
//         { profileImage: imageUrl },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       setMessage("Profile image updated successfully!");
//       fetchClubs(); // Reload the clubs to reflect the updated profile image
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to update profile image.");
//     }
//   };

//   // Handle creating a new club
//   const handleCreateClub = async () => {
//     if (!newClubName || !newClubDescription) {
//       setMessage("Please provide both a club name and description.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.post('http://127.0.0.1:5555/clubs', {
//         name: newClubName,
//         description: newClubDescription,
//       }, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       setMessage("Club created successfully!");
//       fetchClubs(); // Refresh the list of clubs
//       setNewClubName('');
//       setNewClubDescription('');
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to create the club.");
//       setLoading(false);
//     }
//   };

//  // Fetch and display club details (including posts, creation date, and member list)
// const handleViewMore = async (clubId) => {
//   if (expandedClubId === clubId) {
//     setExpandedClubId(null); // Close the details if already expanded
//   } else {
//     try {
//       const response = await axios.get(`http://127.0.0.1:5555/clubs/${clubId}/details`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       setExpandedClubId(clubId);
//       const clubDetails = response.data.data;
//       console.log(clubDetails); // This will contain the club details, posts, and members

//       // Update your UI with the fetched details as needed
//       setMessage(response.data.message);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to load club details.");
//     }
//   }
// };


//   return (
//     <div className="min-h-screen bg-gray-900 p-6">
//       {loading && <p className="text-center text-lg font-semibold text-blue-400">Loading...</p>}
//       {message && <p className="text-center text-lg font-semibold text-red-400">{message}</p>}

//       {/* Create a new club form */}
//       <div className="mb-6">
//         <h2 className="text-xl font-bold text-white">Create a New Club</h2>
//         <div className="mt-4">
//           <input
//             type="text"
//             placeholder="Club Name"
//             className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-white"
//             value={newClubName}
//             onChange={(e) => setNewClubName(e.target.value)}
//           />
//           <textarea
//             placeholder="Club Description"
//             className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-white"
//             value={newClubDescription}
//             onChange={(e) => setNewClubDescription(e.target.value)}
//           />
//           <button
//             onClick={handleCreateClub}
//             className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
//           >
//             Create Club
//           </button>
//         </div>
//       </div>

//       {/* Display all clubs */}
//       <div className="mb-6">
//         <h2 className="text-xl font-bold text-white">All Clubs</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
//           {Array.isArray(clubs) && clubs.length > 0 ? (
//             clubs.map((club) => (
//               <div key={club.id} className="bg-white text-white p-4 rounded-md shadow hover:shadow-lg transition-all">
//                 {/* Display club profile image */}
//                 {club.profile_image && (
//                   <div className="mb-4">
//                     <img
//                       src={club.profile_image}
//                       alt={`${club.name} Profile`}
//                       className="w-full h-40 object-cover rounded-lg"
//                     />
//                   </div>
//                 )}

//                 <h3 className="text-xl font-semibold text-gray-800">{club.name}</h3>
//                 <p className="text-gray-600 mt-2">{club.description}</p>
//                 <p className="text-gray-500 mt-2">Members: {club.members_count}</p>

//                 {/* More button */}
//                 <button
//                   onClick={() => handleViewMore(club.id)}
//                   className="mt-2 w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600"
//                 >
//                   More
//                 </button>

//                 {/* Show expanded club details */}
//                 {expandedClubId === club.id && (
//                   <div className="mt-4">
//                     <p className="text-gray-500">Created on: {new Date(club.created_at).toLocaleDateString()}</p>
//                     <p className="text-gray-500">Posts:</p>
//                     <ul className="text-gray-600">
//                       {club.posts && club.posts.length > 0 ? (
//                         club.posts.map((post, index) => (
//                           <li key={index} className="mt-2">
//                             <strong>{post.title}</strong>
//                             <p>{post.content}</p>
//                           </li>
//                         ))
//                       ) : (
//                         <p>No posts yet.</p>
//                       )}
//                     </ul>
//                   </div>
//                 )}

//                 {/* Always show the button for uploading a profile image */}
//                 <button
//                   onClick={() => handleImageUpload(club.id)}
//                   className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
//                 >
//                   Upload Profile Image
//                 </button>

//                 {/* Join Club button */}
//                 <button
//                   onClick={() => handleJoinClub(club.id)}
//                   className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//                 >
//                   Join Club
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-xl font-bold text-white">No clubs available.</p>
//           )}
//         </div>
//       </div>

//       {/* Display user's clubs */}
//       <div>
//         <h2 className="text-xl font-bold text-white">Your Clubs</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
//           {Array.isArray(userClubs) && userClubs.length > 0 ? (
//             userClubs.map((club) => (
//               <div key={club.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
//                 {/* Display user's club profile image */}
//                 {club.profile_image && (
//                   <div className="mb-3">
//                     <img
//                       src={club.profile_image}
//                       alt={`${club.name} Profile`}
//                       className="w-full h-24 object-cover rounded-md"
//                     />
//                   </div>
//                 )}

//                 <h3 className="text-lg font-semibold text-black">{club.name}</h3>

//                 <button
//                   onClick={() => handleLeaveClub(club.id)}
//                   className="mt-3 w-full bg-red-600 text-white py-1.5 px-4 rounded hover:bg-red-700"
//                 >
//                   Leave Club
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-400 col-span-full">You are not a member of any clubs.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClubManager;


// working code
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClubManager = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [userClubs, setUserClubs] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const accessToken = localStorage.getItem("access_token");
  const [selectedImage, setSelectedImage] = useState(null); // Store the uploaded image URL
  const [currentClubId, setCurrentClubId] = useState(null); // To track the club being uploaded for
  const [newClubName, setNewClubName] = useState('');
  const [newClubDescription, setNewClubDescription] = useState('');
  const [expandedClubId, setExpandedClubId] = useState(null); // Track which club's details are expanded

  useEffect(() => {
    fetchClubs();
    if (userId) {
      fetchUserClubs(userId);
    }
  }, [userId]);

  // Fetch all clubs
  const fetchClubs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:5000/clubs', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data && Array.isArray(response.data.data)) {
        setClubs(response.data.data);
      } else {
        setClubs([]); // Fallback in case the API response isn't in expected format
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load clubs.");
      setClubs([]); // Fallback if the API call fails
      setLoading(false);
    }
  };

  // Fetch clubs a user is part of
  const fetchUserClubs = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/users/${userId}/clubs`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data && Array.isArray(response.data.data)) {
        setUserClubs(response.data.data);
      } else {
        setUserClubs([]); // Fallback in case the API response isn't in expected format
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load your clubs.");
      setUserClubs([]); // Fallback if the API call fails
      setLoading(false);
    }
  };

  // Handle joining a club
  const handleJoinClub = async (clubId) => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/clubs/join', {
        user_id: userId,
        club_id: clubId,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMessage(response.data.message);
      fetchUserClubs(userId); // Refresh user clubs list
      setLoading(false);
    } catch (error) {
      console.error(error);
      setMessage("Failed to join the club.");
      setLoading(false);
    }
  };

  // Handle leaving a club
  const handleLeaveClub = async (clubId) => {
    setLoading(true);
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/clubs/leave/${userId}/${clubId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMessage(response.data.message);
      fetchUserClubs(userId); // Refresh user clubs list
      setLoading(false);
    } catch (error) {
      console.error(error);
      setMessage("Failed to leave the club.");
      setLoading(false);
    }
  };

  // Handle image upload (Cloudinary widget)
  const handleImageUpload = (clubId) => {
    setCurrentClubId(clubId); // Set the current club ID for which the image is being uploaded
    window.cloudinary.openUploadWidget(
      {
        cloudName: 'dfxnefnjj', // replace with your Cloudinary cloud name
        uploadPreset: 'profile_pictures', // replace with your upload preset
        sources: ['local', 'url', 'camera'],
        showAdvancedOptions: false,
        cropping: true,
        multiple: false,
        maxFileSize: 10000000, // 10 MB max
        clientAllowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
      },
      (error, result) => {
        if (error) {
          console.log("Error uploading image:", error);
        } else {
          const uploadedImageUrl = result.info.secure_url;
          setSelectedImage(uploadedImageUrl);
          console.log("Image uploaded to Cloudinary:", uploadedImageUrl);

          // Send the uploaded image URL to the server to update the club's profile picture
          updateClubProfileImage(clubId, uploadedImageUrl);
        }
      }
    );
  };

  // Send the uploaded image URL to the server
  const updateClubProfileImage = async (clubId, imageUrl) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:5555/clubs/${clubId}/updateProfileImage`,
        { profileImage: imageUrl },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setMessage("Profile image updated successfully!");
      fetchClubs(); // Reload the clubs to reflect the updated profile image
    } catch (error) {
      console.error(error);
      setMessage("Failed to update profile image.");
    }
  };

  // Handle creating a new club
  const handleCreateClub = async () => {
    if (!newClubName || !newClubDescription) {
      setMessage("Please provide both a club name and description.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/clubs', {
        name: newClubName,
        description: newClubDescription,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMessage("Club created successfully!");
      fetchClubs(); // Refresh the list of clubs
      setNewClubName('');
      setNewClubDescription('');
      setLoading(false);
    } catch (error) {
      console.error(error);
      setMessage("Failed to create the club.");
      setLoading(false);
    }
  };

  const handleDeleteClub = async (clubId) => {
    setLoading(true);
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/clubs/${clubId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMessage(response.data.message);
      fetchClubs(); // Refresh club list after deletion
      setLoading(false);
    } catch (error) {
      console.error(error);
      setMessage("Failed to delete the club.");
      setLoading(false);
    }
  };


 // Fetch and display club details (including posts, creation date, and member list)
const handleViewMore = async (clubId) => {
  if (expandedClubId === clubId) {
    setExpandedClubId(null); // Close the details if already expanded
  } else {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/clubs/${clubId}/details`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setExpandedClubId(clubId);
      const clubDetails = response.data.data;
      console.log(clubDetails); // This will contain the club details, posts, and members

      // Update your UI with the fetched details as needed
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load club details.");
    }
  }
};


  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {loading && <p className="text-center text-lg font-semibold text-blue-400">Loading...</p>}
      {message && <p className="text-center text-lg font-semibold text-red-400">{message}</p>}

      {/* Create a new club form */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Create a New Club</h2>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Club Name"
            className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-white"
            value={newClubName}
            onChange={(e) => setNewClubName(e.target.value)}
          />
          <textarea
            placeholder="Club Description"
            className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-white"
            value={newClubDescription}
            onChange={(e) => setNewClubDescription(e.target.value)}
          />
          <button
            onClick={handleCreateClub}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
          >
            Create Club
          </button>
        </div>
      </div>

      {/* Display all clubs */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">All Clubs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {Array.isArray(clubs) && clubs.length > 0 ? (
            clubs.map((club) => (
              <div key={club.id} className="bg-white text-white p-4 rounded-md shadow hover:shadow-lg transition-all">
                {/* Display club profile image */}
                {club.profile_image && (
                  <div className="mb-4">
                    <img
                      src={club.profile_image}
                      alt={`${club.name} Profile`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                )}

                <h3 className="text-xl font-semibold text-gray-800">{club.name}</h3>
                <p className="text-gray-600 mt-2">{club.description}</p>
                <p className="text-gray-500 mt-2">Members: {club.members_count}</p>

                {/* More button */}
                <button
                  onClick={() => handleViewMore(club.id)}
                  className="mt-2 w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600"
                >
                  More
                </button>

                {/* Show expanded club details */}
                {expandedClubId === club.id && (
                  <div className="mt-4">
                    <p className="text-gray-500">Created on: {new Date(club.created_at).toLocaleDateString()}</p>
                    <p className="text-gray-500">Posts:</p>
                    <ul className="text-gray-600">
                      {club.posts && club.posts.length > 0 ? (
                        club.posts.map((post, index) => (
                          <li key={index} className="mt-2">
                            <strong>{post.title}</strong>
                            <p>{post.content}</p>
                          </li>
                        ))
                      ) : (
                        <p>No posts yet.</p>
                      )}
                    </ul>
                  </div>
                )}

                {/* Always show the button for uploading a profile image */}
                <button
                  onClick={() => handleImageUpload(club.id)}
                  className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                >
                  Upload Profile Image
                </button>

                {/* Join Club button */}
                <button
                  onClick={() => handleJoinClub(club.id)}
                  className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Join Club
                </button>

                {/* Delete Club Button (Visible only for clubs created by the user) */}
                {/* {club.user_id === userId && ( */}
                  <button
                    onClick={() => handleDeleteClub(club.id)}
                    className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                  >
                    Delete Club
                  </button>
                {/* )} */}

              </div>
            ))
          ) : (
            <p className="text-xl font-bold text-white">No clubs available.</p>
          )}
        </div>
      </div>

      {/* Display user's clubs */}
      <div>
        <h2 className="text-xl font-bold text-white">Your Clubs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {Array.isArray(userClubs) && userClubs.length > 0 ? (
            userClubs.map((club) => (
              <div key={club.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
                {/* Display user's club profile image */}
                {club.profile_image && (
                  <div className="mb-3">
                    <img
                      src={club.profile_image}
                      alt={`${club.name} Profile`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                  </div>
                )}

                <h3 className="text-lg font-semibold text-black">{club.name}</h3>

                <button
                  onClick={() => handleLeaveClub(club.id)}
                  className="mt-3 w-full bg-red-600 text-white py-1.5 px-4 rounded hover:bg-red-700"
                >
                  Leave Club
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-full">You are not a member of any clubs.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubManager;



