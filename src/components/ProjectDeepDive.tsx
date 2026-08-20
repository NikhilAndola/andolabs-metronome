import React, { useState } from 'react';
import { ChevronRight, CheckCircle2, Code2, Sparkles } from 'lucide-react';
import { CASE_STUDY_PILLARS, METRONOME_APP_INFO } from '../data/metronomeData';

export const ProjectDeepDive: React.FC = () => {
  const [activePillar, setActivePillar] = useState<string>(CASE_STUDY_PILLARS[0].id);

  const selected = CASE_STUDY_PILLARS.find(p => p.id === activePillar) || CASE_STUDY_PILLARS[0];
  const IconComponent = selected.icon;

  return (
    <section id="features" className="pt-4 pb-10 md:pt-6 md:pb-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-8 gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[11px] font-mono text-cyan-400">
            <Sparkles className="w-3 h-3" />
            <span>Core Engineering Breakdown</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
            Architectural <span className="gradient-text-cyan">Pillars</span>
          </h2>
          <p className="text-slate-400 max-w-lg text-xs sm:text-sm">
            Deep dive into the zero-drift audio engine, multi-sensory haptic triggers, atomic offline persistence, and in-app monetization.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={METRONOME_APP_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl glass-panel border border-slate-700 hover:border-cyan-400 text-xs font-mono text-slate-200 hover:text-white transition-all flex items-center gap-2"
          >
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>View Source on GitHub</span>
          </a>
        </div>
      </div>

      {/* Case Study Interactive Navigation & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Navigation Tabs (4 cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          {CASE_STUDY_PILLARS.map((pillar) => {
            const PillarIcon = pillar.icon;
            const isCurrent = pillar.id === activePillar;

            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id)}
                className={`w-full p-3 rounded-xl border text-left transition-all duration-200 flex items-start justify-between group ${
                  isCurrent
                    ? 'bg-slate-900/90 border-cyan-500/60 shadow-neon-cyan'
                    : 'bg-brand-dark/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-lg ${pillar.bgColor} border ${pillar.borderColor} ${pillar.color}`}>
                    <PillarIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs sm:text-sm text-white group-hover:text-cyan-300 transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-mono">{pillar.subtitle}</p>
                  </div>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 mt-1 transition-transform ${isCurrent ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Right Column: Deep Dive Panel (8 cols) */}
        <div className="lg:col-span-8 p-4 sm:p-6 rounded-2xl glass-panel-glow border border-slate-800 bg-brand-dark/95 flex flex-col justify-between">
          
          <div className="space-y-4">
            {/* Pillar Header */}
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <div className={`p-2 rounded-xl ${selected.bgColor} border ${selected.borderColor} ${selected.color}`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-semibold">
                  Engineering Pillar
                </span>
                <h3 className="text-lg sm:text-xl font-display font-bold text-white">
                  {selected.title}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              {selected.description}
            </p>

            {/* Key Deliverables Bullet Points */}
            <div className="space-y-2 pt-1">
              <h5 className="text-[11px] uppercase font-mono tracking-wider text-slate-400 font-semibold">
                Technical Highlights & Architectural Solutions:
              </h5>
              <div className="space-y-2">
                {selected.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                    <span className="text-xs text-slate-200">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="pt-3 border-t border-slate-800/80">
              <span className="text-[11px] font-mono text-slate-400 block mb-1.5">Technologies Used:</span>
              <div className="flex flex-wrap gap-1.5">
                {selected.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-lg bg-slate-900 border border-slate-700 text-[11px] font-mono text-cyan-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
