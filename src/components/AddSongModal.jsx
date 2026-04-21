import React, { useState } from 'react';
import { X, Plus, Link as LinkIcon, Music, User, Disc, Tag, Loader2 } from 'lucide-react';
import { createSong } from '../api';

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
      await createSong(formData);
      onSongAdded();
      onClose();
      setFormData({ title: '', artist: '', album: '', genre: '', url: '' });
    } catch (err) {
      alert("Failed to add track. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white">Add song</h2>
            <p className="mt-1 text-sm text-slate-500">Enter song details below.</p>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-800 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="relative">
              <Music className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
              <input
                required
                name="title"
                placeholder="Song title"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-slate-600 transition-all placeholder:text-slate-600 font-medium"
                onChange={handleChange}
                value={formData.title}
              />
            </div>

            <div className="flex gap-4">
              <div className="relative flex-1">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input
                  required
                  name="artist"
                  placeholder="Artist"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-slate-600 transition-all placeholder:text-slate-600 font-medium"
                  onChange={handleChange}
                  value={formData.artist}
                />
              </div>
              <div className="relative flex-1">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input
                  required
                  name="genre"
                  placeholder="Genre"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-slate-600 transition-all placeholder:text-slate-600 font-medium"
                  onChange={handleChange}
                  value={formData.genre}
                />
              </div>
            </div>

            <div className="relative">
              <Disc className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
              <input
                name="album"
                placeholder="Album"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-slate-600 transition-all placeholder:text-slate-600 font-medium"
                onChange={handleChange}
                value={formData.album}
              />
            </div>

            <div className="relative">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
              <input
                required
                name="url"
                placeholder="YouTube URL"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-slate-600 transition-all placeholder:text-slate-600 font-medium"
                onChange={handleChange}
                value={formData.url}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 font-semibold text-slate-950 transition-colors hover:bg-slate-200 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
            {loading ? 'Saving...' : 'Add song'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSongModal;
