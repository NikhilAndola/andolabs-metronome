import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Plus, Minus, 
  Radio, Zap, Lock, Smartphone, AlertCircle
} from 'lucide-react';
import { webAudioEngine, SoundType } from '../audio/WebAudioEngine';
import { TimeSignature } from '../types';

interface MetronomeDemoProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  bpm: number;
  setBpm: (bpm: number) => void;
}

const TIME_SIGNATURES: TimeSignature[] = [
  { beats: 2, noteValue: 4, name: '2/4 March' },
  { beats: 3, noteValue: 4, name: '3/4 Waltz' },
  { beats: 4, noteValue: 4, name: '4/4 Standard' },
  { beats: 5, noteValue: 4, name: '5/4 Odd Time' },
  { beats: 6, noteValue: 8, name: '6/8 Compound' },
  { beats: 7, noteValue: 8, name: '7/8 Progressive' },
];

const SOUND_PRESETS: { type: SoundType; name: string; desc: string; isLocked: boolean }[] = [
  { type: 'digital', name: 'Digital Click', desc: 'Crisp electronic pulse (Active Demo)', isLocked: false },
  { type: 'woodblock', name: 'Woodblock', desc: 'Acoustic resonant percussion', isLocked: true },
  { type: 'beep808', name: '808 Pop', desc: 'Punchy low-transient pop', isLocked: true },
  { type: 'rimshot', name: 'Rimshot', desc: 'Dual-harmonic metal strike', isLocked: true },
];

const SUBDIVISIONS: { type: string; factor: number; label: string; notation: string }[] = [
  { type: 'quarter', factor: 1, label: 'Quarter', notation: '1/4' },
  { type: 'eighth', factor: 2, label: 'Eighth', notation: '1/8' },
  { type: 'triplet', factor: 3, label: 'Triplet', notation: '1/3' },
  { type: 'sixteenth', factor: 4, label: '16th', notation: '1/16' },
];

