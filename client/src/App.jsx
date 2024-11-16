// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// // import Navbar from "./Page/Navbar";
// // import Footer from "./Page/Footer";
// // import HomePage from "./Page/Homepage";
// // import LoginPage from "./Page/LoginPage";
// // // import PostPage from "./components/post/PostPage";
// // import PostList from './components/Post/PostList';
// // import PostPage from './Page/PostPage';
// // import CreatePostForm from './components/Post/CreatePostForm';
// import Navbar from "./Page/Navbar";
// import Footer from "./Page/Footer";
// import HomePage from "./Page/Homepage"; // Ensure the file is named `Homepage.js`
// import LoginPage from "./Page/LoginPage"; // Ensure the file is named `LoginPage.js`
// import PostList from "./components/Post/PostList"; // Ensure the file is named `PostList.js`
// import PostPage from "./Page/PostPage"; // Ensure the file is named `PostPage.js`
// import CreatePostForm from "./components/Post/CreatePostForm"; // Ensure the file is named `CreatePostForm.js`



// const App = () => {
//   return (
//     <Router>
//       <div>
//         {/* <h1>Darkroom App</h1> */}
//         <Navbar />
//         <Routes>
//                 <Route path="/" element={<HomePage />} />  {/* Home page route */}
//                 <Route path="/login" element={<LoginPage />} />
//                 <Route path="/posts" element={<PostList />} />
//                 <Route path="/posts/:postId" element={<PostPage />} />
//                 <Route path="/create" element={<CreatePostForm userId={1} clubId={1} />} />
//         </Routes>

//         {/* <Routes>
//                     <Route path="/" element={<HomePage />} />
//                     <Route path="/home" element={<HomePage />} />
//                     <Route path="/login" element={<LoginPage />} />
//                     <Route path="/posts" element={<PostPage />} />
//                     <Route path="/post/:id" element={<PostPage />} />
//                     <Route path="/" element={<PostList />} />


//                     <Route path="/posts/:postId" element={<PostPage />} />


//                     <Route path="/create" element={<CreatePostForm userId={1} clubId={1} />} />

//         </Routes> */}
//         < Footer/>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Page/Navbar";
import Footer from "./Page/Footer";
import HomePage from "./Page/Homepage";
import LoginPage from "./Page/LoginPage";
import PostList from "./components/Post/PostList";
import PostPage from "./Page/PostPage";
import CreatePostForm from "./components/Post/CreatePostForm";



const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} /> {/* Register should have its own route */}
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:postId" element={<PostPage />} />
          <Route path="/create" element={<CreatePostForm userId={1} clubId={1} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

