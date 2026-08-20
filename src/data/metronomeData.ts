import { TimeSignature, SoundPreset, Subdivision, ArchitectureModule } from '../types';
import { Zap, Smartphone, HardDrive, Sliders } from 'lucide-react';

export const METRONOME_APP_INFO = {
  name: "Metronome Pro (BeatPulse)",
  tagline: "Ultra Low-Latency Audio Metronome & Polyrhythm Visualizer",
  description: "Production cross-platform mobile application engineered with zero-drift Web Audio DSP timing, tri-modal haptic sync, concentric polyrhythmic phasing, and offline setlist architecture.",
  github: "https://github.com/NikhilAndola",
  upiId: "nikhilandola@upi",
  creator: "Nikhil Andola",
  creatorPortfolioUrl: "https://github.com/NikhilAndola/developer-portfolio",
};

export const CASE_STUDY_PILLARS = [
  {
    id: 'timing',
    title: 'Zero-Drift Audio Engine',
    subtitle: 'Low-Latency Scheduling Loop',
    icon: Zap,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/40',
    bgColor: 'bg-cyan-500/10',
    description: 'In React Native, JavaScript thread garbage collection causes perceptible audio jitter. We decoupled the audio playback using pre-warmed audio buffers and predictive lookahead queues, achieving sub-millisecond beat precision.',
    features: [
      'Pre-loaded low-latency PCM audio buffers into native audio memory',
      'Lookahead scheduling interval eliminating timer jitter during background UI renders',
      'Independent subdivision clock supporting 1/4, 1/8, 1/16, and triplet pulses'
    ],
    tech: ['Expo AV', 'Web Audio API', 'React 19 Hooks', 'TypeScript Strict']
  },
  {
    id: 'haptics',
    title: 'Tri-Modal Multisensory Sync',
    subtitle: 'Sound + Heavy Haptic + Strobe',
    icon: Smartphone,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/40',
    bgColor: 'bg-amber-500/10',
    description: 'For drummers and live stage performers in loud acoustic environments, audible clicks alone are inadequate. We engineered simultaneous visual strobe flashes and hardware haptic pulses.',
    features: [
      'Downbeat differentiation via Expo Haptics ImpactFeedbackStyle.Heavy',
      'Hardware-accelerated native driver screen flash strobe (90ms decay)',
      'Subdivision pulse markers with low-impact tactile feedback'
    ],
    tech: ['Expo Haptics', 'Animated Native Driver', 'React Native Safe Area']
  },
  {
    id: 'architecture',
    title: 'Scalable Preset & Setlist Engine',
    subtitle: 'Atomic Offline Persistence',
    icon: HardDrive,
    color: 'text-purple-400',
    borderColor: 'border-purple-500/40',
    bgColor: 'bg-purple-500/10',
    description: 'Musicians require instant song tempo recall during live gigging. Designed an atomic setlist storage engine supporting complex time signatures (5/4, 7/8, 6/8), song transitions, and cloud sync.',
    features: [
      'Optimistic state updates backed by atomic AsyncStorage persistence',
      'Custom time signature matrix parser with dynamic bar length calculations',
      'Setlist auto-advance mode for seamless gig performance flow'
    ],
    tech: ['AsyncStorage', 'React Context API', 'Custom Hooks', 'Type Safe Reducers']
  },
  {
    id: 'paywall',
    title: 'Monetization & In-App Paywall',
    subtitle: 'Plus Tier Upgrade Architecture',
    icon: Sliders,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/40',
    bgColor: 'bg-emerald-500/10',
    description: 'Engineered a modular Plus Tier subscription system granting unlocked sound libraries, custom setlists, and polyrhythm engines, wrapped in a frictionless native upgrade modal.',
    features: [
      'Subscription context provider with feature gate hooks (useSubscription)',
      'Graceful offline tier fallback and restore purchases validation',
      'Conversion-optimized pricing tiers (Monthly, Annual, Lifetime Pro)'
    ],
    tech: ['Subscription Context', 'Modal Animations', 'Glassmorphism UI']
  }
];

export const TIME_SIGNATURES: TimeSignature[] = [
  { beats: 4, noteValue: 4, name: '4/4 Common' },
  { beats: 3, noteValue: 4, name: '3/4 Waltz' },
  { beats: 2, noteValue: 4, name: '2/4 March' },
  { beats: 6, noteValue: 8, name: '6/8 Compound' },
  { beats: 5, noteValue: 4, name: '5/4 Odd-Meter' },
  { beats: 7, noteValue: 8, name: '7/8 Complex' },
];

export const SUBDIVISIONS: Subdivision[] = [
  { type: 'quarter', factor: 1, notation: '1/4 Beat' },
  { type: 'eighth', factor: 2, notation: '1/8 Duplet' },
  { type: 'triplet', factor: 3, notation: '1/8 Triplet' },
  { type: 'sixteenth', factor: 4, notation: '1/16 Quad' },
];

