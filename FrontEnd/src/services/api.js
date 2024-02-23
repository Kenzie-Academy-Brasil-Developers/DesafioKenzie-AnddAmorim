import axios from "axios";

export const api = axios.create({
  baseURL: "https://desafiokenzie-anddamorim.onrender.com",
  timeout: 8 * 1000,
});
