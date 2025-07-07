import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo or Title */}
        <Link to="/" className="text-white text-3xl font-extrabold tracking-wide hover:scale-105 transition-all duration-200">
          🌟 NeighborFit
        </Link>

        {/* Navigation links */}
        <div className="space-x-4">
          <Link
            to="/"
            className="text-white text-lg font-medium hover:bg-white/20 px-3 py-1 rounded-md transition-all duration-200"
          >
            Home
          </Link>
          <Link
            to="/survey"
            className="text-white text-lg font-medium hover:bg-white/20 px-3 py-1 rounded-md transition-all duration-200"
          >
            Survey
          </Link>
          <Link
            to="/results"
            className="text-white text-lg font-medium hover:bg-white/20 px-3 py-1 rounded-md transition-all duration-200"
          >
            Results
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
