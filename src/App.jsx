import React, { useState, useEffect } from 'react';
import { fetchSongs, searchSongs } from './api';
import SongCard from './components/SongCard';
import VideoPlayer from './components/VideoPlayer';
import AddSongModal from './components/AddSongModal';
import EditSongModal from './components/EditSongModal';
import ErrorBoundary from './components/ErrorBoundary';
import { Search, Music, Disc, Loader2, Plus } from 'lucide-react';

function App() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [editingSong, setEditingSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
      setError("Unable to connect to the music engine. The API might be warming up (initial load takes ~50s).");
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

  const handleEditClick = (song) => {
    setEditingSong(song);
    setIsEditModalOpen(true);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-950 text-slate-400 font-sans selection:bg-slate-800 selection:text-white">
        <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-900 px-6 py-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
              <div className="bg-white text-slate-950 p-1.5 rounded-xl">
                <Music size={20} />
              </div>
              <span className="uppercase tracking-widest">SONG <span className="text-slate-600">LIBRARY</span></span>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <form onSubmit={handleSearch} className="relative flex-1 md:w-80 lg:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input 
                  type="text"
                  placeholder="Search songs or artists"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-slate-600 transition-all placeholder:text-slate-600"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>

              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 bg-white text-slate-950 px-4 py-2 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all"
              >
                <Plus size={18} />
                <span>Add song</span>
              </button>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 py-12">
          {!selectedSong && (
            <header className="mb-12">
              <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Your songs</h1>
              <p className="text-slate-500 font-medium">Simple, organized, and easy to play.</p>
            </header>
          )}

          {error && (
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center mb-10">
              <p className="text-slate-400 mb-6 font-medium">{error}</p>
              <button 
                onClick={loadSongs}
                className="px-6 py-2 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 transition-all"
              >
                Retry
              </button>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-6">
              <Loader2 className="animate-spin text-slate-700" size={40} />
              <p className="text-sm tracking-widest font-bold uppercase text-slate-600">Loading songs...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {songs.map((song) => (
                <SongCard 
                  key={song.id} 
                  song={song} 
                  onClick={setSelectedSong} 
                  onEdit={handleEditClick}
                  onDelete={loadSongs}
                />
              ))}
            </div>
          )}

          {!loading && songs.length === 0 && !error && (
            <div className="text-center py-32 border-2 border-dashed border-slate-900 rounded-3xl">
              <Disc className="mx-auto mb-4 text-slate-800" size={48} />
              <p className="text-slate-500 font-medium">Your library is empty.</p>
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

        <EditSongModal 
          isOpen={isEditModalOpen}
          song={editingSong}
          onClose={() => setIsEditModalOpen(false)}
          onSongUpdated={loadSongs}
        />
        
        {/* Simple Footer */}
        <footer className="max-w-7xl mx-auto px-6 py-10 border-t border-slate-900 mt-20 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-700">© 2026 SONG LIBRARY</p>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
