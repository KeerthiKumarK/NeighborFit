import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ResultsPage = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedMatches = localStorage.getItem("neighborhoodMatches");
    if (storedMatches) {
      setMatches(JSON.parse(storedMatches));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="text-white text-center mt-20 text-xl">
        Loading neighborhood matches...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-700 to-blue-900 text-white px-6 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center">Top Neighborhood Matches</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {matches.map((hood) => (
          <div
            key={hood._id}
            className="bg-white/10 p-6 rounded-xl backdrop-blur-md shadow-lg hover:scale-105 transition-transform"
          >
            <h2 className="text-2xl font-bold mb-2">{hood.name}</h2>
            <p className="text-xl mb-2">Match Score: <span className="font-bold">{hood.matchScore}%</span></p>
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(hood)
                .filter(([key, val]) =>
                  ["safety", "nightlife", "schools", "parks", "affordability"].includes(key) && val >= 8
                )
                .map(([key], i) => (
                  <span key={i} className="bg-white/20 px-3 py-1 rounded-full text-sm capitalize">
                    {key}
                  </span>
                ))}
            </div>
            <Link to={`/neighborhood/${hood._id}`}>
              <button className="bg-white text-blue-900 px-4 py-2 rounded-lg font-medium hover:bg-blue-200">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
