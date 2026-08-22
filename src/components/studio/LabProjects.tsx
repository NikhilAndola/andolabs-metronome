import React from 'react';
import { Clock } from 'lucide-react';
import { LAB_EXPERIMENTS } from '../../data/studioData';

export const LabProjects: React.FC = () => {
  return (
    <section id="lab" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800 text-purple-400 text-xs font-mono">
          <Clock className="w-3.5 h-3.5" />
          <span>IN THE LAB • R&amp;D ROADMAP</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
          Experimental <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Innovations</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm">
          Next-generation music technology and DSP audio software currently under active research and kernel prototyping.
        </p>
      </div>

      {/* Lab Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {LAB_EXPERIMENTS.map((exp) => {
          const Icon = exp.icon;
          return (
            <div 
              key={exp.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/90 hover:border-purple-500/40 backdrop-blur-md space-y-4 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                
                {/* Header: Icon & Category */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className={`w-5 h-5 ${exp.color}`} />
                  </div>
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-900">
                    {exp.category}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    {exp.title}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 mt-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
                    <span>{exp.stage}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Research Phase</span>
                    <span className="text-purple-300">{exp.stageProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                      style={{ width: `${exp.stageProgress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-xs leading-relaxed">
                  {exp.description}
                </p>

              </div>

              {/* Tech Stack Tags */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                {exp.tech.map((t) => (
                  <span 
                    key={t}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                  >
                    {t}
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