export const SOUND_PRESETS: SoundPreset[] = [
  { name: 'Woodblock', type: 'woodblock', freqAccent: 1320, freqNormal: 920, desc: 'Acoustic orchestral block with organic resonance' },
  { name: 'Digital Chirp', type: 'digital', freqAccent: 1760, freqNormal: 1200, desc: 'High-visibility electronic pulse for noisy studios' },
  { name: '808 Transient', type: 'beep808', freqAccent: 2200, freqNormal: 1500, desc: 'Sharp analog synthesizer click with punchy sub' },
  { name: 'Studio Rimshot', type: 'rimshot', freqAccent: 1400, freqNormal: 1000, desc: 'High-frequency rim tap with metallic undertones' },
];

export const ARCHITECTURE_MODULES: ArchitectureModule[] = [
  {
    id: "lookahead-timer",
    title: "Lookahead Audio Scheduler",
    subtitle: "Zero-Jitter Timing Loop",
    description: "Standard setInterval/setTimeout drift significantly under thread load. This Lookahead algorithm decouples UI ticks from the audio clock, scheduling synthesized oscillator bursts ahead in the AudioContext queue.",
    language: "typescript",
    highlights: [
      "Zero audio drift even during heavy background tasks",
      "Lookahead interval (25ms) with schedule window (100ms)",
      "Precise beat timestamp tracking and visual dispatch sync"
    ],
    codeSnippet: `// Web Audio Lookahead Scheduler Pattern
const scheduleNextBeats = (audioCtx: AudioContext, state: MetronomeState) => {
  const secondsPerBeat = 60.0 / state.bpm;
  
  // Advance audio queue within the lookahead horizon
  while (nextBeatTime < audioCtx.currentTime + SCHEDULE_AHEAD_TIME) {
    playSynthesizedTick(audioCtx, nextBeatTime, currentBeat, soundPreset);
    
    // Dispatch UI visual strobe right as the beat plays
    scheduleVisualSync(nextBeatTime - audioCtx.currentTime, currentBeat);
    
    // Increment subdivision / bar counter
    nextBeatTime += secondsPerBeat / state.subdivisionFactor;
    currentBeat = (currentBeat + 1) % (state.timeSignature.beats * state.subdivisionFactor);
  }
};`
  },
  {
    id: "haptic-sync",
    title: "Multisensory Haptic Trigger Engine",
    subtitle: "Hardware Tactile & Strobe Layer",
    description: "Synchronizes native vibration motors with optical strobe flashes on the exact beat instant, enabling silent rehearsal and stage awareness for deaf and live performers.",
    language: "typescript",
    highlights: [
      "Hardware-accelerated native driver animations (no JS thread delay)",
      "Dynamic impact intensity scaling between downbeats and subdivisions",
      "Low-power background haptic loop optimization"
    ],
    codeSnippet: `// Tri-Modal Multisensory Trigger Engine
export const triggerSensoryPulse = (isDownbeat: boolean, settings: SensorySettings) => {
  if (settings.hapticsEnabled) {
    // Heavy impact for accent, medium impact for subdivisions
    const feedbackStyle = isDownbeat 
      ? Haptics.ImpactFeedbackStyle.Heavy 
      : Haptics.ImpactFeedbackStyle.Light;
      
    Haptics.impactAsync(feedbackStyle);
  }
  
  if (settings.strobeEnabled && isDownbeat) {
    // 90ms hardware-accelerated strobe decay
    Animated.sequence([
      Animated.timing(strobeOpacity, { toValue: 1, duration: 10, useNativeDriver: true }),
      Animated.timing(strobeOpacity, { toValue: 0, duration: 80, useNativeDriver: true })
    ]).start();
  }
};`
  },
  {
    id: "setlist-persistence",
    title: "Atomic Setlist & Offline Engine",
    subtitle: "Optimistic State & Time Signatures",
    description: "Provides atomic song tempo presets, setlist auto-advance, dynamic time signature parsing, and offline persistence for live concert performances.",
    language: "typescript",
    highlights: [
      "Atomic AsyncStorage sync with optimistic UI updates",
      "Dynamic bar duration calculation across complex meters (5/4, 7/8)",
      "Setlist auto-advance mode for seamless live gigs"
    ],
    codeSnippet: `// Atomic Setlist & Preset Storage Reducer
export const setlistReducer = (state: SetlistState, action: SetlistAction): SetlistState => {
  switch (action.type) {
    case 'ADD_SONG': {
      const nextSongs = [...state.songs, action.payload];
      AsyncStorage.setItem('@setlist_cache', JSON.stringify(nextSongs));
      return { ...state, songs: nextSongs, activeIndex: nextSongs.length - 1 };
    }
    case 'NEXT_SONG': {
      const nextIndex = (state.activeIndex + 1) % state.songs.length;
      return { ...state, activeIndex: nextIndex };
    }
    default:
      return state;
  }
};`
  }
];
