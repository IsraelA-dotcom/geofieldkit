import axios from "axios";

const API_BASE_URL = "https://geofieldkit.onrender.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getSamples = async () => {
  const response = await api.get("/api/samples");
  return response.data;
};

export const createSamples = async () => {
  const response = await api.get("/api/samples/");
  return response.data;
};

export const createSample = async (sampleData) => {
  const response = await api.post("/api/samples/", sampleData);
  return response.data;
};
