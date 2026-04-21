import React, { useState } from 'react';
import { ArrowLeft, Play, ExternalLink, Loader2 } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 backdrop-blur-sm">
      <nav className="sticky top-0 z-[60] border-b border-slate-800 bg-slate-950/90 px-4 py-4 sm:px-6">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <button 
          onClick={onClose}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
        >
            <ArrowLeft size={16} />
            Back to library
        </button>
        
          <div className="flex items-center gap-3">
            <span className="hidden text-xs uppercase tracking-wider text-slate-500 sm:inline">Now playing</span>
          <a 
            href={song.url} 
            target="_blank" 
            rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
              title="Open original source"
          >
              <ExternalLink size={16} />
              Open source
          </a>
          </div>
        </div>
      </nav>

      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex-1">
          <div className="relative mb-6 aspect-video overflow-hidden rounded-2xl border border-slate-800 bg-black">
            {!isReady && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950">
                <Loader2 className="mb-3 animate-spin text-slate-600" size={34} />
                <p className="text-xs uppercase tracking-wider text-slate-500">Loading player</p>
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
          
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500">
              <span className="rounded bg-slate-800 px-2 py-1 text-slate-200">
                    {song.genre || 'Master'}
                  </span>
              <span className="text-slate-600">/</span>
              <span>
                    {song.album || 'Standard Audio'}
                  </span>
                </div>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {song.title}
                </h1>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-800 text-base font-semibold text-white">
                    {song.artist?.[0]}
                  </div>
                  <div>
                <h3 className="text-base font-semibold text-slate-100">{song.artist}</h3>
                <p className="text-sm text-slate-500">Artist</p>
                  </div>
                </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={song.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200"
              >
                <Play size={15} fill="currentColor" />
                Watch on YouTube
              </a>
              <button
                onClick={onClose}
                className="inline-flex items-center rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
              >
                Close
              </button>
              </div>
            </div>
        </div>

        <aside className="mt-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Up next</h2>
            <span className="text-xs text-slate-500">{recommendations.length} songs</span>
          </div>

          <div className="max-h-[70vh] space-y-3 overflow-y-auto pr-1">
            {recommendations.length > 0 ? (
              recommendations.map((item) => (
                <div 
                  key={item.id} 
                  className="group flex cursor-pointer gap-3 rounded-xl border border-slate-800 bg-slate-900 p-2.5 transition-colors hover:border-slate-700"
                  onClick={() => {
                    onSelectSong(item);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="relative aspect-video w-32 flex-shrink-0 overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
                    <img 
                      src={getThumbnail(item.url)} 
                      alt={item.title} 
                      className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="rounded-full bg-white p-1.5 text-slate-900">
                        <Play size={16} fill="currentColor" />
                      </div>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-medium text-slate-100 group-hover:text-white">
                      {item.title}
                    </h4>
                    <p className="mt-1 truncate text-xs text-slate-500">{item.artist}</p>
                    <div className="mt-2">
                      <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-slate-400">
                        {item.genre}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-slate-800 py-10 text-center">
                <p className="text-sm text-slate-500">No more songs in queue</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default VideoPlayer;
