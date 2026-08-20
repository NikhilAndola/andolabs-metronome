import React, { useState } from 'react';
import { Code2, Copy, Check, Terminal, Sparkles, Cpu, Layers } from 'lucide-react';
import { ARCHITECTURE_MODULES } from '../data/metronomeData';

export const ArchitectureExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const currentModule = ARCHITECTURE_MODULES[activeTab] || ARCHITECTURE_MODULES[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentModule.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="architecture" className="pt-4 pb-10 md:pt-6 md:pb-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20">
      
      {/* Section Header */}
      <div className="text-center space-y-2 mb-6 md:mb-8">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[11px] font-mono text-cyan-400">
          <Terminal className="w-3 h-3" />
          <span>Source Code & DSP Patterns</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
          Systems & Audio <span className="gradient-text-cyan">Architecture</span>
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-xs sm:text-sm">
          Strictly typed React Native, Web Audio API DSP patterns, lookahead queues, and hardware haptic controllers.
        </p>
      </div>

      {/* Main Code Terminal Shell */}
      <div className="rounded-2xl glass-panel-glow border border-slate-800 bg-brand-dark/95 overflow-hidden shadow-glass-card">
        
        {/* Terminal Header & Tab Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-3 sm:px-4 py-2.5 gap-2.5">
          
          {/* Module Select Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {ARCHITECTURE_MODULES.map((mod, idx) => {
              const isSelected = activeTab === idx;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveTab(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-neon-cyan'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                  }`}
                >
                  <Code2 className="w-3 h-3 text-cyan-400" />
                  <span>{mod.title}</span>
                </button>
              );
            })}
          </div>

          {/* Copy Button & Tag */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800 hidden md:inline">
              TypeScript / React Native
            </span>
            <button
              onClick={handleCopyCode}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-all text-xs font-mono flex items-center gap-1.5"
              title="Copy Code Snippet"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[11px] text-emerald-400 hidden sm:inline">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[11px] hidden sm:inline">Copy</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Code Content & Context Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* LEFT: Context Highlights & Notes (4 cols) */}
          <div className="lg:col-span-4 p-4 sm:p-5 border-b lg:border-b-0 lg:border-r border-slate-800/80 bg-slate-950/40 flex flex-col justify-between">
            <div className="space-y-3">
              <div>
                <div className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{currentModule.subtitle}</span>
                </div>
                <h3 className="text-base sm:text-lg font-display font-bold text-white">
                  {currentModule.title}
                </h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {currentModule.description}
              </p>

              <div className="space-y-2 pt-2">
                <h5 className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold">
                  Architectural Benefits:
                </h5>
                <ul className="space-y-1.5">
                  {currentModule.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1 text-cyan-400">
                <Cpu className="w-3 h-3" />
                Zero-Drift Loop
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Layers className="w-3 h-3" />
                Modular Layer
              </span>
            </div>
          </div>

          {/* RIGHT: Code Block Display (8 cols) */}
          <div className="lg:col-span-8 p-3 sm:p-4 bg-slate-950/90 font-mono text-xs overflow-x-auto">
            <pre className="text-slate-300 leading-relaxed">
              <code>{currentModule.codeSnippet}</code>
            </pre>
          </div>

        </div>

      </div>

    </section>
  );
};
