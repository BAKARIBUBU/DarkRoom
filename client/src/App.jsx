import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/Homepage";
import LoginPage from "./components/LoginPage";

const App = () => {
  return (
    <Router>
      <div>
        {/* <h1>Darkroom App</h1> */}
        <Navbar />
        <Routes>
                   <Route path="/home" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
        </Routes>
        < Footer/>
      </div>
    </Router>
  );
};

export default App;


