export interface TimeSignature {
  beats: number;
  noteValue: number;
  name: string;
}

export interface SoundPreset {
  name: string;
  type: 'woodblock' | 'digital' | 'beep808' | 'rimshot';
  freqAccent: number;
  freqNormal: number;
  desc: string;
}

export interface Subdivision {
  type: string;
  factor: number;
  notation: string;
}

export interface ArchitectureModule {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  language: string;
  highlights: string[];
  codeSnippet: string;
}
