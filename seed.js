import axios from 'axios';

// To seed production: set VITE_API_URL or change this default
const API_URL = process.env.VITE_API_URL || 'http://localhost:8080/alonzo';

const sampleSongs = [
  { title: "Lofi Hip Hop Radio", artist: "Lofi Girl", album: "Beats to Study", genre: "Lofi", url: "https://www.youtube.com/watch?v=jfKfPfyJRdk" },
  { title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", genre: "Synth-pop", url: "https://www.youtube.com/watch?v=4NRXx6U8ABQ" },
  { title: "Interstellar Theme", artist: "Hans Zimmer", album: "Interstellar", genre: "Soundtrack", url: "https://www.youtube.com/watch?v=IDsCtDRV2uA" },
  { title: "Never Gonna Give You Up", artist: "Rick Astley", album: "Whenever You Need Somebody", genre: "Pop", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { title: "Shape of You", artist: "Ed Sheeran", album: "Divide", genre: "Pop", url: "https://www.youtube.com/watch?v=JGwWNGJdvx8" },
  { title: "Believer", artist: "Imagine Dragons", album: "Evolve", genre: "Rock", url: "https://www.youtube.com/watch?v=7wtfhZwyrcc" },
  { title: "Starboy", artist: "The Weeknd", album: "Starboy", genre: "R&B", url: "https://www.youtube.com/watch?v=34Na4j8AVgA" }
];

async function seed() {
  console.log(`[SEED] Target API: ${API_URL}/songs`);
  for (const song of sampleSongs) {
    try {
      await axios.post(`${API_URL}/songs`, song);
      console.log(`[SUCCESS] Added: ${song.title}`);
    } catch (err) {
      console.error(`[ERROR] Failed ${song.title}: ${err.response?.status || err.message}`);
    }
  }
  console.log('--- Seeding Complete ---');
}

seed();
