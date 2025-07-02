import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import matchRoutes from "./routes/matchRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// ✅ Correct mount path
app.use("/api", matchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
