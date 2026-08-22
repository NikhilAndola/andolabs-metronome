import React from 'react';
import { ExternalLink, Github, Mail, Terminal } from 'lucide-react';
import { STUDIO_INFO } from '../../data/studioData';
import andolaLabsIcon from '../../assets/andolalabs_icon.svg';

export const StudioPhilosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      
      {/* Studio Philosophy & Creator Card */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900/90 border border-slate-800 p-8 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl">
        
        {/* Glow Element */}
        <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Column: Creator & Lab Mission */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-mono">
              <Terminal className="w-3.5 h-3.5" />
              <span>STUDIO PHILOSOPHY &amp; CREATOR</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              Crafted at the intersection of <br />
              <span className="gradient-text-cyan">Acoustic Precision</span> &amp; Modern Systems
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              AndolaLabs was founded by <strong>{STUDIO_INFO.creator}</strong> with a singular focus: build software instruments that musicians can trust on stage and in the studio without latency, jitter, or offline failure.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={STUDIO_INFO.creatorPortfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-white font-mono text-xs font-semibold hover:text-cyan-300 transition-all shadow-sm"
              >
                <span>Developer Portfolio</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={STUDIO_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-white font-mono text-xs font-semibold hover:text-cyan-300 transition-all shadow-sm"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Profile</span>
              </a>

              <a
                href={`mailto:${STUDIO_INFO.supportEmail}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 font-mono text-xs font-semibold hover:text-cyan-300 transition-all shadow-sm"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{STUDIO_INFO.supportEmail}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Studio Stamp Badge */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="p-8 rounded-3xl bg-slate-950/80 border border-slate-800/80 text-center space-y-4 max-w-xs w-full shadow-lg">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-slate-900 border border-cyan-500/40 p-3 mx-auto shadow-neon-cyan flex items-center justify-center">
                <img src={andolaLabsIcon} alt="AndolaLabs Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-display font-bold text-white text-base">Andola<span className="gradient-text-cyan">Labs</span></div>
                <div className="text-xs text-slate-400 font-mono">Est. {STUDIO_INFO.establishedYear} • India / Global</div>
              </div>
              <div className="text-[11px] font-mono text-slate-400 border-t border-slate-800/80 pt-3">
                Zero Audio Jitter • Local-First • Stage Ready
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
