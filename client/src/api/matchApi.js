import axios from "axios";

const API_URL = "https://neighborfit-backend-dwxp.onrender.com/api/match";

export const getNeighborhoodMatches = async (preferences) => {
  const response = await axios.post(API_URL, { preferences });
  return response.data;
};
