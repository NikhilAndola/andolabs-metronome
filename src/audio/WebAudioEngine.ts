export type SoundType = 'woodblock' | 'digital' | 'beep808' | 'rimshot';

export class WebAudioEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private bpm: number = 120;
  private beatsPerBar: number = 4;
  private subdivisionFactor: number = 1; // 1: quarter, 2: eighth, 3: triplet, 4: 16th
  private soundType: SoundType = 'woodblock';
  private isMuted: boolean = false;
  private volume: number = 0.85;

  private currentBeat: number = 0;
  private nextNoteTime: number = 0.0;
  private timerId: number | null = null;
  private readonly lookahead: number = 25.0; // ms
  private readonly scheduleAheadTime: number = 0.1; // seconds

  private onBeatCallback: ((beatIndex: number, isAccent: boolean, isSubdivision: boolean) => void) | null = null;
  private analyserNode: AnalyserNode | null = null;

  constructor() {
    // Lazy initialize on first interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.analyserNode = this.ctx.createAnalyser();
      this.analyserNode.fftSize = 64;
      this.analyserNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setOnBeatCallback(cb: (beatIndex: number, isAccent: boolean, isSubdivision: boolean) => void) {
    this.onBeatCallback = cb;
  }

  public setBpm(newBpm: number) {
    this.bpm = Math.max(30, Math.min(320, newBpm));
  }

  public setTimeSignature(beats: number) {
    this.beatsPerBar = beats;
    this.currentBeat = 0;
  }

  public setSubdivisionFactor(factor: number) {
    this.subdivisionFactor = factor;
    this.currentBeat = 0;
  }

  public setSoundType(type: SoundType) {
    this.soundType = type;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public start() {
    this.initContext();
    if (this.isRunning) return;

    this.isRunning = true;
    this.currentBeat = 0;
    this.nextNoteTime = (this.ctx?.currentTime || 0) + 0.05;
    this.scheduler();
  }

  public stop() {
    this.isRunning = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyserNode;
  }

  private nextNote() {
    const secondsPerQuarter = 60.0 / this.bpm;
    const secondsPerSubdivision = secondsPerQuarter / this.subdivisionFactor;

    this.nextNoteTime += secondsPerSubdivision;
    this.currentBeat++;
    if (this.currentBeat >= this.beatsPerBar * this.subdivisionFactor) {
      this.currentBeat = 0;
    }
  }

  private scheduleNote(beatNumber: number, time: number) {
    const isSubdivision = beatNumber % this.subdivisionFactor !== 0;
    const mainBeatIndex = Math.floor(beatNumber / this.subdivisionFactor);
    const isAccent = beatNumber === 0;

    if (!this.isMuted && this.ctx) {
      this.playSynthTone(time, isAccent, isSubdivision);
    }

    // Schedule UI callback matching the audio time
    if (this.onBeatCallback && this.ctx) {
      const delayMs = Math.max(0, (time - this.ctx.currentTime) * 1000);
      window.setTimeout(() => {
        if (this.isRunning && this.onBeatCallback) {
          this.onBeatCallback(mainBeatIndex, isAccent, isSubdivision);
        }
      }, delayMs);
    }
  }

  private playSynthTone(time: number, isAccent: boolean, isSubdivision: boolean) {
    if (!this.ctx || !this.analyserNode) return;

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.analyserNode);

    const baseVol = this.volume * (isSubdivision ? 0.35 : isAccent ? 1.0 : 0.7);

    switch (this.soundType) {
      case 'woodblock': {
        filter.type = 'bandpass';
        filter.Q.setValueAtTime(8, time);
        
        const freq = isAccent ? 1320 : isSubdivision ? 720 : 920;
        filter.frequency.setValueAtTime(freq, time);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.4, time + 0.04);

        gainNode.gain.setValueAtTime(baseVol, time);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + (isAccent ? 0.06 : 0.04));

        osc.start(time);
        osc.stop(time + 0.06);
        break;
      }

      case 'digital': {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(4000, time);

        osc.type = 'square';
        const freq = isAccent ? 1760 : isSubdivision ? 880 : 1200;
        osc.frequency.setValueAtTime(freq, time);

        gainNode.gain.setValueAtTime(baseVol * 0.5, time);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.035);

        osc.start(time);
        osc.stop(time + 0.04);
        break;
      }

      case 'beep808': {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(5000, time);

        osc.type = 'sine';
        const startFreq = isAccent ? 2200 : 1500;
        osc.frequency.setValueAtTime(startFreq, time);
        osc.frequency.exponentialRampToValueAtTime(80, time + 0.045);

        gainNode.gain.setValueAtTime(baseVol * 0.9, time);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

        osc.start(time);
        osc.stop(time + 0.055);
        break;
      }

      case 'rimshot': {
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(isAccent ? 1400 : 1000, time);
        filter.Q.setValueAtTime(5, time);

        osc.type = 'triangle';
        const freq = isAccent ? 850 : 620;
        osc.frequency.setValueAtTime(freq, time);

        gainNode.gain.setValueAtTime(baseVol * 0.8, time);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

        osc.start(time);
        osc.stop(time + 0.085);
        break;
      }
    }
  }

  private scheduler = () => {
    if (!this.isRunning || !this.ctx) return;

    while (this.nextNoteTime < this.ctx.currentTime + this.scheduleAheadTime) {
      this.scheduleNote(this.currentBeat, this.nextNoteTime);
      this.nextNote();
    }

    this.timerId = window.setTimeout(this.scheduler, this.lookahead);
  };
}

export const webAudioEngine = new WebAudioEngine();
