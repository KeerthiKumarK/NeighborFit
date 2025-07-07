import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import matchRoutes from "./routes/matchRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// ✅ Allow Vercel Frontend to access this backend
app.use(
  cors({
    origin: "https://neighbor-fit-36n9-9nv3x9bor-kola-keerthi-kumars-projects.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

connectDB();

app.use("/api", matchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
