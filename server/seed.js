import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import Neighborhood from "./src/models/Neighborhood.js";
import neighborhoods from "./data/neighborhoods.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await Neighborhood.deleteMany(); // Clear existing
    await Neighborhood.insertMany(neighborhoods);

    console.log("✅ Data seeded successfully.");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedData();
