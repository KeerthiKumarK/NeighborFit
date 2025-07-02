import mongoose from "mongoose";

const NeighborhoodSchema = new mongoose.Schema({
  name: String,
  safety: Number,
  affordability: Number,
  schools: Number,
  nightlife: Number,
  parks: Number,
});

const Neighborhood = mongoose.model("Neighborhood", NeighborhoodSchema);

export default Neighborhood;
