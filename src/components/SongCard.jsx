import React from 'react';
import { Edit2, Trash2, Play } from 'lucide-react';
import { deleteSong } from '../api';

const SongCard = ({ song, onClick, onEdit, onDelete }) => {
  const getThumbnail = (url) => {
    if (url?.includes('youtube.com') || url?.includes('youtu.be')) {
      const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    return 'https://via.placeholder.com/640x360?text=No+Thumbnail';
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${song.title}"?`)) {
      try {
        await deleteSong(song.id);
        onDelete();
      } catch (err) {
        alert("Failed to delete song.");
      }
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(song);
  };

  return (
    <div 
      className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition-colors hover:border-slate-700"
      onClick={() => onClick(song)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={getThumbnail(song.url)} 
          alt={song.title}
          className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="rounded-full bg-white p-2.5 text-slate-900">
                <Play className="text-white fill-white" size={24} />
            </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="truncate pr-2 text-slate-100">
            {song.title}
          </h3>
          <div className="flex gap-2">
            <button 
              onClick={handleEdit}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              aria-label={`Edit ${song.title}`}
            >
              <Edit2 size={14} />
            </button>
            <button 
              onClick={handleDelete}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-950/30 hover:text-red-400"
              aria-label={`Delete ${song.title}`}
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-slate-500 text-xs">
          <span className="truncate">{song.artist}</span>
          <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold text-slate-400">
            {song.genre}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
