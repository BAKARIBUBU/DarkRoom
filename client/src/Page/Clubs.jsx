// src/components/Clubs.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const Clubs = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5555/clubs");
        setClubs(response.data.data);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs();
  }, []);

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-12 text-gray-800">Popular Movie Clubs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {clubs.map((club) => (
            <div
              key={club.id}
              className="bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 hover:shadow-xl p-6"
            >
              <img
                src={club.profile_image}
                alt={club.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{club.name}</h3>
              <p className="text-gray-600 mb-6">{club.description}</p>
              <button className="bg-teal-600 text-white font-medium px-5 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-300">
                Join Club
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clubs;
