import React from 'react';

const SongCard = ({ song, onClick }) => {
  const getThumbnail = (url) => {
    if (url?.includes('youtube.com') || url?.includes('youtu.be')) {
      const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    return 'https://via.placeholder.com/640x360?text=No+Thumbnail';
  };

  return (
    <div 
      className="group cursor-pointer bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all duration-300"
      onClick={() => onClick(song)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={getThumbnail(song.url)} 
          alt={song.title}
          className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-xs font-medium bg-black/40 backdrop-blur-md px-2 py-1 rounded-md">
            Play Now
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-zinc-100 font-semibold truncate group-hover:text-white transition-colors">
          {song.title}
        </h3>
        <p className="text-zinc-500 text-sm mt-1 flex justify-between items-center">
          <span>{song.artist}</span>
          <span className="text-[10px] uppercase tracking-widest bg-zinc-800 px-2 py-0.5 rounded text-zinc-400">
            {song.genre}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
