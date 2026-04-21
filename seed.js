import axios from 'axios';

// Change this to your Render URL if you want to seed the production DB:
// const API_URL = 'https://song-api-ypz5.onrender.com/alonzo/songs';
const API_URL = 'http://localhost:8080/alonzo/songs';

const sampleSongs = [
  { title: "Lofi Hip Hop Radio", artist: "Lofi Girl", album: "Beats to Study", genre: "Lofi", url: "https://www.youtube.com/watch?v=jfKfPfyJRdk" },
  { title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", genre: "Synth-pop", url: "https://www.youtube.com/watch?v=4NRXx6U8ABQ" },
  { title: "Interstellar Theme", artist: "Hans Zimmer", album: "Interstellar", genre: "Soundtrack", url: "https://www.youtube.com/watch?v=IDsCtDRV2uA" },
  { title: "Never Gonna Give You Up", artist: "Rick Astley", album: "Whenever You Need Somebody", genre: "Pop", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { title: "Shape of You", artist: "Ed Sheeran", album: "Divide", genre: "Pop", url: "https://www.youtube.com/watch?v=JGwWNGJdvx8" },
  { title: "Believer", artist: "Imagine Dragons", album: "Evolve", genre: "Rock", url: "https://www.youtube.com/watch?v=7wtfhZwyrcc" },
  { title: "Starboy", artist: "The Weeknd", album: "Starboy", genre: "R&B", url: "https://www.youtube.com/watch?v=34Na4j8AVgA" },
  { title: "Coldplay - Hymn For The Weekend", artist: "Coldplay", album: "A Head Full of Dreams", genre: "Alt-Rock", url: "https://www.youtube.com/watch?v=YykjpeuMNEk" },
  { title: "Dua Lipa - Levitating", artist: "Dua Lipa", album: "Future Nostalgia", genre: "Disco-pop", url: "https://www.youtube.com/watch?v=TUVcZfQe-Kw" },
  { title: "Radiohead - Creep", artist: "Radiohead", album: "Pablo Honey", genre: "Alternative", url: "https://www.youtube.com/watch?v=XFkzRNyygfk" },
  { title: "Arctic Monkeys - Do I Wanna Know?", artist: "Arctic Monkeys", album: "AM", genre: "Indie Rock", url: "https://www.youtube.com/watch?v=bpOSxM0rNPM" },
  { title: "Billie Eilish - bad guy", artist: "Billie Eilish", album: "When We All Fall Asleep", genre: "Electropop", url: "https://www.youtube.com/watch?v=DyDfgMOUjCI" },
  { title: "Daft Punk - Get Lucky", artist: "Daft Punk", album: "Random Access Memories", genre: "Funk", url: "https://www.youtube.com/watch?v=5NV6Rdv1a3I" },
  { title: "Sia - Chandelier", artist: "Sia", album: "1000 Forms of Fear", genre: "Pop", url: "https://www.youtube.com/watch?v=2vjPBrBU-TM" },
  { title: "Bruno Mars - Uptown Funk", artist: "Mark Ronson", album: "Uptown Special", genre: "Funk", url: "https://www.youtube.com/watch?v=OPf0YbXqDm0" },
  { title: "Queen - Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera", genre: "Rock", url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ" },
  { title: "Eminem - Lose Yourself", artist: "Eminem", album: "8 Mile", genre: "Hip Hop", url: "https://www.youtube.com/watch?v=_Yhyp-_hKtk" },
  { title: "Adele - Hello", artist: "Adele", album: "25", genre: "Soul", url: "https://www.youtube.com/watch?v=YQHsXMglC9A" },
  { title: "The Killers - Mr. Brightside", artist: "The Killers", album: "Hot Fuss", genre: "Indie Rock", url: "https://www.youtube.com/watch?v=gGdGFtwCNBE" },
  { title: "Gorillaz - Feel Good Inc.", artist: "Gorillaz", album: "Demon Days", genre: "Alt-Hip Hop", url: "https://www.youtube.com/watch?v=HyHNuVaZJ-k" }
];

async function seed() {
  console.log('Starting seed process...');
  for (const song of sampleSongs) {
    try {
      await axios.post(API_URL, song);
      console.log(`[SUCCESS] Added: ${song.title} by ${song.artist}`);
    } catch (err) {
      console.error(`[ERROR] Failed to add ${song.title}: ${err.response?.data || err.message}`);
    }
  }
  console.log('--- Seeding Complete ---');
}

seed();
