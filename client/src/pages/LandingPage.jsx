// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-blue-700 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-bold mb-4 text-center drop-shadow-xl">
        Welcome to NeighborFit
      </h1>
      <p className="text-lg mb-8 max-w-xl text-center">
        Discover the neighborhood that fits your lifestyle best—based on real data and what truly matters to you.
      </p>
      <Link to="/survey">
        <button className="bg-white text-blue-900 px-8 py-3 rounded-full text-xl font-semibold shadow-lg hover:scale-105 transition-all glow">
          Start Matching
        </button>
      </Link>
    </div>
  );
};

export default LandingPage;
