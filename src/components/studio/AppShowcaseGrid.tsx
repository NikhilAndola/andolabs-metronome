import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Github, CheckCircle2 } from 'lucide-react';
import { STUDIO_APPS } from '../../data/studioData';
import andolaLabsIcon from '../../assets/andolalabs_icon.svg';

export const AppShowcaseGrid: React.FC = () => {
  return (
    <section id="apps" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PRODUCTION RELEASES</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
          Featured <span className="gradient-text-cyan">Applications</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm">
          High-performance digital audio instruments engineered for live stage musicians, drummers, and sound engineers.
        </p>
      </div>

      {/* Flagship App Card */}
      {STUDIO_APPS.map((app) => (
        <div 
          key={app.id}
          className="relative rounded-3xl bg-slate-900/80 border border-cyan-500/30 p-6 sm:p-8 lg:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden group hover:border-cyan-400/60 transition-all duration-300"
        >
          {/* Subtle Glow Backdrop */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badges & Meta */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className={`text-[11px] font-mono font-bold px-3 py-1 rounded-full border ${app.badgeColor}`}>
                  {app.badge}
                </span>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  {app.category}
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display flex items-center gap-3">
                  <span>{app.title}</span>
                </h3>
                <p className="text-sm font-semibold text-cyan-300 mt-1 font-mono">
                  {app.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {app.description}
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {app.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Metrics Grid */}
              {app.metrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80">
                  {app.metrics.map((m) => (
                    <div key={m.label} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
                      <div className="text-[10px] text-slate-400 font-mono">{m.label}</div>
                      <div className="text-xs sm:text-sm font-bold text-white font-mono mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                {app.route && (
                  <Link
                    to={app.route}
                    className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm shadow-neon-cyan hover:shadow-neon-cyan-lg transition-all"
                  >
                    <Sparkles className="w-4 h-4 fill-slate-950" />
                    <span>Launch Web Experience</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}

                {app.githubUrl && (
                  <a
                    href={app.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-slate-200 text-xs sm:text-sm font-medium transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Code</span>
                  </a>
                )}
              </div>

            </div>

            {/* Right Interactive Visual Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-slate-950/90 border border-cyan-500/30 p-6 shadow-2xl space-y-5 relative group/preview">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 p-1 flex items-center justify-center">
                      <img src={andolaLabsIcon} alt="Icon" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white font-mono">Web Audio DSP Core</div>
                      <div className="text-[10px] text-cyan-400 font-mono">120 BPM • 4/4 March</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    ZERO DRIFT
                  </span>
                </div>

                {/* Animated Beat Bar Representation */}
                <div className="space-y-2">
                  <div className="text-[10px] text-slate-400 font-mono flex justify-between">
                    <span>Lookahead Audio Queue</span>
                    <span className="text-cyan-400">25ms Window</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="h-10 rounded-lg bg-cyan-500/30 border border-cyan-400/80 flex items-center justify-center font-mono font-bold text-cyan-300 text-xs shadow-neon-cyan">
                      1
                    </div>
                    <div className="h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-slate-500 text-xs">
                      2
                    </div>
                    <div className="h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-slate-500 text-xs">
                      3
                    </div>
                    <div className="h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-slate-500 text-xs">
                      4
                    </div>
                  </div>
                </div>

                {/* Feature Highlights List */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Concentric polyrhythms (3:4, 4:5, 5:7)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Tri-Modal: Audio + Heavy Haptics + Strobe</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Stage setlists with atomic offline sync</span>
                  </div>
                </div>

                {/* Direct Launch Preview Button */}
                <Link
                  to="/metronome"
                  className="block w-full py-2.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 text-center text-xs font-mono font-bold transition-all"
                >
                  Launch Metronome Simulator →
                </Link>

              </div>
            </div>

          </div>
        </div>
      ))}

    </section>
  );
};
