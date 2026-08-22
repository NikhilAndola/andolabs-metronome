import { useState, useCallback, useEffect } from 'react';
import { AppNavbar } from '../components/AppNavbar';
import { AudioVisualizerCanvas } from '../components/AudioVisualizerCanvas';
import { AppHero } from '../components/AppHero';
import { MetronomeDemo } from '../components/MetronomeDemo';
import { ProjectDeepDive } from '../components/ProjectDeepDive';
import { ArchitectureExplorer } from '../components/ArchitectureExplorer';
import { PolyrhythmVisualizer } from '../components/PolyrhythmVisualizer';
import { DonateSection } from '../components/DonateSection';
import { AppFooter } from '../components/AppFooter';
import { webAudioEngine } from '../audio/WebAudioEngine';

export function MetronomePage() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [bpm, setBpm] = useState<number>(120);

  useEffect(() => {
    document.title = 'AndolaLabs Metronome | Ultra Low-Latency Web Audio DSP Showcase';
    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      // Ensure audio engine stops when unmounting
      webAudioEngine.stop();
    };
  }, []);

  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      webAudioEngine.stop();
      setIsPlaying(false);
    } else {
      webAudioEngine.start();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const handleToggleMute = useCallback(() => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    webAudioEngine.setMuted(nextMute);
  }, [isMuted]);

  return (
    <div className="relative min-h-screen bg-brand-bg text-slate-100 gradient-mesh overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Background Interactive Audio Waveform Canvas */}
      <AudioVisualizerCanvas isPlaying={isPlaying} bpm={bpm} />

      {/* Fixed Sticky Glass Navbar */}
      <AppNavbar
        isPlaying={isPlaying}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Content Area */}
      <main className="relative z-10 space-y-4 md:space-y-6">
        <AppHero
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          bpm={bpm}
        />

        <MetronomeDemo
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          bpm={bpm}
          setBpm={setBpm}
        />

        <ProjectDeepDive />

        <ArchitectureExplorer />

        <PolyrhythmVisualizer />

        <DonateSection />
      </main>

      {/* Footer */}
      <AppFooter />

    </div>
  );
}

export default MetronomePage;
