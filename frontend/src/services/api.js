// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", 
});

// Register new user
export const registerUser = async (userData) => {
  return API.post("/auth/register", userData);
};

// Login user
export const loginUser = async (credentials) => {
  return API.post("/auth/login", credentials);
};

export default API;
