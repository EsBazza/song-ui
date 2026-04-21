import React, { useState } from 'react';
import { X, Plus, Link as LinkIcon, Music, User, Disc, Tag, Loader2 } from 'lucide-react';
import axios from 'axios';

const AddSongModal = ({ isOpen, onClose, onSongAdded }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    url: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://song-api-ypz5.onrender.com/alonzo';
      await axios.post(`${API_BASE_URL}/songs`, formData);
      onSongAdded();
      onClose();
      setFormData({ title: '', artist: '', album: '', genre: '', url: '' });
    } catch (err) {
      alert("Failed to add song. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-[2.5rem] p-10 shadow-2xl shadow-black overflow-hidden">
        {/* Background Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full" />
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight italic">ADD NEW TRACK</h2>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Sync to SONG API Engine</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="relative">
              <Music className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
              <input
                required
                name="title"
                placeholder="Song Title"
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-zinc-600 font-medium"
                onChange={handleChange}
                value={formData.title}
              />
            </div>

            <div className="flex gap-4">
              <div className="relative flex-1">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                <input
                  required
                  name="artist"
                  placeholder="Artist"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-zinc-600 font-medium"
                  onChange={handleChange}
                  value={formData.artist}
                />
              </div>
              <div className="relative flex-1">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                <input
                  required
                  name="genre"
                  placeholder="Genre"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-zinc-600 font-medium"
                  onChange={handleChange}
                  value={formData.genre}
                />
              </div>
            </div>

            <div className="relative">
              <Disc className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
              <input
                name="album"
                placeholder="Album Name"
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-zinc-600 font-medium"
                onChange={handleChange}
                value={formData.album}
              />
            </div>

            <div className="relative">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
              <input
                required
                name="url"
                placeholder="YouTube URL"
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-zinc-600 font-medium"
                onChange={handleChange}
                value={formData.url}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-zinc-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-xl shadow-white/5 mt-4 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
            {loading ? 'SYNCING...' : 'ADD TO LIBRARY'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSongModal;
