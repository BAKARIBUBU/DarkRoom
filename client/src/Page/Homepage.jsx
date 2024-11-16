import React from "react";
import Clubs from "./Clubs"; // Import the Clubs component

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#148f6e] text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to DarkRoom</h1>
          <p className="text-xl mb-8">
            The place where movie enthusiasts meet, discuss, and share their favorite films.
          </p>

          {/* Search bar */}
          <div className="relative max-w-lg mx-auto">
            <input
              type="text"
              className="w-full py-3 px-5 text-xl rounded-md"
              placeholder="Search for movies, genres, or discussion groups"
            />
            <button className="absolute top-0 right-0 bg-[#107b5b] text-white px-5 py-3 rounded-md">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Popular Movie Clubs Section */}
      <Clubs /> {/* Include the Clubs component to display the clubs */}
    </div>
  );
};

export default HomePage;





// // src/components/HomePage.jsx
// import React from "react";

// const HomePage = () => {
//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="bg-white text-black py-20">
//   <div className="container mx-auto text-center">
//     <h1 className="text-5xl font-bold mb-6">Welcome to DarkRoom</h1>
//     <p className="text-xl mb-8">
//       The place where movie enthusiasts meet, discuss, and share their favorite films.
//     </p>

//     {/* Search bar for movies or groups */}
//     <div className="relative max-w-lg mx-auto">
//       <input
//         type="text"
//         className="w-full py-3 px-5 text-xl rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#148f6e] focus:border-[#107b5b]"
//         placeholder="Search for movies, genres, or discussion groups"
//       />
//       <button className="absolute top-0 right-0 bg-[#107b5b] text-white px-5 py-3 rounded-md hover:bg-[#148f6e] transition duration-300">
//         Search
//       </button>
//     </div>
//   </div>
// </section>



//       {/* About DarkRoom Section */}
//       <section className="py-20 bg-gray-100">
//         <div className="container mx-auto text-center">
//           <h2 className="text-4xl font-bold mb-8">What is DarkRoom?</h2>
//           <p className="text-xl max-w-4xl mx-auto">
//             DarkRoom is a community for movie lovers to connect, discuss, and share their passion for cinema.
//             Discover new movies, join film discussions, and share your favorite films with fellow enthusiasts.
//           </p>
//         </div>
//       </section>

//       {/* Popular Movie Discussions Section */}
//       <section className="py-20">
//         <div className="container mx-auto text-center">
//           <h2 className="text-4xl font-bold mb-8">Popular Movie Discussions</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
//             {/* Movie Discussion Card 1 */}
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//               <h3 className="text-2xl font-semibold mb-4">The Godfather Marathon</h3>
//               <p className="text-lg mb-4">
//                 Join us for a deep dive into the epic saga of the Corleone family. Share your thoughts on the characters, themes, and legacy.
//               </p>
//               <button className="bg-[#148f6e] text-white px-4 py-2 rounded-md">Join Discussion</button>
//             </div>

//             {/* Movie Discussion Card 2 */}
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//               <h3 className="text-2xl font-semibold mb-4">Sci-Fi Movie Night</h3>
//               <p className="text-lg mb-4">
//                 Explore the best of science fiction with fellow enthusiasts. From classics to modern hits, join us for an unforgettable movie night.
//               </p>
//               <button className="bg-[#148f6e] text-white px-4 py-2 rounded-md">Join Discussion</button>
//             </div>

//             {/* Movie Discussion Card 3 */}
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//               <h3 className="text-2xl font-semibold mb-4">Animated Films Spotlight</h3>
//               <p className="text-lg mb-4">
//                 A discussion on the impact of animated films on the industry. Join us as we explore the artistry behind your favorite animated classics.
//               </p>
//               <button className="bg-[#148f6e] text-white px-4 py-2 rounded-md">Join Discussion</button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action Section */}
//       <section className="bg-[#148f6e] text-white py-20">
//         <div className="container mx-auto text-center">
//           <h2 className="text-3xl font-bold mb-6">Ready to Dive Into the World of Cinema?</h2>
//           <p className="text-lg mb-8">
//             Join DarkRoom today to connect with fellow movie lovers, discuss your favorite films, and discover new ones.
//           </p>
//           <button className="bg-white text-[#148f6e] px-6 py-3 rounded-md text-xl">
//             Join Now
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomePage;
