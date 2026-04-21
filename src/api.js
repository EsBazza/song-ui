import axios from 'axios';

// Fallback to production URL if env variable is not set
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://song-api-ypz5.onrender.com/alonzo';

export const fetchSongs = async () => {
  const response = await axios.get(`${API_BASE_URL}/songs`);
  return response.data;
};

export const searchSongs = async (key) => {
  const response = await axios.get(`${API_BASE_URL}/songs/search/${key}`);
  return response.data;
};