export const MetronomeDemo: React.FC<MetronomeDemoProps> = ({
  isPlaying,
  onTogglePlay,
  isMuted,
  onToggleMute,
  bpm,
  setBpm,
}) => {
  const [activeBeat, setActiveBeat] = useState<number>(0);
  const [isAccentFlash, setIsAccentFlash] = useState<boolean>(false);
  const [timeSig, setTimeSig] = useState<TimeSignature>(TIME_SIGNATURES[2]); // 4/4
  const [subdivision, setSubdivision] = useState<string>('quarter');
  const [soundType, setSoundType] = useState<SoundType>('digital'); // Digital Click is available
  const [flashEnabled, setFlashEnabled] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.85);
  const [lockedNotice, setLockedNotice] = useState<string | null>(null);

  // Tap tempo state
  const tapTimesRef = useRef<number[]>([]);

  // Get Italian tempo marking
  const getTempoMarking = (val: number) => {
    if (val < 60) return { label: 'Largo', color: 'text-blue-400' };
    if (val < 76) return { label: 'Adagio', color: 'text-cyan-400' };
    if (val < 108) return { label: 'Andante', color: 'text-emerald-400' };
    if (val < 120) return { label: 'Moderato', color: 'text-amber-400' };
    if (val < 168) return { label: 'Allegro', color: 'text-orange-400' };
    if (val < 200) return { label: 'Presto', color: 'text-red-400' };
    return { label: 'Prestissimo', color: 'text-purple-400' };
  };

  const tempoInfo = getTempoMarking(bpm);

  // Setup Web Audio callbacks
  useEffect(() => {
    webAudioEngine.setOnBeatCallback((beatIndex, isAccent) => {
      setActiveBeat(beatIndex);
      if (isAccent && flashEnabled) {
        setIsAccentFlash(true);
        setTimeout(() => setIsAccentFlash(false), 90);
      }
    });
  }, [flashEnabled]);

  // Sync parameters to engine
  useEffect(() => {
    webAudioEngine.setBpm(bpm);
  }, [bpm]);

  useEffect(() => {
    webAudioEngine.setTimeSignature(timeSig.beats);
  }, [timeSig]);

  useEffect(() => {
    const subObj = SUBDIVISIONS.find(s => s.type === subdivision);
    webAudioEngine.setSubdivisionFactor(subObj?.factor || 1);
  }, [subdivision]);

  useEffect(() => {
    webAudioEngine.setSoundType(soundType);
  }, [soundType]);

  useEffect(() => {
    webAudioEngine.setMuted(isMuted);
  }, [isMuted]);

  useEffect(() => {
    webAudioEngine.setVolume(volume);
  }, [volume]);

  // Tap tempo handler
  const handleTapTempo = useCallback(() => {
    const now = performance.now();
    const taps = tapTimesRef.current;

    if (taps.length > 0 && now - taps[taps.length - 1] > 2000) {
      tapTimesRef.current = [now];
      return;
    }

    taps.push(now);
    if (taps.length > 5) taps.shift();

    if (taps.length > 1) {
      let intervalSum = 0;
      for (let i = 1; i < taps.length; i++) {
        intervalSum += taps[i] - taps[i - 1];
      }
      const avgInterval = intervalSum / (taps.length - 1);
      const calculatedBpm = Math.round(60000 / avgInterval);
      const clampedBpm = Math.max(40, Math.min(280, calculatedBpm));
      setBpm(clampedBpm);
    }
  }, [setBpm]);

  const handleStepBpm = (delta: number) => {
    setBpm(Math.max(40, Math.min(280, bpm + delta)));
  };

  const handleSelectSound = (preset: typeof SOUND_PRESETS[0]) => {
    if (preset.isLocked) {
      setLockedNotice(`"${preset.name}" is exclusively available in the upcoming AndolaLabs MetroNome Android App.`);
      setTimeout(() => setLockedNotice(null), 3500);
      return;
    }
    setSoundType(preset.type);
  };

  return (
    <section id="demo" className="pt-4 pb-10 md:pt-6 md:pb-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20">
      
      {/* Section Header */}
      <div className="text-center space-y-2 mb-6 md:mb-8">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[11px] font-mono text-cyan-400">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>Interactive Web Audio Simulator</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
          AndolaLabs Metronome <span className="gradient-text-cyan">Live Playground</span>
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-xs sm:text-sm">
          Zero-jitter Web Audio timing engine, Lookahead scheduler, and real-time beat visualization.
        </p>
      </div>

      {/* Main Metronome Card Container */}
      <div className={`relative rounded-2xl p-4 sm:p-6 lg:p-7 glass-panel-glow border transition-all duration-300 ${
        isAccentFlash 
          ? 'border-cyan-400 bg-cyan-950/30 shadow-neon-cyan' 
          : 'border-slate-800 bg-brand-dark/95'
      }`}>

        {/* Optical Strobe Flash Overlay */}
        {isAccentFlash && flashEnabled && (
          <div className="absolute inset-0 rounded-2xl bg-cyan-400/10 pointer-events-none transition-opacity duration-100" />
        )}

        {/* Android App Web Demo Callout Banner */}
        <div className="mb-5 p-3 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-cyan-950/40 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong className="text-white font-semibold">Web Demo Mode:</strong> Digital Click synthesizer active. Full sound presets, hardware haptics, and stage setlists are unlocked in the Android app.
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/60 shrink-0 self-start sm:self-auto">
            COMING TO GOOGLE PLAY
          </span>
        </div>

        {/* Toast / Notice for Locked Features */}
        {lockedNotice && (
          <div className="mb-4 p-3 rounded-xl bg-amber-950/90 border border-amber-500/50 text-amber-300 text-xs flex items-center justify-between gap-2 animate-fade-in shadow-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{lockedNotice}</span>
            </div>
            <button onClick={() => setLockedNotice(null)} className="text-amber-400 hover:text-white font-mono text-xs">✕</button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">
          
          {/* Left Column: Visualizer, Beat Indicator, Tempo Display, Main Controls */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-4">
            
            {/* Visual Beat Indicator Dots */}
            <div className="flex items-center gap-2 sm:gap-2.5 p-2 rounded-xl bg-slate-950/70 border border-slate-800/80 shadow-inner">
              {Array.from({ length: timeSig.beats }).map((_, idx) => {
                const isActive = isPlaying && activeBeat === idx;
                const isDownbeat = idx === 0;
                return (
                  <div key={idx} className="flex flex-col items-center gap-1 transition-all duration-100">
                    <div 
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs transition-all duration-100 ${
                        isActive 
                          ? isDownbeat 
                            ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 shadow-neon-amber scale-105 border border-amber-300'
                            : 'bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-950 shadow-neon-cyan scale-105 border border-cyan-300'
                          : isDownbeat
                            ? 'bg-slate-900 border border-amber-500/30 text-amber-400/60'
                            : 'bg-slate-900 border border-slate-800 text-slate-500'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <span className="text-[9px] font-mono text-slate-500">
                      {isDownbeat ? 'ACC' : 'BEAT'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Tempo Dial & Value */}
            <div className="flex flex-col items-center space-y-1 relative group">
              <div className="text-[10px] uppercase tracking-wider font-mono text-slate-400 flex items-center gap-1.5">
                <span>TEMPO SPEED</span>
                <span className={`px-1.5 py-0.2 rounded-full bg-slate-900 border border-slate-800 font-bold ${tempoInfo.color}`}>
                  {tempoInfo.label}
                </span>
              </div>
              
              <div className="relative font-display font-extrabold text-5xl sm:text-6xl tracking-tighter text-white select-none flex items-baseline">
                <span className="gradient-text-cyan">{bpm}</span>
                <span className="text-base sm:text-lg font-mono text-slate-500 ml-1.5 font-normal">BPM</span>
              </div>

              {/* Slider for Smooth Scrubbing */}
              <div className="w-full max-w-sm px-2 pt-1">
                <input
                  type="range"
                  min="40"
                  max="280"
                  value={bpm}
                  onChange={(e) => setBpm(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                  <span>40 Largo</span>
                  <span>120 Mod</span>
                  <span>200 Presto</span>
                  <span>280 Max</span>
                </div>
              </div>
            </div>

            {/* Fine-Tuning Step Controls & Tap Tempo */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-1">
              <button
                onClick={() => handleStepBpm(-5)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-300 font-mono text-xs hover:text-white transition-colors"
              >
                -5
              </button>
              <button
                onClick={() => handleStepBpm(-1)}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-300 font-mono text-xs hover:text-white transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              
              {/* Tap Tempo Button */}
              <button
                onClick={handleTapTempo}
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 hover:border-amber-400 text-amber-300 font-bold font-mono text-xs hover:shadow-neon-amber transition-all flex items-center gap-1.5 active:scale-95"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>TAP TEMPO</span>
              </button>

              <button
                onClick={() => handleStepBpm(1)}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-300 font-mono text-xs hover:text-white transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleStepBpm(5)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-300 font-mono text-xs hover:text-white transition-colors"
              >
                +5
              </button>
            </div>

            {/* Giant Start / Stop Engine Button */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onTogglePlay}
                className={`px-7 py-2.5 sm:px-8 sm:py-3 rounded-xl font-display font-extrabold text-sm sm:text-base transition-all duration-300 flex items-center gap-2.5 shadow-lg active:scale-98 ${
                  isPlaying
                    ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-rose-500/30 hover:from-red-400 hover:to-rose-500'
                    : 'bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 text-slate-950 shadow-neon-cyan hover:shadow-cyan-400/60'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5 fill-current" />
                    <span>STOP ENGINE</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current" />
                    <span>START METRONOME</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Right Column: Signature, Subdivision, Locked Sound Presets */}
          <div className="lg:col-span-5 space-y-4 bg-slate-950/60 p-4 sm:p-5 rounded-xl border border-slate-800/80">
            
            {/* Time Signature */}
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between mb-1.5">
                <span>Time Signature</span>
                <span className="text-cyan-400 font-bold">{timeSig.name}</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {TIME_SIGNATURES.map((ts) => (
                  <button
                    key={ts.name}
                    onClick={() => setTimeSig(ts)}
                    className={`py-1.5 px-2 rounded-lg border text-xs font-mono font-medium transition-all ${
                      timeSig.name === ts.name
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-neon-cyan'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {ts.beats}/{ts.noteValue}
                  </button>
                ))}
              </div>
            </div>

            {/* Subdivisions */}
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between mb-1.5">
                <span>Subdivision</span>
                <span className="text-amber-400 font-bold">{subdivision}</span>
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {SUBDIVISIONS.map((sub) => (
                  <button
                    key={sub.type}
                    onClick={() => setSubdivision(sub.type)}
                    className={`py-1.5 px-1.5 rounded-lg border text-xs font-mono font-medium transition-all ${
                      subdivision === sub.type
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-neon-amber'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {sub.notation}
                  </button>
                ))}
              </div>
            </div>

            {/* Synthesizer Sound Engine Selector with Lock State */}
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between mb-1.5">
                <span>Sound Synthesis</span>
                <span className="text-purple-400 font-bold">{soundType}</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {SOUND_PRESETS.map((snd) => {
                  const isSelected = soundType === snd.type;
                  return (
                    <button
                      key={snd.type}
                      onClick={() => handleSelectSound(snd)}
                      className={`p-2 rounded-lg border text-left transition-all relative ${
                        isSelected
                          ? 'bg-purple-500/20 border-purple-400 text-purple-200 shadow-neon-purple'
                          : snd.isLocked
                          ? 'bg-slate-950/60 border-slate-850 text-slate-500 hover:border-amber-500/40 hover:text-slate-400 cursor-pointer'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-semibold text-xs ${isSelected ? 'text-white' : snd.isLocked ? 'text-slate-400' : 'text-slate-200'}`}>
                          {snd.name}
                        </span>
                        {snd.isLocked ? (
                          <span className="flex items-center gap-1 text-[9px] font-mono font-medium px-1.5 py-0.2 rounded bg-amber-950/70 text-amber-400 border border-amber-800/60">
                            <Lock className="w-2.5 h-2.5" />
                            <span>APP</span>
                          </span>
                        ) : (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                            FREE
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{snd.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Volume & Flash Options */}
            <div className="pt-2 border-t border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Accent Screen Flash</span>
                <button
                  onClick={() => setFlashEnabled(!flashEnabled)}
                  className={`px-2 py-0.5 rounded-md border text-[11px] transition-colors ${
                    flashEnabled 
                      ? 'bg-cyan-950 border-cyan-500/50 text-cyan-300' 
                      : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}
                >
                  {flashEnabled ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>

              <div className="flex items-center gap-2.5 text-xs font-mono text-slate-400">
                <button 
                  onClick={onToggleMute}
                  className="text-slate-300 hover:text-white"
                  title={isMuted ? "Unmute Sound" : "Mute Sound"}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    if (isMuted) onToggleMute();
                    setVolume(parseFloat(e.target.value));
                  }}
                  className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
