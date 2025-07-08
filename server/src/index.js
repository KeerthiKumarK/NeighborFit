import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import matchRoutes from "./routes/matchRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

 
connectDB();

 
const allowedOrigins = [
  "https://neighbor-fit-36n9.vercel.app",
  "http://localhost:3000",
];

 
app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Origin trying to access:", origin); // Optional: Debug
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
);

 
app.use(express.json());

 
app.use("/api", matchRoutes);

 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
