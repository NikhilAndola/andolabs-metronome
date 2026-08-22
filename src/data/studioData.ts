import { 
  Zap, 
  Smartphone, 
  HardDrive, 
  Activity, 
  Cpu, 
  Layers, 
  Radio, 
  Music 
} from 'lucide-react';

export interface StudioApp {
  id: string;
  title: string;
  category: string;
  badge: string;
  badgeColor: string;
  tagline: string;
  description: string;
  route?: string;
  externalUrl?: string;
  githubUrl?: string;
  playStoreUrl?: string;
  featured: boolean;
  status: 'live' | 'in-development' | 'concept';
  tags: string[];
  metrics?: { label: string; value: string }[];
  accentColor: string;
  glowColor: string;
  icon: typeof Zap;
}

export interface LabExperiment {
  id: string;
  title: string;
  category: string;
  stage: string;
  stageProgress: number; // 0 to 100
  description: string;
  tech: string[];
  icon: typeof Radio;
  color: string;
}

export interface TechPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof Cpu;
  stats: string;
  details: string[];
  techStack: string[];
  color: string;
}

export const STUDIO_INFO = {
  name: "Andola Labs",
  brandName: "Andola",
  brandSuffix: "Labs",
  tagline: "Crafting High-Performance Software, Scalable Systems & Creative Digital Applications",
  mission: "Andola Labs is an independent software engineering laboratory building high-performance applications, scalable systems, low-latency DSP engines, and creative software tools across diverse domains.",
  creator: "Nikhil Andola",
  creatorRole: "Founder & Software Engineer",
  github: "https://github.com/NikhilAndola",
  githubRepo: "https://github.com/NikhilAndola/andolalabs",
  supportEmail: "support@andolalabs.com",
  location: "Global / Remote",
  establishedYear: 2026,
};

export const STUDIO_APPS: StudioApp[] = [
  {
    id: "metronome",
    title: "AndolaLabs MetroNome",
    category: "Professional Music DSP & Timing",
    badge: "Flagship Release",
    badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40",
    tagline: "Ultra Low-Latency Audio Metronome & Polyrhythm Visualizer",
    description: "Engineered with zero-drift Web Audio lookahead scheduling, tri-modal haptic sync (Sound + Tactile + Optical Strobe), concentric polyrhythmic phasing, and offline setlist persistence for stage performers and drummers.",
    route: "/metronome",
    githubUrl: "https://github.com/NikhilAndola/andolalabs-metronome",
    featured: true,
    status: "live",
    tags: ["Web Audio API", "React Native 0.86", "Lookahead DSP", "Tri-Modal Haptics", "Stage Ready"],
    metrics: [
      { label: "Audio Jitter", value: "< 0.5 ms" },
      { label: "Supported Meters", value: "Complex & Odd" },
      { label: "Polyrhythms", value: "3:4, 4:5, 5:7" },
      { label: "Offline Mode", value: "100% Native" }
    ],
    accentColor: "from-cyan-500 to-blue-600",
    glowColor: "rgba(0, 242, 254, 0.35)",
    icon: Music,
  }
];

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: "tonelab-dsp",
    title: "ToneLab Spectral Tuner",
    category: "Acoustics & Microtonal DSP",
    stage: "DSP Kernel Prototyping",
    stageProgress: 65,
    description: "High-resolution polyphonic harmonic pitch detector with microtonal frequency cent tracking, custom temperament calibrations, and real-time FFT spectrogram rendering.",
    tech: ["WebAudio FFT", "Wasm AudioWorklet", "React Native Safe Driver"],
    icon: Activity,
    color: "text-amber-400",
  },
  {
    id: "beatmatrix-pro",
    title: "BeatMatrix Euclidean Sequencer",
    category: "Algorithmic Rhythm Engine",
    stage: "Architecture Design",
    stageProgress: 40,
    description: "Generative polyrhythmic sequencer powered by Bjorklund Euclidean spacing algorithms, concentric circular step matrix, and MIDI 2.0 clock output for live synthesizers.",
    tech: ["Euclidean Math", "Web MIDI API", "Canvas 2D Hardware Sync"],
    icon: Layers,
    color: "text-purple-400",
  },
  {
    id: "cloudset-sync",
    title: "CloudSet Stage Mesh",
    category: "Live Performance Infrastructure",
    stage: "Protocol Specification",
    stageProgress: 25,
    description: "Ultra low-latency peer-to-peer setlist synchronization engine that locks song tempo, time signature shifts, and cue markers across all band members' devices simultaneously.",
    tech: ["P2P WebRTC Data", "WebSocket Mesh", "Local-First CRDT"],
    icon: Radio,
    color: "text-emerald-400",
  }
];

