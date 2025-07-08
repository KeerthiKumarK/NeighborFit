import express from "express";
import Neighborhood from "../models/Neighborhood.js";

const router = express.Router();

router.post("/match", async (req, res) => {
  try {
    const preferences = req.body.preferences;
    console.log("🔶 Received preferences:", preferences);

    const neighborhoods = await Neighborhood.find();
    console.log("📦 Neighborhoods in DB:", neighborhoods.length);

    if (!preferences || Object.keys(preferences).length === 0) {
      return res.status(400).json({ error: "Preferences missing or invalid" });
    }

    const scoredNeighborhoods = neighborhoods.map((hood) => {
      let score = 0;
      let total = 0;

      for (const key in preferences) {
        if (hood[key] !== undefined) {
          const diff = Math.abs(hood[key] - preferences[key]);
          const percentMatch = ((10 - diff) / 10) * 100;
          score += percentMatch;
          total += 1;
        }
      }

      const matchScore = total > 0 ? Math.round(score / total) : 0;
      const hoodObj = hood.toObject();

      return { ...hoodObj, matchScore };
    });

    const sorted = scoredNeighborhoods
      .sort((a, b) => b.matchScore - a.matchScore)
      .filter((hood) => hood.matchScore > 0); // ✅ Filter at least 1% match

    console.log("✅ Top matches:", sorted.map((n) => ({
      name: n.name,
      matchScore: n.matchScore
    })));

    res.json(sorted.slice(0, 5));
  } catch (error) {
    console.error("❌ Error in /match:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/neighborhood/:id", async (req, res) => {
  try {
    const hood = await Neighborhood.findById(req.params.id);
    if (!hood) return res.status(404).json({ error: "Not found" });
    res.json(hood);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;  
