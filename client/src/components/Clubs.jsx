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
    <section className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Popular Movie Clubs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {clubs.map((club) => (
            <div key={club.id} className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src={club.profile_image}
                alt={club.name}
                className="w-full h-56 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold mb-4">{club.name}</h3>
              <p className="text-lg mb-4">{club.description}</p>
              <button className="bg-[#148f6e] text-white px-4 py-2 rounded-md">
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
