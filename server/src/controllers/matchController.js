import Neighborhood from "../models/Neighborhood.js";
import computeMatchScore from "../services/matchEngine.js";

export const getMatches = async (req, res) => {
  try {
    const { preferences } = req.body;

    const neighborhoods = await Neighborhood.find();
    const matches = neighborhoods.map(n => {
      const score = computeMatchScore(preferences, n);
      return { ...n.toObject(), matchScore: score };
    });

    const sorted = matches.sort((a, b) => b.matchScore - a.matchScore);
    res.json(sorted.slice(0, 5));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
