import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/alonzo';

console.log(`[SONG UI] Connecting to API at: ${API_BASE_URL}`);

export const fetchSongs = async () => {
  const response = await axios.get(`${API_BASE_URL}/songs`);
  return response.data;
};

export const fetchSongById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/songs/${id}`);
  return response.data;
};

export const searchSongs = async (key) => {
  const response = await axios.get(`${API_BASE_URL}/songs/search/${key}`);
  return response.data;
};

export const createSong = async (songData) => {
  const response = await axios.post(`${API_BASE_URL}/songs`, songData);
  return response.data;
};

export const updateSong = async (id, songData) => {
  const response = await axios.put(`${API_BASE_URL}/songs/${id}`, songData);
  return response.data;
};

export const deleteSong = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/songs/${id}`);
  return response.data;
};
