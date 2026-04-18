/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Database } from 'lucide-react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col items-center py-8 px-4 font-pixel">
      {/* Visual Artifacts */}
      <div className="noise-overlay" />
      <div className="scanline" />
      
      <header className="relative z-10 w-full max-w-7xl mb-12 flex flex-col items-center">
        <motion.div 
          animate={{ x: [0, -2, 2, 0], y: [0, 1, -1, 0] }}
          transition={{ repeat: Infinity, duration: 0.2 }}
          className="mb-4"
        >
          <h1 
            data-text="SYSTEM_OVERRIDE_RUNNING"
            className="glitch-text text-4xl md:text-6xl font-black text-glitch-cyan tracking-widest break-all md:break-normal text-center"
          >
            SYSTEM_OVERRIDE_RUNNING
          </h1>
        </motion.div>
        
        <div className="flex gap-4 mb-2">
          <span className="text-glitch-magenta text-xs animate-pulse">BOOT_SEQUENCE: 0xFD2A</span>
          <span className="text-glitch-cyan text-xs">KERNEL: 1.0.9-GLITCH</span>
        </div>
        
        <div className="w-full h-1 bg-glitch-magenta mb-8 relative overflow-hidden">
          <motion.div 
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute inset-0 bg-glitch-cyan w-[20%]"
          />
        </div>
      </header>

      <main className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Column: Music System */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-full mb-4 flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-glitch-magenta" />
              <span className="text-sm font-bold tracking-tighter text-glitch-magenta uppercase">AUDIO_PROTOCOL_LDR</span>
            </div>
            <span className="text-[10px] text-glitch-cyan text-opacity-50">STATUS: DECRYPTING...</span>
          </div>
          <MusicPlayer />
          
          <div className="mt-8 border-2 border-glitch-cyan p-4 w-full max-w-[400px] bg-glitch-cyan bg-opacity-5">
            <h3 className="text-xs text-glitch-cyan mb-2 font-bold tracking-widest">LOGS_V309:</h3>
            <div className="space-y-1 text-[10px] uppercase">
              <p>{`> STREAMING_BUFFER_STABLE`}</p>
              <p className="text-glitch-magenta">{`> DETECTING_RHYTHMIC_ANOMALIES`}</p>
              <p>{`> ENCRYPTING_USER_INPUT_00...`}</p>
            </div>
          </div>
        </motion.section>

        {/* Right Column: Game Logic */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-full mb-4 flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-glitch-magenta" />
              <span className="text-sm font-bold tracking-tighter text-glitch-magenta uppercase">NEURAL_NET_SIMULATOR</span>
            </div>
            <span className="text-[10px] text-glitch-cyan text-opacity-50">TICK: 12ms</span>
          </div>
          <SnakeGame />
          
          <div className="mt-8 grid grid-cols-3 gap-2 w-full max-w-[420px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`h-1 ${i % 2 === 0 ? 'bg-glitch-magenta' : 'bg-glitch-cyan'} opacity-20`} />
            ))}
          </div>
        </motion.section>
      </main>

      <footer className="relative z-10 mt-16 w-full max-w-7xl flex flex-col items-center text-center">
        <div className="p-4 border-t-2 border-glitch-magenta border-dashed w-full opacity-30 mb-8" />
        <p className="text-glitch-cyan text-[10px] tracking-[0.5em] uppercase mb-2">
          RAW_DATA_ONLY // NO_HUMAN_ALLOWED // [REDACTED]
        </p>
        <div className="flex gap-8 text-glitch-white text-[8px] tracking-[0.3em]">
          <span>CPU_TEMP: 88C</span>
          <span className="text-glitch-magenta">LATENCY: NULL</span>
          <span>UPTIME: INFINITY</span>
        </div>
      </footer>
    </div>
  );
}
