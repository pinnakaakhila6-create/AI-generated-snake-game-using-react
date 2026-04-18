import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music2, Share2, Heart } from 'lucide-react';

const DUMMY_TRACKS = [
  {
    id: 1,
    title: "Neon Horizon",
    artist: "SynthAI Alpha",
    duration: "3:42",
    cover: "https://picsum.photos/seed/neon1/400/400",
    color: "var(--color-neon-cyan)"
  },
  {
    id: 2,
    title: "Quantum Drift",
    artist: "Neural Rhythm",
    duration: "4:15",
    cover: "https://picsum.photos/seed/cyber2/400/400",
    color: "var(--color-neon-pink)"
  },
  {
    id: 3,
    title: "Midnight Void",
    artist: "Glitch Oracle",
    duration: "2:58",
    cover: "https://picsum.photos/seed/dark3/400/400",
    color: "var(--color-neon-lime)"
  }
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  
  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => (p >= 100 ? 0 : p + 0.2));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  return (
    <div className="w-full max-w-[400px] bg-glitch-black p-6 pixel-border-magenta font-pixel">
      <div className="relative group mb-8">
        <motion.div 
          key={currentTrack.id}
          animate={{ x: isPlaying ? [0, -1, 1, 0] : 0 }}
          transition={{ repeat: Infinity, duration: 0.1 }}
          className="aspect-square w-full overflow-hidden border-2 border-glitch-cyan"
        >
          <img 
            src={currentTrack.cover} 
            alt={currentTrack.title}
            className="w-full h-full object-cover grayscale brightness-50 contrast-150"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-glitch-magenta mix-blend-multiply opacity-20" />
        </motion.div>
        
        {isPlaying && (
          <div className="absolute -bottom-2 -left-2 -right-2 flex items-end justify-center gap-[1px] h-12 overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: [`${Math.random() * 20}%`, `${Math.random() * 80}%`, `${Math.random() * 20}%`] }}
                transition={{ repeat: Infinity, duration: 0.2 }}
                className="w-2 bg-glitch-cyan"
              />
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1 min-w-0 pr-4">
            <motion.h3 
              data-text={currentTrack.title.toUpperCase()}
              className="glitch-text text-3xl font-black truncate text-glitch-white"
            >
              {currentTrack.title.toUpperCase()}
            </motion.h3>
            <p className="text-glitch-magenta text-xs uppercase tracking-tighter mt-1">
              SOURCE: {currentTrack.artist.toUpperCase()}
            </p>
          </div>
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`p-1 border-2 ${isLiked ? 'bg-glitch-magenta text-glitch-black border-glitch-magenta' : 'text-glitch-cyan border-glitch-cyan'}`}
          >
            <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="pt-4 pb-2">
          <div className="h-4 w-full bg-glitch-white bg-opacity-10 border border-glitch-cyan relative mb-1">
            <motion.div 
              className="h-full bg-glitch-cyan"
              style={{ width: `${progress}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[8px] text-glitch-black mix-blend-difference font-bold">DECODING_PHASE: {progress.toFixed(0)}%</span>
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-glitch-cyan opacity-80 uppercase">
            <span>OFFSET: {Math.floor(progress * 2)}S</span>
            <span>LEN: {currentTrack.duration}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 py-2 border-t border-glitch-magenta border-opacity-30">
        <button className="text-glitch-magenta hover:text-glitch-cyan">
          <Share2 className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-4">
          <button 
            onClick={handlePrev}
            className="p-2 border border-glitch-cyan hover:bg-glitch-cyan hover:text-glitch-black transition-colors"
          >
            <SkipBack className="w-6 h-6 fill-current" />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="pixel-button scale-110"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
          </button>
          <button 
            onClick={handleNext}
            className="p-2 border border-glitch-cyan hover:bg-glitch-cyan hover:text-glitch-black transition-colors"
          >
            <SkipForward className="w-6 h-6 fill-current" />
          </button>
        </div>
        <button className="text-glitch-magenta hover:text-glitch-cyan">
          <Volume2 className="w-5 h-5" />
        </button>
      </div>
      
      <div className="mt-4 text-[8px] text-glitch-magenta text-opacity-40 animate-pulse text-center">
        NOISE_ENCRYPTION_LAYER_ACTIVE
      </div>
    </div>
  );
}
