import React, { useState, useEffect } from 'react';
import { fetchSongs, searchSongs } from './api';
import SongCard from './components/SongCard';
import VideoPlayer from './components/VideoPlayer';
import AddSongModal from './components/AddSongModal';
import { Search, Music, Disc, Loader2, Play, Plus } from 'lucide-react';

function App() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchSongs();
      setSongs(data);
    } catch (err) {
      setError("Unable to load songs. The API might be sleeping on Render (initial load takes ~50s).");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = searchTerm ? await searchSongs(searchTerm) : await fetchSongs();
      setSongs(data);
    } catch (err) {
      setError("Search failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-400 font-sans selection:bg-zinc-800 selection:text-white">
      {/* Minimal Header */}
      <nav className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-zinc-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
            <div className="bg-white text-black p-1 rounded-lg">
              <Play size={20} fill="currentColor" />
            </div>
            <span>SONG<span className="text-zinc-500">API</span></span>
          </div>

          <div className="flex items-center gap-6">
            <form onSubmit={handleSearch} className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
              <input 
                type="text"
                placeholder="Search artists, songs, genres..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-zinc-600 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>

            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl font-bold text-sm hover:bg-zinc-200 transition-all shadow-lg shadow-white/5 whitespace-nowrap"
            >
              <Plus size={18} />
              <span>Add Song</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Welcome Section */}
        {!selectedSong && (
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">Discover Music</h1>
            <p className="text-zinc-500">Browse your personal collection from the SONG API.</p>
          </header>
        )}

        {error && (
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl text-center mb-10">
            <p className="text-zinc-400 mb-4">{error}</p>
            <button 
              onClick={loadSongs}
              className="px-6 py-2 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors"
            >
              Retry Connection
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-zinc-500" size={40} />
            <p className="text-sm tracking-widest uppercase">Waking up API...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {songs.map((song) => (
              <SongCard key={song.id} song={song} onClick={setSelectedSong} />
            ))}
          </div>
        )}

        {!loading && songs.length === 0 && !error && (
          <div className="text-center py-20 border-2 border-dashed border-zinc-900 rounded-3xl">
            <Disc className="mx-auto mb-4 text-zinc-800" size={48} />
            <p>Your library is empty.</p>
          </div>
        )}
      </main>

      {selectedSong && (
        <VideoPlayer 
          key={selectedSong.id}
          song={selectedSong} 
          songs={songs}
          onClose={() => setSelectedSong(null)} 
          onSelectSong={setSelectedSong}
        />
      )}

      <AddSongModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSongAdded={loadSongs}
      />
    </div>
  );
}

export default App;
