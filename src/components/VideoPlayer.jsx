import React, { useState, useEffect } from 'react';
import { ArrowLeft, Share2, ThumbsUp, MoreVertical, MessageSquare, Play, ExternalLink, Info, Loader2 } from 'lucide-react';

const VideoPlayer = ({ song, songs = [], onClose, onSelectSong }) => {
  const [isReady, setIsReady] = useState(false);
  
  if (!song) return null;

  // Function to extract YouTube ID and create a clean embed URL
  const getEmbedUrl = (url) => {
    if (!url) return '';
    let videoId = '';
    if (url.includes('v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('embed/')) {
      videoId = url.split('embed/')[1].split('?')[0];
    }
    
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;
    }
    return url; // Fallback to raw URL
  };

  const recommendations = songs
    .filter(s => s.id !== song.id)
    .slice(0, 8);

  const getThumbnail = (url) => {
    if (url?.includes('youtube.com') || url?.includes('youtu.be')) {
      const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    return 'https://via.placeholder.com/120x67?text=Music';
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] overflow-y-auto animate-in fade-in duration-700 selection:bg-white/20">
      {/* Dynamic Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>

      {/* Modern Navigation */}
      <nav className="sticky top-0 z-[60] bg-black/40 backdrop-blur-2xl px-8 py-5 flex items-center justify-between border-b border-white/5">
        <button 
          onClick={onClose}
          className="flex items-center gap-3 text-zinc-400 hover:text-white transition-all group"
        >
          <div className="p-2 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="text-sm font-bold tracking-tight uppercase">Exit Theater</span>
        </button>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 px-4 py-1.5 bg-white/5 rounded-full border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <span className="text-[10px] text-zinc-300 font-black uppercase tracking-[0.2em]">SONG API Engine v2</span>
          </div>
          <a 
            href={song.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white p-2 transition-colors"
            title="Open original link"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </nav>

      <div className="relative max-w-[1600px] mx-auto px-8 py-10 lg:flex gap-16">
        {/* Main Cinema Stage */}
        <div className="flex-1">
          {/* Enhanced Video Container */}
          <div className="group relative aspect-video rounded-[2.5rem] overflow-hidden bg-black shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] border border-white/10 mb-12">
            {!isReady && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 z-10">
                <Loader2 className="animate-spin text-zinc-700 mb-4" size={48} />
                <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">Initializing Stream</p>
              </div>
            )}
            <iframe
              src={getEmbedUrl(song.url)}
              className="w-full h-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              onLoad={() => setIsReady(true)}
              title={song.title}
            />
          </div>
          
          <div className="flex flex-col gap-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-white text-black px-3 py-1.5 rounded-lg shadow-xl shadow-white/10">
                    {song.genre || 'Master'}
                  </span>
                  <div className="h-px w-8 bg-white/10" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                    {song.album || 'Standard Audio'}
                  </span>
                </div>
                <h1 className="text-5xl font-black text-white mb-6 tracking-tighter leading-none italic">
                  {song.title}
                </h1>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-800 to-black border border-white/10 flex items-center justify-center text-white text-2xl font-black shadow-2xl">
                    {song.artist?.[0]}
                  </div>
                  <div>
                    <h3 className="text-zinc-100 font-bold text-xl tracking-tight">{song.artist}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Authenticated Artist</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-3 px-8 py-4 bg-white text-black font-black text-sm rounded-2xl hover:bg-zinc-200 transition-all transform active:scale-95 shadow-xl shadow-white/5">
                  <Play size={18} fill="currentColor" />
                  SUBSCRIBE
                </button>
                <button className="p-4 bg-white/5 text-zinc-400 rounded-2xl hover:text-white hover:bg-white/10 transition-all border border-white/5">
                  <ThumbsUp size={20} />
                </button>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-[2rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-zinc-400">
                <Info size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Metadata Analysis</span>
              </div>
              <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                Sourced from the <span className="text-white font-bold">SONG API</span>. This track represents high-fidelity 
                digital distribution. Currently experiencing optimized playback for <span className="text-white font-bold">{song.genre}</span> enthusiasts worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* Vertical Playlist */}
        <div className="lg:w-[400px] mt-16 lg:mt-0">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-white font-black text-2xl tracking-tighter italic">Queue</h2>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>

          <div className="flex flex-col gap-6 max-h-[800px] pr-4 overflow-y-auto custom-scrollbar">
            {recommendations.length > 0 ? (
              recommendations.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-5 group cursor-pointer p-3 rounded-3xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
                  onClick={() => {
                    onSelectSong(item);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="w-36 aspect-video rounded-2xl bg-zinc-900 border border-white/5 overflow-hidden flex-shrink-0 relative">
                    <img 
                      src={getThumbnail(item.url)} 
                      alt={item.title} 
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/60 backdrop-blur-[2px]">
                      <div className="p-2 bg-white rounded-full text-black scale-75 group-hover:scale-100 transition-transform duration-500">
                        <Play size={16} fill="currentColor" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <h4 className="text-zinc-200 text-sm font-black truncate group-hover:text-white transition-colors tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-zinc-500 text-[11px] mt-1.5 font-bold uppercase tracking-widest">{item.artist}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[9px] text-zinc-600 font-black uppercase tracking-tighter bg-white/5 px-2 py-0.5 rounded">
                        {item.genre}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white/[0.01] rounded-3xl border border-dashed border-white/5">
                <p className="text-zinc-600 text-sm font-bold uppercase tracking-[0.2em]">End of Library</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
