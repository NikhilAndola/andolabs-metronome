import React from 'react';
import { ArrowUp, Github, ExternalLink } from 'lucide-react';
import { METRONOME_APP_INFO } from '../data/metronomeData';

export const AppFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-800/80 bg-slate-950/90 text-slate-400 text-xs py-8 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-slate-900 border border-cyan-500/40 flex items-center justify-center p-1 shadow-neon-cyan overflow-hidden">
            <img 
              src="/gemini-svg.svg" 
              alt="AndoLabs Brand Icon" 
              className="w-full h-full object-contain drop-shadow-[0_0_6px_rgba(0,242,254,0.5)]" 
            />
          </div>
          <div>
            <div className="font-display font-bold text-white text-sm flex items-center gap-2">
              <span>Ando<span className="gradient-text-cyan">Labs</span> Metronome</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                PRO DSP
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Ultra Low-Latency Audio Metronome & Polyrhythm Visualizer
            </div>
          </div>
        </div>

        {/* Social & Back to Top */}
        <div className="flex items-center gap-3">
          <a
            href={METRONOME_APP_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-400 hover:text-cyan-300 transition-colors"
            title="GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={METRONOME_APP_INFO.creatorPortfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1 font-mono text-[11px]"
            title="Developer Portfolio"
          >
            <span>Developer Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-400 hover:text-cyan-300 transition-colors group"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>

      <div className="max-w-6xl mx-auto mt-6 pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-2">
        <div>
          © {new Date().getFullYear()} AndoLabs Metronome. Built with Web Audio API & React Native.
        </div>
        <div className="flex items-center gap-4">
          <span className="text-cyan-400/80 font-semibold">Zero Audio Jitter</span>
          <span>•</span>
          <span className="text-purple-400/80">Concentric Polyrhythms</span>
          <span>•</span>
          <span className="text-amber-400/80">Stage Ready</span>
        </div>
      </div>
    </footer>
  );
};
