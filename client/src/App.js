// File: src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SurveyPage from "./pages/SurveyPage";
import ResultsPage from "./pages/ResultsPage";
import NeighborhoodDetails from "./pages/NeighborhoodDetails";
import { Toaster } from 'react-hot-toast';
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/neighborhood/:id" element={<NeighborhoodDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