export const STUDIO_TECH_PILLARS: TechPillar[] = [
  {
    id: "dsp-engine",
    title: "Zero-Drift Audio DSP",
    subtitle: "Deterministic Lookahead Queue",
    description: "Decouples audio synthesis from the UI thread using predictive Lookahead buffers, achieving sub-millisecond precision even under heavy UI animations or system garbage collection.",
    icon: Zap,
    stats: "< 0.5ms Jitter",
    details: [
      "Hardware-timed AudioContext clock scheduling",
      "Pre-warmed uncompressed PCM memory buffers",
      "Dynamic subdivision resolution (1/4, 1/8, 1/16, triplets)"
    ],
    techStack: ["Web Audio API", "AudioWorklet", "Synthesized Oscillators"],
    color: "cyan"
  },
  {
    id: "multisensory",
    title: "Tri-Modal Sensory Sync",
    subtitle: "Audio + Haptic + Optical Strobe",
    description: "Synchronizes downbeat audio transients with native vibration motor impacts and 90ms hardware-accelerated optical flashes for deaf musicians and loud studio environments.",
    icon: Smartphone,
    stats: "3 Sensory Modes",
    details: [
      "Heavy downbeat haptic differentiation",
      "90ms decaying screen strobe with native driver",
      "Silent practice mode with pure tactile feedback"
    ],
    techStack: ["Expo Haptics", "Animated Native Driver", "Color Matrix"],
    color: "amber"
  },
  {
    id: "offline-first",
    title: "Atomic Offline Architecture",
    subtitle: "Local-First State Engines",
    description: "Engineered for 100% offline gigging reliability in concert basements and recording studios without internet connection, backed by atomic serialization.",
    icon: HardDrive,
    stats: "100% Offline",
    details: [
      "Optimistic UI updates with instant response",
      "Atomic serialized local storage cache",
      "Custom odd-meter matrix (5/4, 7/8, 11/8)"
    ],
    techStack: ["AsyncStorage", "Type Safe Reducers", "React Context"],
    color: "purple"
  },
  {
    id: "performance",
    title: "Modern Cross-Platform Core",
    subtitle: "React Native 0.86 & TypeScript Strict",
    description: "Shared high-performance architecture powering responsive desktop web showcases and native mobile binaries with strict type safety.",
    icon: Cpu,
    stats: "100% Strict Type",
    details: [
      "Unified TypeScript definitions across web & mobile",
      "Zero runtime dependencies for DSP core algorithms",
      "Vite 5 bundle optimization & tree-shaking"
    ],
    techStack: ["React 18/19", "Vite 5", "TypeScript 5.5", "Tailwind CSS"],
    color: "emerald"
  }
];

export const STUDIO_METRICS = [
  { label: "Timing Precision", value: "< 0.5ms", desc: "Zero perceptible audio drift" },
  { label: "Active Products", value: "1 Live", desc: "AndolaLabs MetroNome PRO" },
  { label: "In The Lab", value: "3 R&D", desc: "Spectral DSP & Sequencers" },
  { label: "Offline Capability", value: "100%", desc: "Stage & studio reliable" }
];
