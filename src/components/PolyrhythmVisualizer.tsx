import React, { useState, useEffect } from 'react';
import { Play, Pause, Disc3 } from 'lucide-react';

interface PolyrhythmOption {
  name: string;
  ratioA: number;
  ratioB: number;
  labelA: string;
  labelB: string;
  description: string;
}

const POLYRHYTHM_PRESETS: PolyrhythmOption[] = [
  { name: '3 : 2 Hemiola', ratioA: 3, ratioB: 2, labelA: 'Triplet (3)', labelB: 'Duplet (2)', description: 'Classic afro-cuban & baroque hemiola cross-rhythm' },
  { name: '4 : 3 Cross-Beat', ratioA: 4, ratioB: 3, labelA: '4 Beats', labelB: '3 Beats', description: 'Complex polyrhythm found in jazz, math-rock & contemporary percussion' },
  { name: '5 : 4 Progressive', ratioA: 5, ratioB: 4, labelA: '5 Pulses', labelB: '4 Pulses', description: 'Advanced odd-meter polyrhythmic layering' },
];

export const PolyrhythmVisualizer: React.FC = () => {
  const [selectedRatio, setSelectedRatio] = useState<PolyrhythmOption>(POLYRHYTHM_PRESETS[0]);
  const [activeStepA, setActiveStepA] = useState<number>(0);
  const [activeStepB, setActiveStepB] = useState<number>(0);
  const [isPlayingLocal, setIsPlayingLocal] = useState<boolean>(false);

  useEffect(() => {
    if (!isPlayingLocal) return;

    const period = 2400; // ms for one full polyrhythm cycle
    const intervalA = period / selectedRatio.ratioA;
    const intervalB = period / selectedRatio.ratioB;

    let timerA: number;
    let timerB: number;

    const stepA = () => {
      setActiveStepA((prev) => (prev + 1) % selectedRatio.ratioA);
      timerA = window.setTimeout(stepA, intervalA);
    };

    const stepB = () => {
      setActiveStepB((prev) => (prev + 1) % selectedRatio.ratioB);
      timerB = window.setTimeout(stepB, intervalB);
    };

    timerA = window.setTimeout(stepA, intervalA);
    timerB = window.setTimeout(stepB, intervalB);

    return () => {
      clearTimeout(timerA);
      clearTimeout(timerB);
    };
  }, [isPlayingLocal, selectedRatio]);

  return (
    <section id="polyrhythm" className="pt-4 pb-10 md:pt-6 md:pb-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20">
      
      {/* Section Header */}
      <div className="text-center space-y-2 mb-6 md:mb-8">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-[11px] font-mono text-purple-400">
          <Disc3 className="w-3 h-3 animate-spin-slow" />
          <span>Polyrhythmic Phasing</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
          Concentric <span className="gradient-text-purple">Polyrhythms</span>
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-xs sm:text-sm">
          Visualizing dual independent tempo phase meters intersecting on the primary downbeat.
        </p>
      </div>

      <div className="rounded-2xl glass-panel-glow border border-slate-800 bg-brand-dark/95 p-4 sm:p-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          
          {/* Controls & Preset Selection (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="text-[11px] uppercase font-mono text-purple-400 font-semibold">Select Ratio Preset</span>
              <div className="space-y-1.5 mt-2">
                {POLYRHYTHM_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      setSelectedRatio(preset);
                      setActiveStepA(0);
                      setActiveStepB(0);
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all ${
                      selectedRatio.name === preset.name
                        ? 'bg-purple-950/50 border-purple-400 text-white shadow-neon-purple'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-display font-bold text-xs text-purple-300">{preset.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{preset.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsPlayingLocal(!isPlayingLocal)}
              className={`w-full py-2.5 rounded-xl font-bold font-mono text-xs transition-all flex items-center justify-center gap-1.5 ${
                isPlayingLocal
                  ? 'bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-neon-purple hover:opacity-90'
              }`}
            >
              {isPlayingLocal ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlayingLocal ? 'PAUSE LOOP' : 'SIMULATE POLYRHYTHM'}</span>
            </button>
          </div>

          {/* Interactive Dual Ring Visualizer (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 sm:p-5 bg-slate-950/70 rounded-xl border border-slate-800/80">
            
            <div className="w-full space-y-4 max-w-sm">
              
              {/* Outer Voice A Nodes */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                  <span className="text-cyan-400 font-bold">Voice A ({selectedRatio.labelA})</span>
                  <span className="text-slate-400">Step {activeStepA + 1} / {selectedRatio.ratioA}</span>
                </div>
                <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${selectedRatio.ratioA}, minmax(0, 1fr))` }}>
                  {Array.from({ length: selectedRatio.ratioA }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-9 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-all duration-150 ${
                        isPlayingLocal && activeStepA === i
                          ? 'bg-cyan-400 text-slate-950 shadow-neon-cyan scale-105 border-2 border-white'
                          : 'bg-slate-900 border border-slate-800 text-slate-500'
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Inner Voice B Nodes */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                  <span className="text-amber-400 font-bold">Voice B ({selectedRatio.labelB})</span>
                  <span className="text-slate-400">Step {activeStepB + 1} / {selectedRatio.ratioB}</span>
                </div>
                <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${selectedRatio.ratioB}, minmax(0, 1fr))` }}>
                  {Array.from({ length: selectedRatio.ratioB }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-9 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-all duration-150 ${
                        isPlayingLocal && activeStepB === i
                          ? 'bg-amber-400 text-slate-950 shadow-neon-amber scale-105 border-2 border-white'
                          : 'bg-slate-900 border border-slate-800 text-slate-500'
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Intersection Info */}
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-center text-[11px] font-mono text-slate-400">
                {activeStepA === 0 && activeStepB === 0 && isPlayingLocal ? (
                  <span className="text-cyan-300 font-bold animate-pulse">
                    ⚡ DOWNBEAT IN SYNC
                  </span>
                ) : (
                  <span>Phase offset active across divisions</span>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
