import React from 'react';
import { Play, Sparkles, Sliders, Layers, ArrowRight, Smartphone } from 'lucide-react';
import { METRONOME_APP_INFO } from '../data/metronomeData';

interface AppHeroProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  bpm: number;
}

export const AppHero: React.FC<AppHeroProps> = ({ isPlaying, onTogglePlay, bpm }) => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const cleanId = targetId.replace('#', '');
    const element = document.getElementById(cleanId);
    if (element) {
      const targetContent = (element.firstElementChild as HTMLElement) || element;
      const navbarOffset = 78;
      const targetRect = targetContent.getBoundingClientRect();
      const offsetPosition = targetRect.top + window.pageYOffset - navbarOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
      window.history.pushState(null, '', targetId);
    }
  };

  return (
    <section className="relative pt-24 pb-8 md:pt-32 md:pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Background glow halos */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="flex flex-col items-center text-center space-y-4 md:space-y-5">
        
        {/* Android App Coming Soon Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-950/90 via-slate-900 to-cyan-950/90 border border-emerald-500/50 text-xs font-mono shadow-[0_0_30px_rgba(16,185,129,0.25)] animate-fade-in">
          <Smartphone className="w-4 h-4 text-emerald-400 animate-bounce" />
          <span className="font-bold text-white tracking-tight">Android Application</span>
          <span className="text-slate-500">•</span>
          <span className="text-emerald-300 font-medium">Launching Soon on Google Play Store</span>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-[11px] font-mono text-cyan-300 shadow-neon-cyan animate-subtle-float">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
            </span>
            <span>Production Debut Mobile App • React Native &amp; Web Audio</span>
          </div>

          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Sub-Millisecond DSP Timing</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="space-y-3 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.15]">
            {METRONOME_APP_INFO.name} <br className="hidden sm:inline" />
            <span className="gradient-text-cyan">Audio Engine & Architecture</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            {METRONOME_APP_INFO.description}
          </p>
        </div>

        {/* Quick CTA Actions */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
          
          <button
            onClick={onTogglePlay}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold text-xs sm:text-sm shadow-neon-cyan hover:shadow-cyan-400/50 transition-all duration-300 flex items-center gap-2 group"
          >
            <Play className={`w-4 h-4 fill-current text-slate-950 ${isPlaying ? 'animate-spin-slow' : 'group-hover:scale-110 transition-transform'}`} />
            <span>{isPlaying ? 'Stop Metronome Simulator' : 'Launch Audio Simulator'}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950/20 text-slate-950 border border-slate-950/30">
              {bpm} BPM
            </span>
          </button>

          <a
            href="#demo"
            onClick={(e) => handleScrollTo(e, '#demo')}
            className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl glass-panel border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800/60 text-slate-200 hover:text-white font-medium text-xs sm:text-sm transition-all flex items-center gap-2 group"
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Explore Controls</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#architecture"
            onClick={(e) => handleScrollTo(e, '#architecture')}
            className="px-4 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-white font-mono text-xs transition-all flex items-center gap-2 group"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>DSP Patterns</span>
          </a>

        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-3xl pt-4">
          <div className="p-3 sm:p-3.5 rounded-xl glass-panel border border-slate-800/80 hover:border-cyan-500/30 transition-all text-left">
            <div className="font-display font-bold text-xl text-cyan-400">&lt; 1ms</div>
            <div className="text-[11px] font-semibold text-slate-200 mt-0.5">Zero Audio Jitter</div>
            <div className="text-[10px] font-mono text-slate-400">Lookahead buffer loop</div>
          </div>
          <div className="p-3 sm:p-3.5 rounded-xl glass-panel border border-slate-800/80 hover:border-amber-500/30 transition-all text-left">
            <div className="font-display font-bold text-xl text-amber-400">Tri-Modal</div>
            <div className="text-[11px] font-semibold text-slate-200 mt-0.5">Sound + Haptics + Strobe</div>
            <div className="text-[10px] font-mono text-slate-400">Multisensory downbeat</div>
          </div>
          <div className="p-3 sm:p-3.5 rounded-xl glass-panel border border-slate-800/80 hover:border-purple-500/30 transition-all text-left">
            <div className="font-display font-bold text-xl text-purple-400">Polyrhythms</div>
            <div className="text-[11px] font-semibold text-slate-200 mt-0.5">Concentric Phasing</div>
            <div className="text-[10px] font-mono text-slate-400">3:2, 4:3, 5:4 sync</div>
          </div>
          <div className="p-3 sm:p-3.5 rounded-xl glass-panel border border-slate-800/80 hover:border-emerald-500/30 transition-all text-left">
            <div className="font-display font-bold text-xl text-emerald-400">Offline-First</div>
            <div className="text-[11px] font-semibold text-slate-200 mt-0.5">Atomic Setlist Cache</div>
            <div className="text-[10px] font-mono text-slate-400">Stage tempo recall</div>
          </div>
        </div>

      </div>

    </section>
  );
};
