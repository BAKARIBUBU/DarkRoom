import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClubManager = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [userClubs, setUserClubs] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    // Fetch all clubs and user-specific clubs
    fetchClubs();
    if (userId) {
      fetchUserClubs(userId);
    }
  }, [userId]);

  // Fetch all clubs
  const fetchClubs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:5555/clubs', {
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
      const response = await axios.get(`http://127.0.0.1:5555/users/${userId}/clubs`, {
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
      const response = await axios.post('http://127.0.0.1:5555/clubs/join', {
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
      const response = await axios.delete(`http://127.0.0.1:5555/clubs/leave/${userId}/${clubId}`, {
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {loading && <p className="text-center text-lg font-semibold text-blue-500">Loading...</p>}
      {message && <p className="text-center text-lg font-semibold text-red-500">{message}</p>}

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-700">All Clubs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {Array.isArray(clubs) && clubs.length > 0 ? (
            clubs.map((club) => (
              <div key={club.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
                <h3 className="text-xl font-semibold text-gray-800">{club.name}</h3>
                <p className="text-gray-600 mt-2">{club.description}</p>
                <button
                  onClick={() => handleJoinClub(club.id)}
                  className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Join Club
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No clubs available.</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-700">Your Clubs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {Array.isArray(userClubs) && userClubs.length > 0 ? (
            userClubs.map((club) => (
              <div key={club.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
                <h3 className="text-xl font-semibold text-gray-800">{club.name}</h3>
                <button
                  onClick={() => handleLeaveClub(club.id)}
                  className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Leave Club
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">You are not a member of any clubs.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubManager;
