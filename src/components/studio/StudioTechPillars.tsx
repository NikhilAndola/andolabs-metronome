import React from 'react';
import { Cpu, CheckCircle2 } from 'lucide-react';
import { STUDIO_TECH_PILLARS } from '../../data/studioData';

export const StudioTechPillars: React.FC = () => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'cyan':
        return {
          badge: 'text-cyan-400 bg-cyan-950/80 border-cyan-800',
          iconBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
          borderHover: 'hover:border-cyan-500/40',
        };
      case 'amber':
        return {
          badge: 'text-amber-400 bg-amber-950/80 border-amber-800',
          iconBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          borderHover: 'hover:border-amber-500/40',
        };
      case 'purple':
        return {
          badge: 'text-purple-400 bg-purple-950/80 border-purple-800',
          iconBg: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
          borderHover: 'hover:border-purple-500/40',
        };
      default:
        return {
          badge: 'text-emerald-400 bg-emerald-950/80 border-emerald-800',
          iconBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          borderHover: 'hover:border-emerald-500/40',
        };
    }
  };

  return (
    <section id="engineering" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>ENGINEERING EXCELLENCE</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
          Core Technical <span className="gradient-text-cyan">Pillars</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm">
          Architectural principles powering high-precision DSP timing, multisensory synchronization, and atomic offline storage.
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {STUDIO_TECH_PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          const styles = getColorClasses(pillar.color);

          return (
            <div
              key={pillar.id}
              className={`p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 ${styles.borderHover} backdrop-blur-xl space-y-6 transition-all duration-300 shadow-lg`}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl ${styles.iconBg} border flex items-center justify-center p-2.5 shadow-sm`}>
                  <Icon className="w-full h-full" />
                </div>
                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${styles.badge}`}>
                  {pillar.stats}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-xl font-bold text-white font-display">
                  {pillar.title}
                </h3>
                <div className="text-xs font-mono text-slate-400 mt-1">
                  {pillar.subtitle}
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {pillar.description}
              </p>

              {/* Detail Bullet Points */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                {pillar.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {pillar.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-slate-950 text-slate-400 border border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
