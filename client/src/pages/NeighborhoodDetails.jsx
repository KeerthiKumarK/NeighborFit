import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const NeighborhoodDetails = () => {
  const { id } = useParams();
  const [neighborhood, setNeighborhood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNeighborhood = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/neighborhood/${id}`);
        setNeighborhood(res.data);
      } catch (err) {
        console.error("Error fetching neighborhood:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNeighborhood();
  }, [id]);

  if (loading) return <div className="text-white text-center mt-20 text-xl">Loading...</div>;

  if (!neighborhood) return <div className="text-white text-center mt-20 text-xl">Neighborhood not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-700 to-blue-900 text-white px-6 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center">{neighborhood.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="bg-white/10 p-6 rounded-xl backdrop-blur-md">
          <p><strong>Safety:</strong> {neighborhood.safety}</p>
          <p><strong>Nightlife:</strong> {neighborhood.nightlife}</p>
          <p><strong>Schools:</strong> {neighborhood.schools}</p>
          <p><strong>Parks:</strong> {neighborhood.parks}</p>
          <p><strong>Affordability:</strong> {neighborhood.affordability}</p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link to="/results">
          <button className="bg-white text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-300 font-semibold">
            ⬅ Back to Results
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NeighborhoodDetails;
